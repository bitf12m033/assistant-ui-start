interface DatabaseQueryResponse {
  success: boolean;
  data?: Record<string, unknown>[];
  error?: string;
  rowCount?: number;
  executionTime?: number;
}

interface DatabaseQueryRequest {
  query: string;
  wineryId?: string;
  admin_contact_id?: string;
}

export async function executeDatabaseQuery(
  sqlQuery: string,
  wineryId?: string,
  adminContactId?: string
): Promise<DatabaseQueryResponse> {
  try {
    const requestBody: DatabaseQueryRequest = {
      query: sqlQuery,
      ...(wineryId && { wineryId })
    };

    // Build cookie header
    const cookieHeader = adminContactId ? `admin_contact_id=${adminContactId}` : '';

    const response = await fetch('https://api-dev.vinsuite.com/kaomi-demo-tools/database-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader && { 'Cookie': cookieHeader })
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `API Error (${response.status}): ${errorText}`
      };
    }

    const result = await response.json();
    
    return {
      success: true,
      data: result.data || result.rows || result,
      rowCount: result.rowCount || result.count || (Array.isArray(result.data) ? result.data.length : 0),
      executionTime: result.executionTime || result.time
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Helper function to format query results for display
export function formatQueryResults(results: DatabaseQueryResponse): string {
  if (!results.success) {
    return `❌ **Query Execution Failed**\n\n**Error:** ${results.error}`;
  }

  if (!results.data || results.data.length === 0) {
    return `✅ **Query Executed Successfully**\n\n**Result:** No rows returned\n**Row Count:** 0`;
  }

  const rowCount = results.rowCount || results.data.length;
  const executionTime = results.executionTime ? ` (${results.executionTime}ms)` : '';
  
  let formatted = `✅ **Query Executed Successfully**\n\n`;
  formatted += `**Row Count:** ${rowCount}${executionTime}\n\n`;
  
  // Show first few rows as a preview
  const previewRows = results.data.slice(0, 5);
  const hasMore = results.data.length > 5;
  
  if (previewRows.length > 0) {
    formatted += `**Preview (${hasMore ? 'first 5' : 'all'} rows):**\n\n`;
    
    // Create a simple table format
    const columns = Object.keys(previewRows[0]);
    formatted += `| ${columns.join(' | ')} |\n`;
    formatted += `| ${columns.map(() => '---').join(' | ')} |\n`;
    
    previewRows.forEach(row => {
      const values = columns.map(col => {
        const value = row[col];
        return value === null ? 'NULL' : String(value);
      });
      formatted += `| ${values.join(' | ')} |\n`;
    });
    
    if (hasMore) {
      formatted += `\n*... and ${results.data.length - 5} more rows*`;
    }
  }
  
  return formatted;
}

// Helper function to validate SQL query before execution
export function validateSQLQuery(sqlQuery: string): { isValid: boolean; error?: string } {
  const trimmedQuery = sqlQuery.trim().toLowerCase();
  
  // Basic validation - check for dangerous operations
  const dangerousKeywords = ['drop', 'delete', 'truncate', 'alter', 'create', 'insert', 'update'];
  const hasDangerousKeyword = dangerousKeywords.some(keyword => 
    trimmedQuery.includes(keyword)
  );
  
  if (hasDangerousKeyword) {
    return {
      isValid: false,
      error: 'Only SELECT queries are allowed for security reasons'
    };
  }
  
  // Check if it starts with SELECT
  if (!trimmedQuery.startsWith('select')) {
    return {
      isValid: false,
      error: 'Only SELECT queries are allowed'
    };
  }
  
  return { isValid: true };
}
