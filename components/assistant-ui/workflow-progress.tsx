import type { ToolCallMessagePartComponent } from "@assistant-ui/react";
import { CheckCircleIcon, XCircleIcon, ClockIcon, LoaderIcon, DatabaseIcon, CodeIcon, ShieldIcon, TableIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { QueryResults } from "./query-results";

interface WorkflowStep {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  message: string;
  details?: string;
}

interface WorkflowProgressProps {
  steps: WorkflowStep[];
  sqlQuery?: string;
  results?: Record<string, unknown>;
  error?: string;
  success: boolean;
}

const getStepIcon = (status: WorkflowStep['status'], stepId: string) => {
  if (status === 'completed') return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
  if (status === 'error') return <XCircleIcon className="h-4 w-4 text-red-500" />;
  if (status === 'in_progress') return <LoaderIcon className="h-4 w-4 text-blue-500 animate-spin" />;
  
  // Default icons for pending steps
  const iconMap: Record<string, React.ReactNode> = {
    analyze: <DatabaseIcon className="h-4 w-4 text-gray-400" />,
    generate: <CodeIcon className="h-4 w-4 text-gray-400" />,
    validate: <ShieldIcon className="h-4 w-4 text-gray-400" />,
    execute: <DatabaseIcon className="h-4 w-4 text-gray-400" />,
    format: <TableIcon className="h-4 w-4 text-gray-400" />
  };
  
  return iconMap[stepId] || <ClockIcon className="h-4 w-4 text-gray-400" />;
};

const getStatusColor = (status: WorkflowStep['status']) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'error': return 'bg-red-100 text-red-800 border-red-200';
    case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

export const WorkflowProgress: ToolCallMessagePartComponent = ({ result }) => {
  const workflowData = result as WorkflowProgressProps;
  
  if (!workflowData) {
    return (
      <div className="aui-workflow-progress mb-4 flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center gap-2">
          <XCircleIcon className="h-5 w-5 text-red-500" />
          <span className="font-medium text-red-700">Workflow Error</span>
        </div>
        <p className="text-sm text-red-600">Unable to load workflow data</p>
      </div>
    );
  }

  return (
    <div className="aui-workflow-progress mb-4 flex w-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DatabaseIcon className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-gray-900">SQL Query Workflow</span>
        </div>
        <Badge 
          variant={workflowData.success ? "default" : "destructive"}
          className={workflowData.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
        >
          {workflowData.success ? "Completed" : "Failed"}
        </Badge>
      </div>

      {/* Progress Steps */}
      <div className="space-y-3">
        {workflowData.steps.map((step) => (
          <div key={step.id} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getStepIcon(step.status, step.id)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-gray-900">{step.name}</span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getStatusColor(step.status)}`}
                >
                  {step.status.replace('_', ' ')}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{step.message}</p>
              {step.details && step.status === 'completed' && (
                <details className="mt-2">
                  <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                    View Details
                  </summary>
                  <pre className="mt-1 text-xs bg-gray-50 p-2 rounded border overflow-x-auto">
                    {step.details}
                  </pre>
                </details>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Error Display */}
      {workflowData.error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <XCircleIcon className="h-4 w-4 text-red-500" />
            <span className="font-medium text-red-800">Error</span>
          </div>
          <p className="text-sm text-red-700">{workflowData.error}</p>
        </div>
      )}

      {/* Results Display */}
      {workflowData.success && workflowData.results && (
        <div className="mt-4">
          <QueryResults
            data={(workflowData.results.data as Record<string, unknown>[]) || []}
            rowCount={(workflowData.results.rowCount as number) || 0}
            executionTime={workflowData.results.executionTime as number}
            sqlQuery={workflowData.sqlQuery}
          />
        </div>
      )}
    </div>
  );
};
