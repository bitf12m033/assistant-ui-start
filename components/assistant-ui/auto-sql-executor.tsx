import { useEffect, useState, useCallback, useMemo } from "react";

interface AutoSQLExecutorProps {
  message: string;
}

export const AutoSQLExecutor: React.FC<AutoSQLExecutorProps> = ({ message }) => {
  const [workflowResult, setWorkflowResult] = useState<Record<string, unknown> | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // SQL-related keywords that should trigger automatic execution
  const sqlKeywords = useMemo(() => [
    'show', 'list', 'find', 'get', 'count', 'how many', 'what', 'where', 'when',
    'wines', 'members', 'orders', 'customers', 'inventory', 'products', 'clubs',
    'recent', 'active', 'confirmed', 'locked', 'sales', 'transactions', 'carts'
  ], []);

  const shouldExecuteWorkflow = useCallback((text: string): boolean => {
    const lowerText = text.toLowerCase();
    return sqlKeywords.some(keyword => lowerText.includes(keyword)) && 
           (lowerText.includes('wine') || lowerText.includes('member') || 
            lowerText.includes('order') || lowerText.includes('customer') ||
            lowerText.includes('inventory') || lowerText.includes('product'));
  }, [sqlKeywords]);

  const executeWorkflow = useCallback(async () => {
    setIsExecuting(true);
    setError(null);

    try {
      const response = await fetch('/api/execute-workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userQuery: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setWorkflowResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute workflow');
    } finally {
      setIsExecuting(false);
    }
  }, [message]);

  useEffect(() => {
    if (shouldExecuteWorkflow(message) && !workflowResult && !isExecuting) {
      executeWorkflow();
    }
  }, [message, workflowResult, isExecuting, shouldExecuteWorkflow, executeWorkflow]);

  if (isExecuting) {
    return (
      <div className="aui-auto-sql-executor mb-4 flex w-full flex-col gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          <span className="font-medium text-blue-700">Executing SQL Workflow...</span>
        </div>
        <p className="text-sm text-blue-600">Analyzing your query and generating results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aui-auto-sql-executor mb-4 flex w-full flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-red-700">Workflow Error</span>
        </div>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (workflowResult) {
    return (
      <div className="aui-auto-sql-executor mb-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-semibold text-gray-900">Workflow Results</span>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
              Completed
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(workflowResult, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
