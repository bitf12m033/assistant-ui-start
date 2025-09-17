import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { validateWineryId, getWineryContext, getDatabaseSchema } from "@/lib/sql-generator";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  
  // Validate WINERY_ID is configured
  const wineryId = process.env.WINERY_ID;
  if (!wineryId) {
    throw new Error('WINERY_ID environment variable is required');
  }
  
  if (!validateWineryId(wineryId)) {
    throw new Error('WINERY_ID must be a valid GUID format');
  }

  // Note: Admin contact ID is handled in the execute-query endpoint
  
  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
    system: `You are a SQL generation assistant for a winery management system. 

${getWineryContext()}

You can help users generate SQL queries for their winery data. All queries will be automatically filtered by the current WINERY_ID to ensure data isolation.

DATABASE SCHEMA:
${getDatabaseSchema()}

IMPORTANT COLUMN NOTES:
- VW_Members does NOT have a 'Status' column
- VW_Members has: isConfirmed, isLocked, IsProtected (bit columns)
- VW_ClubMembers has: isActive (bit column) 
- VW_Wines has: isActive (bit column)
- VW_Products has: isActive (bit column)
- Always use the correct column names from the schema above
- For date columns, use DateAdded, DateModified, etc. (NOT CreatedOn)

When users ask for data, reports, or any database-related information, you should:

1. Generate the appropriate SQL query in your memory using the schema knowledge
2. Format it in a code block with \`\`\`sql (this will be executed automatically in the background)
3. The system will automatically detect and execute the query to show the results
4. The user will only see the results, not the SQL code

Examples of queries that should generate SQL:
- "Show me all wines" → Generate SQL to select from VW_Wines
- "How many members do we have?" → Generate SQL to count from VW_Members
- "List recent orders" → Generate SQL to select from VW_Carts
- "What's our inventory?" → Generate SQL to select from VW_InventoryByLocation
- "Show active club members" → Generate SQL to select from VW_ClubMembers
- "Find customers from last month" → Generate SQL to select from VW_Members with date filters

Always include WHERE WineryID = '${wineryId}' in your queries. Use the correct column names from the schema.

MSSQL SYNTAX NOTES:
- Use TOP 10 instead of LIMIT 10
- Use GETDATE() instead of NOW()
- Use DATEADD() for date calculations
- Use ISNULL() instead of COALESCE() when possible

IMPORTANT: 
- Generate COMPLETE SQL queries in your memory and format them in code blocks
- Ensure SQL queries are syntactically complete (properly closed parentheses, complete WHERE clauses, etc.)
- The system will automatically detect and execute them to show real results
- The SQL code block will be processed by the system but the user will only see the results
- The SQL execution happens automatically in the background
- Do NOT include explanatory text before or after the SQL code block`
  });

  return result.toUIMessageStreamResponse();
}
