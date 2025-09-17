import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { executeDatabaseQuery, validateSQLQuery } from "./database-executor";
import fs from 'fs';
import path from 'path';

export interface WorkflowStep {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  message: string;
  details?: string;
}

export interface WorkflowResult {
  steps: WorkflowStep[];
  sqlQuery?: string;
  results?: Record<string, unknown>;
  error?: string;
  success: boolean;
}

export class SQLWorkflow {
  private steps: WorkflowStep[] = [
    {
      id: 'analyze',
      name: 'Analyzing Query',
      status: 'pending',
      message: 'Understanding your request...'
    },
    {
      id: 'generate',
      name: 'Generating SQL',
      status: 'pending',
      message: 'Creating optimized SQL query...'
    },
    {
      id: 'validate',
      name: 'Validating Query',
      status: 'pending',
      message: 'Checking query security and syntax...'
    },
    {
      id: 'execute',
      name: 'Executing Query',
      status: 'pending',
      message: 'Running query against database...'
    },
    {
      id: 'format',
      name: 'Formatting Results',
      status: 'pending',
      message: 'Preparing results for display...'
    }
  ];

  async executeWorkflow(userQuery: string): Promise<WorkflowResult> {
    const result: WorkflowResult = {
      steps: [...this.steps],
      success: false
    };

    try {
      // Step 1: Analyze Query
      this.updateStep(result.steps, 'analyze', 'in_progress', 'Understanding your request...');
      
      // Step 2: Generate SQL
      this.updateStep(result.steps, 'generate', 'in_progress', 'Creating optimized SQL query...');
      const sqlResult = await this.generateSQL(userQuery);
      result.sqlQuery = sqlResult.sql;
      this.updateStep(result.steps, 'generate', 'completed', 'SQL query generated successfully', sqlResult.sql);
      this.updateStep(result.steps, 'analyze', 'completed', 'Query analysis complete');

      // Step 3: Validate Query
      this.updateStep(result.steps, 'validate', 'in_progress', 'Checking query security and syntax...');
      const validation = validateSQLQuery(result.sqlQuery);
      if (!validation.isValid) {
        this.updateStep(result.steps, 'validate', 'error', `Validation failed: ${validation.error}`);
        result.error = validation.error;
        return result;
      }
      this.updateStep(result.steps, 'validate', 'completed', 'Query validation passed');

      // Step 4: Execute Query
      this.updateStep(result.steps, 'execute', 'in_progress', 'Running query against database...');
      const wineryId = process.env.WINERY_ID;
      const adminContactId = process.env.ADMIN_CONTACT_ID || '9F56A611-3193-4204-8B9E-6A970C4CAC44';
      
      const dbResult = await executeDatabaseQuery(result.sqlQuery, wineryId, adminContactId);
      
      if (!dbResult.success) {
        this.updateStep(result.steps, 'execute', 'error', `Execution failed: ${dbResult.error}`);
        result.error = dbResult.error;
        return result;
      }
      
      this.updateStep(result.steps, 'execute', 'completed', `Query executed successfully (${dbResult.rowCount || 0} rows)`);
      result.results = dbResult as unknown as Record<string, unknown>;

      // Step 5: Format Results
      this.updateStep(result.steps, 'format', 'in_progress', 'Preparing results for display...');
      this.updateStep(result.steps, 'format', 'completed', 'Results ready for display');
      
      result.success = true;
      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      result.error = errorMessage;
      
      // Mark current step as error
      const currentStep = result.steps.find(step => step.status === 'in_progress');
      if (currentStep) {
        this.updateStep(result.steps, currentStep.id, 'error', `Error: ${errorMessage}`);
      }
      
      return result;
    }
  }

  private updateStep(steps: WorkflowStep[], id: string, status: WorkflowStep['status'], message: string, details?: string) {
    const step = steps.find(s => s.id === id);
    if (step) {
      step.status = status;
      step.message = message;
      if (details) {
        step.details = details;
      }
    }
  }

  private async generateSQL(userQuery: string): Promise<{ sql: string; explanation: string }> {
    try {
      // Load template
      const templatePath = path.join(process.cwd(), 'data', 'text-to-sql-template-fixed.txt');
      const template = fs.readFileSync(templatePath, 'utf8');
      
      const wineryId = process.env.WINERY_ID;
      if (!wineryId) {
        throw new Error('WINERY_ID environment variable is required for SQL generation.');
      }

      // Create enhanced prompt with WINERY_ID context
      const enhancedPrompt = `
${template.replace('{DIALECT}', 'MSSQL').replace('{USER_REQUEST}', userQuery)}

# IMPORTANT WINERY CONTEXT:
- You are generating SQL for WINERY_ID: ${wineryId}
- ALL queries MUST include a WHERE clause filtering by WineryID = '${wineryId}'
- This is a multi-tenant system - each winery only sees their own data
- If the user doesn't specify a winery, automatically filter by the provided WINERY_ID
- Always use the exact WINERY_ID: '${wineryId}' in your WHERE clauses

# CRITICAL: ONLY USE AVAILABLE COLUMNS
- VW_Members does NOT have a 'Status' column
- VW_Members has: isConfirmed, isLocked, IsProtected (all bit columns)
- VW_ClubMembers has: isActive (bit column)
- VW_Wines has: isActive (bit column)
- VW_Products has: isActive (bit column)
- Always check the schema before using any column names

# EXAMPLES:
- "Show me all wines" → "SELECT * FROM VW_Wines WHERE WineryID = '${wineryId}' AND isActive = 1"
- "List all orders" → "SELECT * FROM VW_Carts WHERE WineryID = '${wineryId}'"
- "Show active club members" → "SELECT * FROM VW_ClubMembers WHERE WineryID = '${wineryId}' AND isActive = 1"
- "Show confirmed members" → "SELECT * FROM VW_Members WHERE WineryID = '${wineryId}' AND isConfirmed = 1"

# SCHEMA NOTES:
- Most views have a WineryID column for filtering
- Always include WineryID = '${wineryId}' in WHERE clauses
- Use proper MSSQL syntax with single quotes for GUID values
- For "active" status, use appropriate boolean columns (isActive, isConfirmed, etc.)
`;

      // Generate SQL using OpenAI
      const result = await generateText({
        model: openai("gpt-4o"),
        prompt: enhancedPrompt,
        temperature: 0.1, // Lower temperature for more consistent SQL generation
      });
      
      // Extract SQL from the response (remove markdown code blocks if present)
      let sql = result.text.trim();
      if (sql.startsWith('```sql')) {
        sql = sql.replace(/^```sql\s*/, '').replace(/\s*```$/, '');
      }

      return {
        sql,
        explanation: `Generated SQL query for: ${userQuery}`
      };
    } catch (error) {
      throw new Error(`Failed to generate SQL: ${error}`);
    }
  }
}
