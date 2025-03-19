import React, { useState, useContext } from 'react';
import UserContext from '../../ContextComponent/ContextComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import useViewIssueById from '../../hooks/useViewIssuebyID';
import Logo2 from '../../images/logo2.png';

export default function ViewIssueComponent() {
    const { user } = useContext(UserContext);
    const userId = user._id;
    const { issueData } = useViewIssueById(userId);

    console.log(issueData)
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;

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

    const handleDelete = (item) => {
        // Add your delete logic here
        console.log('Delete item:', item);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                                    <tr key={index} className="transition duration-150 ease-in-out hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item._id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 uppercase whitespace-nowrap">{item.studentRegistrationNo}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.issueType}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.issueMessage}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap" style={{ color: item.issueStatus ? 'green' : 'red' }}>
                                            {item.issueStatus ? 'Complete' : 'Pending'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.location.href = `/updateProduct/${item.productId}`;
                                                }}
                                                className="p-2 mr-2 text-yellow-600 transition duration-150 ease-in-out hover:text-yellow-800"
                                            >
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item)}
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
        </>
    );
}