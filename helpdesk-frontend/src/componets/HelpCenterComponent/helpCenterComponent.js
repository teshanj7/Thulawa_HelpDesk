import React from 'react';
import Logo2 from '../../images/logo2.png';

export default function HelpCenter() {
  const features = [
    { title: "Submit Your Issues", description: "All Issues are here", icon: "📘", link: "/create-issue" },
    { title: "View Your Own Issues", description: "Browse our files", icon: "📂", link: "/view-issues" },
    { title: "Contact UniHelpDesk", description: "Get in touch for help", icon: "✉️", link: "/contact-helpdesk" },
  ];

  return (
    <div className="flex flex-col items-center mb-4">
      
      {/* Breadcrumbs Section */}
      <div className="flex items-center px-6 py-3 mb-8 bg-white shadow-md w-full max-w-8xl">
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
      <div className="flex justify-center gap-6 flex-wrap">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center p-6 text-left transition-shadow bg-white rounded-md shadow-md cursor-pointer w-96 hover:shadow-lg"
          >
            <div className="mr-4 text-7xl">{feature.icon}</div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-mono text-lg">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
              <a
                href={feature.link}
                className="px-4 py-2 mt-4 text-center text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
