import type { ToolCallMessagePartComponent } from "@assistant-ui/react";
import { CheckCircleIcon, XCircleIcon, ClockIcon, CopyIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const DatabaseResults: ToolCallMessagePartComponent = ({
  result,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const copyToClipboard = async () => {
    if (result?.sqlQuery) {
      await navigator.clipboard.writeText(result.sqlQuery);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Parse the result
  const dbResult = result as {
    success?: boolean;
    data?: Record<string, unknown>[];
    rowCount?: number;
    executionTime?: number;
    error?: string;
    sqlQuery?: string;
    formattedResults?: string;
  } | null;

  if (!dbResult) {
    return (
      <div className="aui-db-results-error mb-4 flex w-full flex-col gap-3 rounded-lg border border-destructive bg-destructive/10 p-4">
        <div className="flex items-center gap-2">
          <XCircleIcon className="h-5 w-5 text-destructive" />
          <h4 className="font-semibold text-destructive">Database Query Error</h4>
        </div>
        <p className="text-sm text-destructive">No result data available</p>
      </div>
    );
  }

  if (!dbResult.success) {
    return (
      <div className="aui-db-results-error mb-4 flex w-full flex-col gap-3 rounded-lg border border-destructive bg-destructive/10 p-4">
        <div className="flex items-center gap-2">
          <XCircleIcon className="h-5 w-5 text-destructive" />
          <h4 className="font-semibold text-destructive">Query Execution Failed</h4>
        </div>
        <p className="text-sm text-destructive">{dbResult.error}</p>
        {dbResult.sqlQuery && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">Query:</p>
            <pre className="text-xs bg-black/10 p-2 rounded overflow-x-auto">
              <code>{dbResult.sqlQuery}</code>
            </pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="aui-db-results-root mb-4 flex w-full flex-col gap-3 rounded-lg border bg-muted/50 p-4">
      {/* Header */}
      <div className="aui-db-results-header flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <h4 className="font-semibold">Database Query Results</h4>
          <Badge variant="secondary" className="text-xs">
            {dbResult.rowCount || 0} rows
          </Badge>
          {dbResult.executionTime && (
            <Badge variant="outline" className="text-xs">
              <ClockIcon className="h-3 w-3 mr-1" />
              {dbResult.executionTime}ms
            </Badge>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-2"
          disabled={!dbResult.sqlQuery}
        >
          {isCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
          {isCopied ? "Copied!" : "Copy SQL"}
        </Button>
      </div>
      
      {/* SQL Query */}
      {dbResult.sqlQuery && (
        <div className="aui-db-results-query">
          <p className="text-sm font-medium mb-2">Executed Query:</p>
          <pre className="overflow-x-auto rounded-md bg-black p-3 text-sm text-white">
            <code>{dbResult.sqlQuery}</code>
          </pre>
        </div>
      )}
      
      {/* Results */}
      <div className="aui-db-results-data">
        {dbResult.formattedResults ? (
          <div className="prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ 
              __html: dbResult.formattedResults.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }} />
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            {dbResult.rowCount === 0 ? (
              <p>✅ Query executed successfully - No rows returned</p>
            ) : (
              <p>✅ Query executed successfully - {dbResult.rowCount} rows returned</p>
            )}
          </div>
        )}
      </div>
      
      {/* Raw Data Preview (if available and small) */}
      {dbResult.data && dbResult.data.length > 0 && dbResult.data.length <= 10 && (
        <div className="aui-db-results-raw">
          <p className="text-sm font-medium mb-2">Data Preview:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {Object.keys(dbResult.data[0]).map((column) => (
                    <th key={column} className="border border-gray-300 px-2 py-1 text-left">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dbResult.data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex} className="border border-gray-300 px-2 py-1">
                        {value === null ? 'NULL' : String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Usage Instructions */}
      <div className="aui-db-results-instructions rounded-md bg-green-50 p-3 text-sm dark:bg-green-950/20">
        <p className="text-green-800 dark:text-green-200">
          <strong>✅ Success:</strong> Your SQL query was executed against the live database. 
          The results show real data from your winery system.
        </p>
      </div>
    </div>
  );
};
