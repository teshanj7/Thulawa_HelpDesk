import React, { useContext, useState } from 'react';
import UserContext from '../../ContextComponent/ContextComponent';
import useCreateIssue from '../../hooks/useCreateIssue';
import Logo2 from '../../images/logo2.png';

export default function CreateIssueComponent() {

    const { user } = useContext(UserContext);
    const userId = user._id;
    const studentName = user.Fullname;
    const studentEmail = user.Email;
    const studentRegistrationNo = user.RegistrationNo;
    const studentFaculty = user.Faculty;
    const issueStatus = "Open";
    const issueCreatedDate = new Date().toLocaleDateString();
    const issueResolvedBy = "";
    const issueResolvedDate = "";
    const issueResolvedMessage = "";

    const { createIssue } = useCreateIssue();

    const [studentCampus, setStudentCampus] = useState('');
    const [studentContactNo, setStudentContactNo] = useState('');
    const [issueType, setIssueType] = useState('');
    const [issueMessage, setIssueMessage] = useState('');
    const [issueAttachment, setIssueAttachment] = useState(null);

    const submitIssue = async (e) => {
        e.preventDefault();
        try {
          await createIssue(
            userId,
            studentName,
            studentEmail,
            studentRegistrationNo,
            studentFaculty,
            studentCampus,
            studentContactNo,
            issueType,
            issueMessage,
            issueAttachment,
            issueStatus,
            issueCreatedDate,
            issueResolvedBy,
            issueResolvedDate,
            issueResolvedMessage
          );
        } catch (error) {
          alert(error);
        }
    };

    const resetForm = () => {
        setStudentCampus('');
        setStudentContactNo('');
        setIssueType('');
        setIssueMessage('');
        setIssueAttachment(null);
    };

    return (
        <div className="bg-gray-400 flex flex-col items-center justify-center pb-4">
            <div className="w-full">
                {/* Breadcrumbs Section */}
                <div className="flex items-center px-6 py-3 mb-6 bg-white shadow-md w-full max-w-8xl">
                    <img
                        src={Logo2}
                        alt="Breadcrumb Icon"
                        className="w-16 h-10 mr-1"
                    />
                    <nav className="space-x-1 text-sm text-gray-600">
                        <a href="/home" className="text-blue-600 hover:underline">Dashboard</a>
                        <span className="text-gray-500">{">"}</span>
                        <span className="font-medium text-black">Submit Issue</span>
                        <span className="text-gray-500">{">"}</span>
                        <span className="font-medium text-black">Submit-Form</span>
                    </nav>
                </div>

                {/* Heading Section */}
                <div className="py-4 text-center">
                    <h1 className="font-mono text-5xl text-black font-aldrich">Submit Your Issue</h1>
                </div>
            </div>
            <form className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-lg" onSubmit={submitIssue}>
                <div className="grid grid-cols-2 gap-8">
                    {/* Left Side */}
                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={studentName} 
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={studentEmail} 
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Registration No */}
                        <div>
                            <label htmlFor="registrationNo" className="block text-sm font-medium text-gray-700">Registration No</label>
                            <input
                                type="text"
                                value={studentRegistrationNo}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Faculty Dropdown */}
                        <div>
                            <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">Faculty</label>
                            <input
                                type="text"
                                value={studentFaculty}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Campus Dropdown */}
                        <div>
                            <label htmlFor="campus" className="block text-sm font-medium text-gray-700">Campus</label>
                            <select
                                value={studentCampus} 
                                onChange={(e) => setStudentCampus(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select Campus</option>
                                <option value="Main Campus">SLIIT Malabe</option>
                                <option value="City Campus">SLIIT Metro</option>
                                <option value="North Campus">SLIIT Kandy</option>
                            </select>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-6">
                        {/* Contact No */}
                        <div>
                            <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">Contact No</label>
                            <input
                                type="text"
                                value={studentContactNo} 
                                onChange={(e) => setStudentContactNo(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your contact number"
                            />
                        </div>

                        {/* Issue Type Dropdown */}
                        <div>
                            <label htmlFor="issueType" className="block text-sm font-medium text-gray-700">Issue Type</label>
                            <select
                                value={issueType} 
                                onChange={(e) => setIssueType(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select Issue Type</option>
                                <option value="REGISTRATION_ISSUE">Registration Issue</option>
                                <option value="EXAMINATION_ISSUE">Examination Issue</option>
                                <option value="PAYMENT_ISSUE">Payment Issue</option>
                                <option value="REQUEST_DOCUMENTS">Request Documents</option>
                                <option value="CONVOCATION_ISSUE">Convocation Issue</option>
                                <option value="CAMPUS_ENVIRONMENT_ISSUE">Campus Environment Issue</option>
                                <option value="MODULE_CONTENT_ISSUE">Module Content Issue</option>
                                <option value="OTHER_ISSUE">Other Issue</option>
                            </select>
                        </div>

                        {/* Issue Message */}
                        <div>
                            <label htmlFor="issueMessage" className="block text-sm font-medium text-gray-700">Issue Message</label>
                            <textarea
                                value={issueMessage} 
                                onChange={(e) => setIssueMessage(e.target.value)}
                                rows="4"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Describe your issue"
                            ></textarea>
                        </div>

                        {/* Attachment */}
                        <div>
                            <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">{issueAttachment
                                ? `File uploaded: ${issueAttachment.name}`: " "}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setIssueAttachment(e.target.files[0])}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Clear
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}