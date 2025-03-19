import React from 'react';
import { motion } from 'framer-motion';
import Logo2 from '../../images/logo2.png';

export default function HelpCenter() {
  const features = [
    { title: "Submit Your Issues", description: "All Issues are here", icon: "📝", link: "/create-issue" },
    { title: "View Your Own Issues", description: "Browse our files", icon: "📂", link: "/view-issue" },
    { title: "Contact UniHelpDesk", description: "Get in touch for help", icon: "📞", link: "/contact-helpdesk" },
  ];

  return (
    <div className="flex flex-col items-center mb-4">
      
      {/* Breadcrumbs Section */}
      <div className="flex items-center w-full px-6 py-3 mb-8 bg-white shadow-md max-w-8xl">
        <img
          src={Logo2}
          alt="Breadcrumb Icon"
          className="w-16 h-10 mr-1"
        />
        <nav className="space-x-1 text-sm text-gray-600">
          <a href="/home" className="text-blue-600 hover:underline">Dashboard</a>
          {/* <span className="text-gray-500">{">"}</span>
          <a href="/" className="text-blue-600 hover:underline">Your Account</a>
          <span className="text-gray-500">{">"}</span>
          <span className="font-medium text-black">Profile</span> */}
        </nav>
      </div>

      {/* Features Section */}
      <div className="flex flex-wrap justify-center gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="flex items-center p-6 text-left transition-shadow bg-white rounded-md shadow-md cursor-pointer w-96"
          >
            <div className="mr-4 text-7xl">{feature.icon}</div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-poppins">{feature.title}</h3>
                <p className="text-sm text-gray-600 font-poppins">{feature.description}</p>
              </div>
              <a
                href={feature.link}
                className="px-4 py-2 mt-4 text-center text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
