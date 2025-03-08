import React from 'react';

export default function HelpCenter() {
  const features = [
    { title: "Submit Your Issues", description: "All Issues are here", icon: "📘", link: "/submit-issues" },
    { title: "View Your Own Issues", description: "Browse our files", icon: "📂", link: "/view-issues" },
    { title: "Contact UniHelpDesk", description: "Get in touch for help", icon: "✉️", link: "/contact-helpdesk" },
  ];

  return (
    <div className="flex justify-center gap-6 my-8">
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
  );
}
