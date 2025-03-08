import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const App = () => {
  const data = {
    labels: ['Payment Issues', 'Registration Issues', 'Examination Issues', 'Convacation Issues', 'Campus Environment Issues', 
      'Module Content Issues', 'Request Docs Issues', 'General Issues'],
    datasets: [
      {
        label: 'Issue Types',
        data: [130, 20, 15, 45, 10, 5, 8, 10],
        backgroundColor: [
          'rgba(255, 0, 0, 0.7)',    // Red
          'rgba(0, 0, 255, 0.4)',    // Blue
          'rgba(255, 255, 0, 0.8)',  // Yellow
          'rgba(0, 255, 255, 0.8)',  // Cyan
          'rgba(0, 128, 0, 0.8)',    // Green
          'rgba(255, 165, 0, 0.9)',  // Orange
          'rgba(255, 0, 0, 0.2)',// Silver
          'rgba(0, 0, 128, 0.9)',    // Navy
        ],
        borderColor: [
          'rgba(255, 0, 0, 0.9)',    // Red
          'rgba(0, 0, 255, 0.9)',    // Blue
          'rgba(255, 255, 0, 0.9)',  // Yellow
          'rgba(0, 255, 255, 0.9)',  // Cyan
          'rgba(0, 128, 0, 0.9)',    // Green
          'rgba(255, 165, 0, 0.9)',  // Orange
          'rgba(192, 192, 192, 0.9)',// Silver
          'rgba(0, 0, 128, 0.9)',    // Navy
        ],
        borderWidth: 1,
      },
    ],
  };

  const features = [
    { title: "View Your Own Issues", description: "All Issues are here", icon: "📘", link: "/submit-issues" },
    { title: "View All Students", description: "Browse our files", icon: "📂", link: "/view-issues" },
    { title: "Contact UniHelpDesk", description: "Get in touch for help", icon: "✉️", link: "/contact-helpdesk" },
  ];

  return (
    <div className="flex p-4 bg-gray-300 ">
      {/* Pie Chart */}
      <div className="w-1/3 p-4 mr-20 ml-11">
        <h2 className="mb-4 font-mono text-4xl text-start">Admin Dashboard</h2>
        <div className="w-full">
          <Pie data={data} />
        </div>
      </div>

      {/* Cards */}
      <div className="w-2/3 p-4">
        <div className="flex flex-col gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center w-4/5 p-6 text-left transition-shadow bg-white rounded-md shadow-md cursor-pointer hover:shadow-lg"
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
    </div>
  );
};

export default App;