import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages, tool } from "ai";
import { validateWineryId, getWineryContext } from "@/lib/sql-generator";
import { executeDatabaseQuery, formatQueryResults, validateSQLQuery } from "@/lib/database-executor";
import { z } from "zod";

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

  // Get admin contact ID
  const adminContactId = process.env.ADMIN_CONTACT_ID || '9F56A611-3193-4204-8B9E-6A970C4CAC44';
  
  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
    system: `You are a SQL generation assistant for a winery management system. 

${getWineryContext()}

You can help users generate SQL queries for their winery data. All queries will be automatically filtered by the current WINERY_ID to ensure data isolation.

IMPORTANT COLUMN NOTES:
- VW_Members does NOT have a 'Status' column
- VW_Members has: isConfirmed, isLocked, IsProtected (bit columns)
- VW_ClubMembers has: isActive (bit column) 
- VW_Wines has: isActive (bit column)
- VW_Products has: isActive (bit column)
- Always use the correct column names from the schema

Available views include:
- VW_Wines: Wine inventory and details (use isActive for status)
- VW_Carts: Orders and transactions  
- VW_Members: Customer information (use isConfirmed, isLocked for status)
- VW_ClubMembers: Wine club memberships (use isActive for status)
- VW_Products: Product catalog (use isActive for status)
- VW_InventoryByLocation: Stock levels
- And many more...

When users ask for SQL queries, analyze their request and generate appropriate MSSQL queries that include the WINERY_ID filter. Always include WHERE WineryID = '${wineryId}' in your queries. Use the correct column names from the schema.

You can also execute SQL queries against the database. When users ask to "run" or "execute" a query, you can call the database API to get real results.`
  });

  return result.toUIMessageStreamResponse();
}
