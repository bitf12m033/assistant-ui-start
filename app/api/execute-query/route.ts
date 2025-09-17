import { NextRequest, NextResponse } from 'next/server';
import { executeDatabaseQuery, validateSQLQuery } from '@/lib/database-executor';
import { validateWineryId } from '@/lib/sql-generator';

export async function POST(request: NextRequest) {
  try {
    const { sqlQuery } = await request.json();

    console.log('🔍 Execute Query API - Received SQL:', sqlQuery);

    if (!sqlQuery) {
      return NextResponse.json(
        { success: false, error: 'SQL query is required' },
        { status: 400 }
      );
    }

    // Validate WINERY_ID is configured
    const wineryId = process.env.WINERY_ID;
    if (!wineryId) {
      return NextResponse.json(
        { success: false, error: 'WINERY_ID environment variable is required' },
        { status: 500 }
      );
    }
    
    if (!validateWineryId(wineryId)) {
      return NextResponse.json(
        { success: false, error: 'WINERY_ID must be a valid GUID format' },
        { status: 500 }
      );
    }

    // Get admin contact ID
    const adminContactId = process.env.ADMIN_CONTACT_ID || '9F56A611-3193-4204-8B9E-6A970C4CAC44';

    // Validate the SQL query
    console.log('🔍 Execute Query API - Validating SQL...');
    const validation = validateSQLQuery(sqlQuery);
    console.log('🔍 Execute Query API - Validation result:', validation);
    
    if (!validation.isValid) {
      console.log('❌ Execute Query API - Validation failed:', validation.error);
      return NextResponse.json(
        { 
          success: false, 
          error: validation.error,
          sqlQuery: sqlQuery
        },
        { status: 400 }
      );
    }

    // Execute the query
    const result = await executeDatabaseQuery(sqlQuery, wineryId, adminContactId);
    
    return NextResponse.json({
      success: result.success,
      data: result.data,
      rowCount: result.rowCount,
      executionTime: result.executionTime,
      error: result.error,
      sqlQuery: sqlQuery,
      wineryId: wineryId,
      adminContactId: adminContactId
    });

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to execute query'
      },
      { status: 500 }
    );
  }
}
