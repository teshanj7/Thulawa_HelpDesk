import { Clock, AlertCircle, CheckCircle, RefreshCw, Eye } from 'lucide-react';

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

  const getIssueTypeDisplay = (issueType) => {
    switch (issueType) {
      case 'REQUEST_DOCUMENTS': return 'Document Request';
      case 'CONVOCATION_ISSUE': return 'Convocation';
      case 'CAMPUS_ENVIRONMENT_ISSUE': return 'Campus Environment';
      case 'MODULE_CONTENT_ISSUE': return 'Module Content';
      case 'OTHER_ISSUE': return 'Other';
      case 'REGISTRATION_ISSUE': return 'Registration';
      case 'EXAMINATION_ISSUE': return 'Exam';
      case 'PAYMENT_ISSUE': return 'Payment';
      default: return issueType.replace(/_/g, ' ');
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
              Issue Type
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Assigned To
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Student
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {issues.map((issue) => (
            <tr 
              key={issue.id} 
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                {issue.issueKey || `UH-${String(Math.floor(Math.random() * 90000) + 10000)}`}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {getIssueTypeDisplay(issue.issueType)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                <div className="flex items-center">
                  {getStatusIcon(issue.issueStatus)}
                  <span className="ml-1">{issue.issueStatus}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {issue.assignedTo}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {issue.studentName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                <button
                  onClick={() => onRowClick(issue)}
                  className="flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;