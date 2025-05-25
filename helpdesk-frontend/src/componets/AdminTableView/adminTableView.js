import { Clock, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

const TableView = ({ issues, onRowClick }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'To Do': return <Clock size={16} className="text-blue-500" />;
      case 'In Progress': return <RefreshCw size={16} className="text-yellow-500" />;
      case 'Re Open': return <AlertCircle size={16} className="text-red-500" />;
      case 'Done': return <CheckCircle size={16} className="text-green-500" />;
      default: return <Clock size={16} />;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Subject
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              First Response
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Resolution
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Assigned To
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Student
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Priority
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {issues.map((issue) => (
            <tr 
              key={issue.id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onRowClick(issue)}
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                {issue.id}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {issue.issueType}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                <div className="flex items-center">
                  {getStatusIcon(issue.issueStatus)}
                  <span className="ml-1">{issue.issueStatus}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                in 8 hours
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                in 4 days
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {issue.assignedTo}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {issue.studentName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityClass(issue.priority)}`}>
                  {issue.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;