import React from 'react';
import { FaBook, FaInfoCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

export default function Knowledgebase() {

  const generalItems = [
    { id: 1, text: 'Payment Issues', tooltip: 'Information about the organization' },
    { id: 2, text: 'Registration Issues', tooltip: 'Details about Courseweb platform' },
    { id: 3, text: 'Examination Issues', tooltip: 'Guide for semester registration' },
  ];

  const verificationItems = [
    { id: 1, text: 'Convacation Issues', tooltip: 'Information on credit conversion' },
    { id: 2, text: 'Campus Environment Issues', tooltip: 'Information on credit conversion' },
    { id: 3, text: 'Module Content Issues', tooltip: 'Information on credit conversion' },
    { id: 4, text: 'Request Docs Issues', tooltip: 'Information on credit conversion' },
    { id: 5, text: 'General Issues', tooltip: 'Information on credit conversion' },
  ];

  return (
    <div className="w-10/12 p-6 mx-auto">
      <h2 className="flex items-center mb-4 font-mono text-xl">
        <FaBook className="mr-2" /> Knowledgebase
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="flex items-center mb-4 font-mono">
            <FaInfoCircle className="mr-2" /> Important Issues (36)
          </h3>
          <ul className="ml-6 text-sm text-gray-700">
            {generalItems.map((item) => (
              <li key={item.id} className="py-2">
                <button
                  data-tooltip-id={`tooltip-${item.id}`}
                  data-tooltip-content={item.tooltip}
                  className="p-0 text-blue-500 bg-transparent border-none cursor-pointer"
                >
                  {item.text}
                </button>
                <Tooltip id={`tooltip-${item.id}`} />
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="flex items-center mb-4 font-mono">
            <FaInfoCircle className="mr-2" /> General Issues (1)
          </h3>
          <ul className="ml-6 text-sm text-gray-700">
            {verificationItems.map((item) => (
              <li key={item.id} className="py-2">
                <button
                  data-tooltip-id={`tooltip-${item.id}`}
                  data-tooltip-content={item.tooltip}
                  className="p-0 text-blue-500 bg-transparent border-none cursor-pointer"
                >
                  {item.text}
                </button>
                <Tooltip id={`tooltip-${item.id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
