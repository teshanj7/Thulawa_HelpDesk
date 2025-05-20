import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { AlertCircle, Clock, RefreshCw, CheckCircle, Table } from 'lucide-react';
import TableView from '../AdminTableView/adminTableView';
import UserContext from '../../ContextComponent/ContextComponent';

const KanbanBoard = () => {
  const { user, token } = useContext(UserContext);
  const AdminType = user?.AdminType;
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  
  // Define column structure without including React components directly in the state
  const [columns, setColumns] = useState({
    'To Do': {
      id: 'To Do',
      title: 'To Do',
      issueIds: [],
      iconType: 'clock', // Use string identifiers instead of components
      color: 'bg-blue-500',
      headerColor: 'bg-blue-100 border-blue-200'
    },
    'In Progress': {
      id: 'In Progress',
      title: 'In Progress',
      issueIds: [],
      iconType: 'refreshCw',
      color: 'bg-yellow-500',
      headerColor: 'bg-yellow-100 border-yellow-200'
    },
    'Re Open': {
      id: 'Re Open',
      title: 'Re Open',
      issueIds: [],
      iconType: 'alertCircle',
      color: 'bg-red-500',
      headerColor: 'bg-red-100 border-red-200'
    },
    'Done': {
      id: 'Done',
      title: 'Done',
      issueIds: [],
      iconType: 'checkCircle',
      color: 'bg-green-500',
      headerColor: 'bg-green-100 border-green-200'
    }
  });
  
  // Map for icon types to actual components
  const iconComponents = {
    clock: Clock,
    refreshCw: RefreshCw,
    alertCircle: AlertCircle,
    checkCircle: CheckCircle
  };
  
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('kanban');
  const [isLoading, setIsLoading] = useState(true);

  // Define which issue types each admin can see
  const adminIssueTypes = {
    Admin1: ['REGISTRATION_ISSUE', 'PAYMENT_ISSUE'],
    Admin2: ['EXAMINATION_ISSUE', 'MODULE_CONTENT_ISSUE'],
    Admin3: ['CONVOCATION_ISSUE', 'CAMPUS_ENVIRONMENT_ISSUE'],
    Admin4: ['REQUEST_DOCUMENTS', 'OTHER_ISSUE']
  };

  const apiStatusMapping = {
    'To Do': 'Open',
    'In Progress': 'In Progress',
    'Re Open': 'Re Open',
    'Done': 'Done'
  };

  // Map API status to our column names
  const statusMapping = {
    'Open': 'To Do',
    'In Progress': 'In Progress',
    'Re Open': 'Re Open',
    'Done': 'Done'
  };

  // Map priority numbers to text
  const priorityMapping = {
    1: 'High',
    2: 'Low'
  };

  // Fetch issues from API
  const fetchIssues = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8070/issue/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        // Filter issues based on admin type
        const filtered = response.data.filter(issue => 
          adminIssueTypes[AdminType]?.includes(issue.issueType)
        );
        
        // Transform API data to match our expected format
        const transformedIssues = filtered.map(issue => ({
          id: issue._id,
          studentName: issue.studentName,
          issueType: issue.issueType,
          issueMessage: issue.issueMessage,
          issueStatus: statusMapping[issue.issueStatus] || 'To Do',
          createdAt: issue.issueCreatedDate,
          priority: priorityMapping[issue.issuePriority] || 'Low',
          assignedTo: issue.issueResolvedBy || 'Unassigned',
          comments: [], // You might want to map comments if available
          originalData: issue // Keep original data for reference
        }));

        setIssues(transformedIssues);
        setFilteredIssues(transformedIssues);
        initializeColumns(transformedIssues);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize columns with filtered issues
  const initializeColumns = (issues) => {
    // Create a new columns object without modifying the React component references
    const newColumns = {
      'To Do': {
        id: 'To Do',
        title: 'To Do',
        issueIds: [],
        iconType: 'clock',
        color: 'bg-blue-500',
        headerColor: 'bg-blue-100 border-blue-200'
      },
      'In Progress': {
        id: 'In Progress',
        title: 'In Progress',
        issueIds: [],
        iconType: 'refreshCw',
        color: 'bg-yellow-500',
        headerColor: 'bg-yellow-100 border-yellow-200'
      },
      'Re Open': {
        id: 'Re Open',
        title: 'Re Open',
        issueIds: [],
        iconType: 'alertCircle',
        color: 'bg-red-500',
        headerColor: 'bg-red-100 border-red-200'
      },
      'Done': {
        id: 'Done',
        title: 'Done',
        issueIds: [],
        iconType: 'checkCircle',
        color: 'bg-green-500',
        headerColor: 'bg-green-100 border-green-200'
      }
    };

    // Assign issues to columns
    issues.forEach(issue => {
      const status = issue.issueStatus;
      if (newColumns[status] && !newColumns[status].issueIds.includes(issue.id)) {
        newColumns[status].issueIds.push(issue.id);
      }
    });

    setColumns(newColumns);
  };

  useEffect(() => {
    if (AdminType) {
      fetchIssues();
    }
  }, [AdminType, token]);

  // Update issue status in the database
  const updateIssueStatus = async (issueId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:8070/issue/updateIssueStatus/${issueId}`,
        { issueStatus: apiStatusMapping[newStatus] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data) {
        throw new Error('Failed to update issue status');
      }

      return response.data;
    } catch (error) {
      console.error('Error updating issue status:', error);
      throw error;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500 text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getIssueTypeClass = (type) => {
    switch (type) {
      case 'REGISTRATION_ISSUE': 
      case 'PAYMENT_ISSUE':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'EXAMINATION_ISSUE':
      case 'MODULE_CONTENT_ISSUE':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CONVOCATION_ISSUE':
      case 'CAMPUS_ENVIRONMENT_ISSUE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REQUEST_DOCUMENTS':
      case 'OTHER_ISSUE':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: 
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const truncateText = (text, maxLength = 60) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const sourceColumnKey = source.droppableId;
    const destColumnKey = destination.droppableId;

    if (!columns[sourceColumnKey] || !columns[destColumnKey]) {
      console.error('Column not found:', { source: sourceColumnKey, destination: destColumnKey });
      return;
    }

    // Create a fresh copy of the columns object without using JSON.stringify/parse
    const newColumns = { ...columns };
    
    // Properly copy each column
    Object.keys(newColumns).forEach(key => {
      newColumns[key] = {
        ...newColumns[key],
        issueIds: [...newColumns[key].issueIds]
      };
    });
    
    // Make a fresh copy of issues
    const newIssues = issues.map(issue => ({ ...issue }));

    // Remove from source column
    const sourceIssueIds = newColumns[sourceColumnKey].issueIds;
    sourceIssueIds.splice(source.index, 1);
    
    // Add to destination column
    const destIssueIds = newColumns[destColumnKey].issueIds;
    destIssueIds.splice(destination.index, 0, draggableId);

    // Update issue status in issues array
    const issueIndex = newIssues.findIndex(issue => issue.id === draggableId);
    if (issueIndex !== -1) {
      newIssues[issueIndex] = {
        ...newIssues[issueIndex],
        issueStatus: destColumnKey
      };
      
      // Also update the originalData's issueStatus to match backend format
      if (newIssues[issueIndex].originalData) {
        newIssues[issueIndex].originalData = {
          ...newIssues[issueIndex].originalData,
          issueStatus: apiStatusMapping[destColumnKey] || newIssues[issueIndex].originalData.issueStatus
        };
      }
    }

    // Apply optimistic update
    setColumns(newColumns);
    setIssues(newIssues);

    try {
      // Find the full issue to get the database _id
      const issue = issues.find(i => i.id === draggableId);
      if (!issue) {
        throw new Error('Issue not found in local state');
      }

      // Use the original _id from the issue's originalData
      const dbId = issue.originalData?._id || draggableId;
      
      await updateIssueStatus(dbId, destColumnKey);
      
      // Refresh data to ensure sync with backend
      await fetchIssues();
    } catch (error) {
      console.error('Failed to update status, reverting UI', error);
      // Revert to previous state
      setColumns(columns);
      setIssues(issues);
    }
  };

  const handleCardClick = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'kanban' ? 'table' : 'kanban');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">HelpDesk Tickets</h1>
        <div className="flex space-x-2">
          <button 
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={toggleViewMode}
          >
            {viewMode === 'kanban' ? (
              <>
                <Table size={16} className="mr-1" /> Table View
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                Kanban View
              </>
            )}
          </button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div className="flex justify-center">
          <div className="w-full max-w-8xl">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex h-full pb-4 space-x-4 overflow-x-auto">
                {Object.keys(columns).map(columnKey => {
                  const column = columns[columnKey];
                  // Get the actual icon component based on the iconType string
                  const Icon = iconComponents[column.iconType];
                  
                  return (
                    <div key={columnKey} className="flex-shrink-0 w-80">
                      <div className={`rounded-t-lg ${column.headerColor} p-3 border-b border-l border-r border-t flex items-center justify-between`}>
                        <div className="flex items-center">
                          <Icon size={18} className="mr-2" />
                          <h2 className="font-semibold">{column.title}</h2>
                        </div>
                        <div className="px-2 py-1 text-xs font-medium bg-white border border-gray-300 rounded-full">
                          {column.issueIds.length}
                        </div>
                      </div>
                      
                      <Droppable droppableId={columnKey}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`bg-gray-50 rounded-b-lg p-2 min-h-[500px] border-b border-l border-r ${
                              snapshot.isDraggingOver ? 'bg-blue-50' : ''
                            }`}
                          >
                            {column.issueIds.map((issueId, index) => {
                              const issue = issues.find(i => i.id === issueId);
                              if (!issue) return null;
                              
                              return (
                                <Draggable key={issue.id} draggableId={issue.id} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`bg-white rounded-lg p-3 mb-2 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow ${
                                        snapshot.isDragging ? 'shadow-lg border-2 border-blue-300' : ''
                                      }`}
                                      onClick={() => handleCardClick(issue)}
                                    >
                                      <div className="flex items-start justify-between mb-2">
                                        <span className="text-xs font-medium text-gray-500">#{issue.id.substring(0, 6)}</span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(issue.priority)}`}>
                                          {issue.priority}
                                        </span>
                                      </div>
                                      <h3 className="mb-1 font-medium text-gray-800 truncate">
                                        {issue.studentName}
                                      </h3>
                                      <div className="mb-2">
                                        <span className={`text-xs px-2 py-1 rounded border ${getIssueTypeClass(issue.issueType)}`}>
                                          {issue.issueType.replace(/_/g, ' ')}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-600">
                                        {truncateText(issue.issueMessage)}
                                      </p>
                                      <div className="flex items-center justify-between mt-3">
                                        <div className="text-xs text-gray-500">
                                          {new Date(issue.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center">
                                          <div className="flex items-center justify-center w-6 h-6 text-xs font-medium bg-gray-300 rounded-full">
                                            {issue.assignedTo?.charAt(0) || 'U'}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  );
                })}
              </div>
            </DragDropContext>
          </div>
        </div>
      ) : (
        <TableView issues={filteredIssues} onRowClick={handleCardClick} />
      )}

      {/* Modal for detailed issue view */}
      {isModalOpen && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Issue #{selectedIssue.id.substring(0, 6)}</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Student</p>
                <p className="font-medium">{selectedIssue.studentName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{selectedIssue.issueStatus}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Issue Type</p>
                <div>
                  <span className={`text-xs px-2 py-1 rounded border ${getIssueTypeClass(selectedIssue.issueType)}`}>
                    {selectedIssue.issueType.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(selectedIssue.priority)}`}>
                  {selectedIssue.priority}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registration No</p>
                <p className="font-medium">{selectedIssue.originalData?.studentRegistrationNo || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact No</p>
                <p className="font-medium">{selectedIssue.originalData?.studentContactNo || 'N/A'}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="mb-1 text-sm text-gray-500">Issue Message</p>
              <p className="p-3 rounded bg-gray-50">{selectedIssue.issueMessage}</p>
            </div>
            
            {selectedIssue.originalData?.issueAttachment && (
              <div className="mb-4">
                <p className="mb-1 text-sm text-gray-500">Attachment</p>
                <a 
                  href={selectedIssue.originalData.issueAttachment} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Attachment
                </a>
              </div>
            )}
            
            <div className="mb-4">
              <p className="mb-1 text-sm text-gray-500">Assigned To</p>
              <p>{selectedIssue.assignedTo}</p>
            </div>
            
            <div className="flex justify-end mt-4 space-x-2">
              <button 
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">
                Update Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;