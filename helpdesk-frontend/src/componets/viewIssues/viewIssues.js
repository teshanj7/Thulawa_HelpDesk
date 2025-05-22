import { useState, useContext } from 'react';
import UserContext from '../../ContextComponent/ContextComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Clock, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import useViewIssueById from '../../hooks/useViewIssuebyID';
import useDeleteIssue from '../../hooks/useDeleteIssue';
import Logo2 from '../../images/logo2.png';
import axios from 'axios';

export default function ViewIssueComponent() {
    const { user, token } = useContext(UserContext);
    const userId = user._id;
    const { issueData } = useViewIssueById(userId);
    const { onDeleteIssue } = useDeleteIssue(userId);

    // State for modal and selected issue
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const getStatusIcon = (status) => {
        switch (status) {
            case 'To Do': return <Clock size={16} className="text-blue-500" />;
            case 'In Progress': return <RefreshCw size={16} className="text-yellow-500" />;
            case 'Re Open': return <AlertCircle size={16} className="text-red-500" />;
            case 'Done': return <CheckCircle size={16} className="text-green-500" />;
            default: return <Clock size={16} />;
        }
    };

    const getIssueTypeClass = (type) => {
        switch (type) {
            case 'REGISTRATION_ISSUE': 
            case 'OTHER_ISSUE':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'EXAMINATION_ISSUE':
            case 'CAMPUS_ENVIRONMENT_ISSUE':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'CONVOCATION_ISSUE':
            case 'MODULE_CONTENT_ISSUE':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'REQUEST_DOCUMENTS':
            case 'PAYMENT_ISSUE':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: 
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (!issueData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">Loading your issues...</p>
            </div>
        );
    }

    // Calculate the total number of pages
    const totalPages = Math.ceil(issueData.length / itemsPerPage);

    // Get the current page's data
    const currentData = issueData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteIssue = async (userId) => {
        const isDeleted = await onDeleteIssue(userId);
        if (isDeleted) {
            alert("Issue has been deleted successfully!");
            window.location.href = "/view-issue";
        } else {
          console.log(
            "Error with the product deletion, please try again later ..."
          );
        }
    };

    const handleRowClick = (issue) => {
        setSelectedIssue(issue);
        // setNewStatus(issue.issueStatus);
        setIsModalOpen(true);
    };

    const handleUpdateIssue = async () => {
        try {
            const updateData = {
                issueStatus: newStatus
            };

            const response = await axios.put(
                `http://localhost:8070/issue/updateIssueStatus/${selectedIssue._id}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data) {
            alert("Issue updated successfully!");
            setIsModalOpen(false);
            // Force a refresh of the data
            window.location.reload(); // Temporary solution
            }
        } catch (error) {
            console.error('Error updating issue:', error);
            alert('Failed to update issue');
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center pb-4 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400">
                <div className="w-full">
                    {/* Breadcrumbs Section */}
                    <div className="flex items-center w-full px-6 py-3 mb-6 bg-white shadow-md max-w-8xl">
                        <img
                            src={Logo2}
                            alt="Breadcrumb Icon"
                            className="w-16 h-10 mr-1"
                        />
                        <nav className="space-x-1 text-sm text-gray-600 font-poppins">
                            <a href="/home" className="text-blue-600 hover:underline">
                                Dashboard
                            </a>
                            <span className="text-gray-500">{'>'}</span>
                            <span className="font-medium text-black">View Issues</span>
                            <span className="text-gray-500">{'>'}</span>
                            <span className="font-medium text-black">Your-Issues</span>
                        </nav>
                    </div>

                    {/* Heading Section */}
                    <div className="py-4 text-center">
                        <h1 className="text-5xl text-black font-popins">View Your Issues</h1>
                    </div>

                    {/* Issue Table Section */}
                    <div className="px-6 pb-6 ProductTable table-responsive">
                        <table className="min-w-full overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg">
                            <thead className="bg-blue-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">
                                        Issue ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">
                                        Student ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">
                                        Issue Type
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">
                                        Issue Message
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">
                                        Issue Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentData.map((item, index) => (
                                    <tr 
                                        key={index} 
                                        className="transition duration-150 ease-in-out cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleRowClick(item)}
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item._id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 uppercase whitespace-nowrap">{item.studentRegistrationNo}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            <span className={`text-xs px-2 py-1 rounded border ${getIssueTypeClass(item.issueType)}`}>
                                                {item.issueType.replace(/_/g, ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.issueMessage}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getStatusIcon(item.issueStatus)}
                                                <span className="ml-1">{item.issueStatus}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRowClick(item);
                                                }}
                                                className="p-2 mr-2 text-yellow-600 transition duration-150 ease-in-out hover:text-yellow-800"
                                            >
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteIssue(item._id);
                                                }}
                                                className="p-2 text-red-600 transition duration-150 ease-in-out hover:text-red-800"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-6">
                            <nav className="inline-flex rounded-md shadow-sm">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`px-4 py-2 text-sm font-medium ${
                                            currentPage === i + 1
                                                ? 'bg-blue-400 text-black'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                        } border border-gray-300`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Issue Detail Modal */}
            {isModalOpen && selectedIssue && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-2xl p-6 bg-white rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Issue #{selectedIssue._id.substring(0, 6)}</h2>
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
                                <p className="text-sm text-gray-500">Student ID</p>
                                <p className="font-medium">{selectedIssue.studentRegistrationNo}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <div className="flex items-center">
                                    {getStatusIcon(selectedIssue.issueStatus)}
                                    <span className="ml-1 font-medium">{selectedIssue.issueStatus}</span>
                                </div>
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
                                <p className="text-sm text-gray-500">Created Date</p>
                                <p className="font-medium">
                                    {new Date(selectedIssue.issueCreatedDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <p className="mb-1 text-sm text-gray-500">Issue Message</p>
                            <p className="p-3 rounded bg-gray-50">{selectedIssue.issueMessage}</p>
                        </div>
                        
                        {selectedIssue.issueAttachment && (
                            <div className="mb-4">
                                <p className="mb-1 text-sm text-gray-500">Attachment</p>
                                <a 
                                    href={selectedIssue.issueAttachment} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    View Attachment
                                </a>
                            </div>
                        )}
                        
                        <div className="mb-4">
                            <p className="mb-1 text-sm text-gray-500">Update Status</p>
                            <select
                                className="w-full p-2 border rounded"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="Re Open">Re Open</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 text-sm text-gray-500">Resolution Message</p>
                            <p className="p-3 rounded bg-gray-50">{selectedIssue.issueResolvedMessage}</p>
                        </div>
                        
                        <div className="flex justify-end mt-4 space-x-2">
                            <button 
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                            <button 
                                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                onClick={handleUpdateIssue}
                            >
                                Update Issue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}