import { useEffect, useState, useCallback, useMemo } from "react";

interface AutoQueryExecutorProps {
  messageContent: string;
}

export const AutoQueryExecutor: React.FC<AutoQueryExecutorProps> = ({ 
  messageContent 
}) => {
  const [queryResult, setQueryResult] = useState<{
    success: boolean;
    data?: unknown[];
    error?: string;
    rowCount?: number;
    executionTime?: number;
  } | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // SQL-related keywords that should trigger automatic execution
  const sqlKeywords = useMemo(() => [
    'show', 'list', 'find', 'get', 'count', 'how many', 'what', 'where', 'when',
    'wines', 'members', 'orders', 'customers', 'inventory', 'products', 'clubs',
    'recent', 'active', 'confirmed', 'locked', 'sales', 'transactions', 'carts'
  ], []);

  const shouldExecuteQuery = useCallback((text: string): boolean => {
    if (!text || typeof text !== 'string') {
      return false;
    }
    const lowerText = text.toLowerCase();
    
    // Check if there's actual SQL code in the message (most important)
    const hasSQLCode = lowerText.includes('select') && 
                      (lowerText.includes('from') || lowerText.includes('where'));
    
    // Check if the message contains SQL keywords and database terms
    const hasSQLKeywords = sqlKeywords.some(keyword => lowerText.includes(keyword));
    const hasDBTerms = lowerText.includes('wine') || lowerText.includes('member') || 
                      lowerText.includes('order') || lowerText.includes('customer') ||
                      lowerText.includes('inventory') || lowerText.includes('product');
    
    // Execute if there's SQL code present OR if it's a database-related query
    const shouldExecute = hasSQLCode || (hasSQLKeywords && hasDBTerms);
    
    console.log('🔍 Detection details:', {
      hasSQLCode,
      hasSQLKeywords,
      hasDBTerms,
      shouldExecute,
      textPreview: text.substring(0, 200)
    });
    
    return shouldExecute;
  }, [sqlKeywords]);

  // Extract SQL query from markdown code blocks
  const extractSQLFromMessage = (text: string): string | null => {
    if (!text || typeof text !== 'string') {
      console.log('❌ extractSQLFromMessage - invalid text');
      return null;
    }
    
    console.log('🔍 extractSQLFromMessage - searching in text:', text.substring(0, 300) + '...');
    
    // First try to match ```sql blocks
    const sqlMatch = text.match(/```sql\s*([\s\S]*?)\s*```/i);
    if (sqlMatch) {
      console.log('✅ extractSQLFromMessage - found SQL block:', sqlMatch[1].trim());
      return sqlMatch[1].trim();
    }
    
    // Then try to match any code blocks that contain SQL
    const codeMatch = text.match(/```\s*([\s\S]*?)\s*```/);
    if (codeMatch) {
      const code = codeMatch[1].trim();
      console.log('🔍 extractSQLFromMessage - found code block:', code.substring(0, 100) + '...');
      // Check if it looks like SQL
      if (code.toLowerCase().includes('select') && 
          (code.toLowerCase().includes('from') || code.toLowerCase().includes('where'))) {
        console.log('✅ extractSQLFromMessage - code block looks like SQL');
        return code;
      }
    }
    
    // Also check for SQL without code blocks (sometimes the LLM doesn't format it properly)
    const lines = text.split('\n');
    const sqlLines: string[] = [];
    let inSQLBlock = false;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Start of SQL block
      if (trimmedLine.toLowerCase().startsWith('select') || 
          trimmedLine.toLowerCase().startsWith('with')) {
        inSQLBlock = true;
        sqlLines.push(trimmedLine);
      }
      // Continue SQL block
      else if (inSQLBlock && (trimmedLine.endsWith(';') || 
               trimmedLine.toLowerCase().includes('from') ||
               trimmedLine.toLowerCase().includes('where') ||
               trimmedLine.toLowerCase().includes('group by') ||
               trimmedLine.toLowerCase().includes('order by'))) {
        sqlLines.push(trimmedLine);
        if (trimmedLine.endsWith(';')) {
          break;
        }
      }
      // End of SQL block
      else if (inSQLBlock && trimmedLine === '') {
        // Empty line might end the SQL block
        if (sqlLines.length > 0) {
          break;
        }
      }
      // Reset if we hit non-SQL content
      else if (inSQLBlock && trimmedLine && !trimmedLine.match(/^(and|or|where|from|group by|order by|having|limit)/i)) {
        break;
      }
    }
    
    if (sqlLines.length > 0) {
      console.log('✅ extractSQLFromMessage - found SQL lines:', sqlLines.join(' '));
      return sqlLines.join(' ');
    }
    
    console.log('❌ extractSQLFromMessage - no SQL found');
    return null;
  };

  useEffect(() => {
    console.log('🔍 AutoQueryExecutor - messageContent:', messageContent?.substring(0, 200) + '...');
    console.log('🔍 AutoQueryExecutor - shouldExecute:', messageContent ? shouldExecuteQuery(messageContent) : false);
    console.log('🔍 AutoQueryExecutor - queryResult:', queryResult);
    console.log('🔍 AutoQueryExecutor - isExecuting:', isExecuting);
    
    if (messageContent && shouldExecuteQuery(messageContent) && !queryResult && !isExecuting) {
      const sqlQuery = extractSQLFromMessage(messageContent);
      console.log('🔍 AutoQueryExecutor - extracted SQL:', sqlQuery);
      if (sqlQuery) {
        console.log('🚀 AutoQueryExecutor - executing query!');
        executeQuery(sqlQuery);
      } else {
        console.log('❌ AutoQueryExecutor - no SQL extracted from message');
      }
    } else {
      console.log('❌ AutoQueryExecutor - conditions not met:', {
        hasMessageContent: !!messageContent,
        shouldExecute: messageContent ? shouldExecuteQuery(messageContent) : false,
        hasQueryResult: !!queryResult,
        isExecuting
      });
    }
  }, [messageContent, queryResult, isExecuting, shouldExecuteQuery]);

  const executeQuery = async (sqlQuery: string) => {
    setIsExecuting(true);
    setError(null);

    try {
      const response = await fetch('/api/execute-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sqlQuery }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setQueryResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute query');
    } finally {
      setIsExecuting(false);
    }
  };

  if (isExecuting) {
    return (
      <div className="aui-auto-query-executor mb-4 flex w-full flex-col gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          <span className="font-medium text-blue-700">Executing Query...</span>
        </div>
        <p className="text-sm text-blue-600">Running your SQL query against the database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aui-auto-query-executor mb-4 flex w-full flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-red-700">Query Error</span>
        </div>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (queryResult) {
    return (
      <div className="aui-auto-query-executor mb-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-semibold text-gray-900">Query Results</span>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
              {String(queryResult.rowCount || 0)} rows
            </span>
          </div>
          
          {queryResult.success ? (
            <div className="space-y-3">
              {queryResult.data && Array.isArray(queryResult.data) && queryResult.data.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys((queryResult.data as Record<string, unknown>[])[0]).map((header) => (
                          <th
                            key={header}
                            className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(queryResult.data as Record<string, unknown>[]).slice(0, 10).map((row: Record<string, unknown>, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          {Object.values(row).map((value: unknown, cellIndex: number) => (
                            <td
                              key={cellIndex}
                              className="px-3 py-2 whitespace-nowrap text-sm text-gray-900"
                            >
                              {value === null || value === undefined 
                                ? <span className="text-gray-400 italic">NULL</span>
                                : String(value)
                              }
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(queryResult.data as unknown[]).length > 10 && (
                    <div className="mt-2 text-center text-sm text-gray-500">
                      Showing first 10 rows of {(queryResult.data as unknown[]).length} total results
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">No data returned from the query.</p>
              )}
            </div>
          ) : (
            <div className="text-red-600">
              <p className="font-medium">Query failed:</p>
              <p className="text-sm">{queryResult.error}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};
