import { SQLWorkflow } from "@/lib/sql-workflow";
import { validateWineryId } from "@/lib/sql-generator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  userQuery: z.string().describe("The user's natural language query about the database")
});

export async function POST(req: NextRequest) {
  try {
    const { userQuery } = requestSchema.parse(await req.json());

    // Validate WINERY_ID is configured
    const wineryId = process.env.WINERY_ID;
    if (!wineryId) {
      return NextResponse.json({ 
        success: false, 
        error: 'WINERY_ID environment variable is required' 
      }, { status: 400 });
    }
    
    if (!validateWineryId(wineryId)) {
      return NextResponse.json({ 
        success: false, 
        error: 'WINERY_ID must be a valid GUID format' 
      }, { status: 400 });
    }

    // Execute the workflow
    const workflow = new SQLWorkflow();
    const result = await workflow.executeWorkflow(userQuery);
    
    return NextResponse.json(result);

  } catch (error) {
    console.error("Error in /api/execute-workflow:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to execute workflow' 
    }, { status: 500 });
  }
}
