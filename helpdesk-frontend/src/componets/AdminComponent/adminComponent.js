import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { AlertCircle, Clock, RefreshCw, CheckCircle } from 'lucide-react';

const KanbanBoard = () => {
  const [issues, setIssues] = useState([]);
  const [columns, setColumns] = useState({
    'To Do': {
      id: 'To Do',
      title: 'To Do',
      issueIds: [],
      icon: Clock,
      color: 'bg-blue-500',
      headerColor: 'bg-blue-100 border-blue-200'
    },
    'In Progress': {
      id: 'In Progress',
      title: 'In Progress',
      issueIds: [],
      icon: RefreshCw,
      color: 'bg-yellow-500',
      headerColor: 'bg-yellow-100 border-yellow-200'
    },
    'Re Open': {
      id: 'Re Open',
      title: 'Re Open',
      issueIds: [],
      icon: AlertCircle,
      color: 'bg-red-500',
      headerColor: 'bg-red-100 border-red-200'
    },
    'Done': {
      id: 'Done',
      title: 'Done',
      issueIds: [],
      icon: CheckCircle,
      color: 'bg-green-500',
      headerColor: 'bg-green-100 border-green-200'
    }
  });
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulated data fetching 
  useEffect(() => {
    const fetchIssues = async () => {
      const mockIssues = [
        {
          id: '1',
          studentName: 'John Smith',
          issueType: 'Technical',
          issueMessage: 'Cannot access the online course portal after password reset',
          issueStatus: 'To Do',
          createdAt: '2025-05-12T10:30:00',
          priority: 'High',
          assignedTo: 'Tech Support Team',
          comments: [
            { author: 'Admin', message: 'Looking into this issue', timestamp: '2025-05-12T11:00:00' }
          ]
        },
        {
          id: '2',
          studentName: 'Maria Garcia',
          issueType: 'Administrative',
          issueMessage: 'Need to update personal information in student records',
          issueStatus: 'In Progress',
          createdAt: '2025-05-11T09:15:00',
          priority: 'Medium',
          assignedTo: 'Admin Office',
          comments: [
            { author: 'Admin Staff', message: 'Documentation received', timestamp: '2025-05-11T15:20:00' }
          ]
        },
        {
          id: '3',
          studentName: 'David Johnson',
          issueType: 'Technical',
          issueMessage: 'Assignment submission system errors out with code 500',
          issueStatus: 'Re Open',
          createdAt: '2025-05-10T14:45:00',
          priority: 'Critical',
          assignedTo: 'Developer Team',
          comments: [
            { author: 'Tech Support', message: 'Issue was fixed but occurred again', timestamp: '2025-05-12T08:30:00' }
          ]
        },
        {
          id: '4',
          studentName: 'Emma Wilson',
          issueType: 'Billing',
          issueMessage: 'Double charged for semester registration fees',
          issueStatus: 'Done',
          createdAt: '2025-05-09T11:20:00',
          priority: 'High',
          assignedTo: 'Finance Department',
          comments: [
            { author: 'Finance', message: 'Refund processed', timestamp: '2025-05-11T16:45:00' }
          ]
        },
        {
          id: '5',
          studentName: 'Michael Brown',
          issueType: 'Academic',
          issueMessage: 'Course credit not showing in transcript',
          issueStatus: 'In Progress',
          createdAt: '2025-05-12T08:10:00',
          priority: 'Medium',
          assignedTo: 'Academic Affairs',
          comments: [
            { author: 'Academic Advisor', message: 'Reviewing course records', timestamp: '2025-05-12T10:15:00' }
          ]
        },
        {
          id: '6',
          studentName: 'Sophia Lee',
          issueType: 'Technical',
          issueMessage: 'Unable to download course materials',
          issueStatus: 'To Do',
          createdAt: '2025-05-11T16:30:00',
          priority: 'Low',
          assignedTo: 'IT Support',
          comments: []
        },
        {
          id: '7',
          studentName: 'James Martin',
          issueType: 'Administrative',
          issueMessage: 'Request for enrollment verification letter',
          issueStatus: 'Done',
          createdAt: '2025-05-10T09:45:00',
          priority: 'Low',
          assignedTo: 'Registrar Office',
          comments: [
            { author: 'Registrar', message: 'Letter generated and sent via email', timestamp: '2025-05-11T14:20:00' }
          ]
        }
      ];

      setIssues(mockIssues);

      // Initialize columns with issues
      const columnsCopy = { ...columns };
      mockIssues.forEach(issue => {
        const status = issue.issueStatus;
        if (columnsCopy[status]) {
          columnsCopy[status].issueIds.push(issue.id);
        }
      });
      setColumns(columnsCopy);
    };

    fetchIssues();
  }, []);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getIssueTypeClass = (type) => {
    switch (type) {
      case 'Technical': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Administrative': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Academic': return 'bg-green-100 text-green-800 border-green-200';
      case 'Billing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const truncateText = (text, maxLength = 60) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item was dropped back in its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // Find the source and destination columns
    const sourceColumnKey = source.droppableId;
    const destColumnKey = destination.droppableId;

    if (!columns[sourceColumnKey] || !columns[destColumnKey]) {
      console.error('Column not found:', { source: sourceColumnKey, destination: destColumnKey });
      return;
    }

    // Create copies of the state
    const newColumns = { ...columns };
    const newIssues = [...issues];

    // Remove from source column
    const sourceIssueIds = Array.from(newColumns[sourceColumnKey].issueIds);
    sourceIssueIds.splice(source.index, 1);
    newColumns[sourceColumnKey].issueIds = sourceIssueIds;

    // Add to destination column
    const destIssueIds = Array.from(newColumns[destColumnKey].issueIds);
    destIssueIds.splice(destination.index, 0, draggableId);
    newColumns[destColumnKey].issueIds = destIssueIds;

    // Update the issue status in the issues array
    const issueIndex = newIssues.findIndex(issue => issue.id === draggableId);
    if (issueIndex !== -1) {
      newIssues[issueIndex] = {
        ...newIssues[issueIndex],
        issueStatus: destColumnKey
      };
    }

    setColumns(newColumns);
    setIssues(newIssues);
  };

  const handleCardClick = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const createNewIssue = () => {
    alert('New issue creation would be implemented here');
  };

  const refreshBoard = () => {
    alert('Board refresh would be implemented here');
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">HelpDesk Kanban Board</h1>
        <div className="flex space-x-2">
          <button 
            className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
            onClick={createNewIssue}
          >
            <span className="mr-1">+</span> New Issue
          </button>
          <button 
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={refreshBoard}
          >
            <RefreshCw size={16} className="mr-1" /> Refresh
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-full pb-4 space-x-4 overflow-x-auto">
          {Object.keys(columns).map(columnKey => {
            const column = columns[columnKey];
            const Icon = column.icon;
            
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
                                  <span className="text-xs font-medium text-gray-500">#{issue.id}</span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(issue.priority)}`}>
                                    {issue.priority}
                                  </span>
                                </div>
                                <h3 className="mb-1 font-medium text-gray-800 truncate">
                                  {issue.studentName}
                                </h3>
                                <div className="mb-2">
                                  <span className={`text-xs px-2 py-1 rounded border ${getIssueTypeClass(issue.issueType)}`}>
                                    {issue.issueType}
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
                                      {issue.assignedTo.charAt(0)}
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

      {/* Modal for detailed issue view */}
      {isModalOpen && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Issue #{selectedIssue.id}</h2>
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
                    {selectedIssue.issueType}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(selectedIssue.priority)}`}>
                  {selectedIssue.priority}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="mb-1 text-sm text-gray-500">Issue Message</p>
              <p className="p-3 rounded bg-gray-50">{selectedIssue.issueMessage}</p>
            </div>
            
            <div className="mb-4">
              <p className="mb-1 text-sm text-gray-500">Assigned To</p>
              <p>{selectedIssue.assignedTo}</p>
            </div>
            
            <div className="mb-4">
              <p className="mb-2 text-sm text-gray-500">Comments</p>
              {selectedIssue.comments.length > 0 ? (
                <div className="space-y-2">
                  {selectedIssue.comments.map((comment, index) => (
                    <div key={index} className="p-3 rounded bg-gray-50">
                      <div className="flex justify-between">
                        <p className="font-medium">{comment.author}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm">{comment.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No comments yet</p>
              )}
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