import { useState } from "react";
import { CopyIcon, CheckIcon, TableIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QueryResultsProps {
  data: Record<string, unknown>[];
  rowCount: number;
  executionTime?: number;
  sqlQuery?: string;
}

export const QueryResults: React.FC<QueryResultsProps> = ({ 
  data, 
  rowCount, 
  executionTime, 
  sqlQuery 
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const exportToCSV = () => {
    if (!data || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape commas and quotes in CSV
          const stringValue = value === null || value === undefined ? '' : String(value);
          return stringValue.includes(',') || stringValue.includes('"') 
            ? `"${stringValue.replace(/"/g, '""')}"` 
            : stringValue;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `query-results-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!data || data.length === 0) {
    return (
      <div className="aui-query-results mb-4 flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center gap-2">
          <TableIcon className="h-5 w-5 text-gray-500" />
          <span className="font-medium text-gray-700">No Results</span>
        </div>
        <p className="text-sm text-gray-600">The query executed successfully but returned no data.</p>
        {executionTime && (
          <p className="text-xs text-gray-500">Execution time: {executionTime}ms</p>
        )}
      </div>
    );
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="aui-query-results mb-4 flex w-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TableIcon className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-gray-900">Query Results</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {rowCount} rows
          </Badge>
          {executionTime && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {executionTime}ms
            </Badge>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(sqlQuery || '')}
          className="h-8"
        >
          {isCopied ? <CheckIcon className="h-3 w-3" /> : <CopyIcon className="h-3 w-3" />}
          Copy SQL
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={exportToCSV}
          className="h-8"
        >
          <DownloadIcon className="h-3 w-3" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
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
            {data.slice(0, 100).map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-3 py-2 whitespace-nowrap text-sm text-gray-900"
                  >
                    {row[header] === null || row[header] === undefined 
                      ? <span className="text-gray-400 italic">NULL</span>
                      : String(row[header])
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {data.length > 100 && (
        <div className="text-center text-sm text-gray-500">
          Showing first 100 rows of {rowCount} total results
        </div>
      )}
    </div>
  );
};
