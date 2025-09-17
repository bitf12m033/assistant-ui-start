import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import fs from 'fs';
import path from 'path';

export async function generateSQL(userQuery: string): Promise<{ sql: string; explanation: string }> {
  try {
    // Get WINERY_ID from environment
    const wineryId = process.env.WINERY_ID;
    if (!wineryId) {
      throw new Error('WINERY_ID not found in environment variables');
    }

    // Load template
    const templatePath = path.join(process.cwd(), 'data', 'text-to-sql-template-fixed.txt');
    const template = fs.readFileSync(templatePath, 'utf8');
    
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
    } else if (sql.startsWith('```')) {
      sql = sql.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Validate that the SQL includes WINERY_ID filtering
    const hasWineryFilter = sql.toLowerCase().includes(`wineryid = '${wineryId.toLowerCase()}'`) ||
                           sql.toLowerCase().includes(`wineryid='${wineryId.toLowerCase()}'`);
    
    if (!hasWineryFilter) {
      // If no winery filter found, add a warning
      sql = `-- WARNING: This query may not be filtered by WINERY_ID\n-- Please verify the WHERE clause includes: WineryID = '${wineryId}'\n\n${sql}`;
    }

    return {
      sql,
      explanation: `Generated SQL query for WINERY_ID: ${wineryId}. Query: ${userQuery}`
    };
    
  } catch (error) {
    throw new Error(`Failed to generate SQL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper function to validate WINERY_ID format (GUID)
export function validateWineryId(wineryId: string): boolean {
  const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return guidRegex.test(wineryId);
}

// Helper function to load database schema
export function getDatabaseSchema(): string {
  try {
    const schemaPath = path.join(process.cwd(), 'data', 'views_schema_fixed.md');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    return schema;
  } catch (error) {
    console.error('Error loading schema:', error);
    return 'Schema not available';
  }
}

// Helper function to get winery context for prompts
export function getWineryContext(): string {
  const wineryId = process.env.WINERY_ID;
  if (!wineryId) {
    return "No WINERY_ID configured";
  }
  
  return `
WINERY CONTEXT:
- Current WINERY_ID: ${wineryId}
- All queries must be filtered by this winery
- This ensures data isolation between different wineries
- Use: WHERE WineryID = '${wineryId}' in all queries
`;
}
