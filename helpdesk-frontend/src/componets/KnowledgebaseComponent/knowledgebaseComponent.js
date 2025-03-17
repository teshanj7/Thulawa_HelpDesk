import React from 'react';
import { FaBook, FaInfoCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-10/12 p-6 mx-auto">
      <motion.h2 
        className="flex items-center mb-8 font-mono text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaBook className="mr-2 text-blue-500" /> Knowledgebase
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-lg"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="flex items-center mb-6 font-mono text-xl font-semibold text-gray-700">
            <FaInfoCircle className="mr-2 text-purple-500" /> Important Issues (36)
          </h3>
          <ul className="space-y-4">
            {generalItems.map((item) => (
              <motion.li 
                key={item.id} 
                className="py-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  data-tooltip-id={`tooltip-${item.id}`}
                  data-tooltip-content={item.tooltip}
                  className="p-2 text-blue-600 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors duration-200"
                >
                  {item.text}
                </button>
                <Tooltip id={`tooltip-${item.id}`} />
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="p-6 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg shadow-lg"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="flex items-center mb-6 font-mono text-xl font-semibold text-gray-700">
            <FaInfoCircle className="mr-2 text-green-500" /> General Issues (1)
          </h3>
          <ul className="space-y-4">
            {verificationItems.map((item) => (
              <motion.li 
                key={item.id} 
                className="py-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  data-tooltip-id={`tooltip-${item.id}`}
                  data-tooltip-content={item.tooltip}
                  className="p-2 text-green-600 bg-white rounded-lg shadow-sm hover:bg-green-50 transition-colors duration-200"
                >
                  {item.text}
                </button>
                <Tooltip id={`tooltip-${item.id}`} />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}