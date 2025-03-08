import React from 'react';

export default function SupportCard() {
    return (
        <div className="w-4/5 mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4">
                <h2 className="font-mono text-2xl font-semibold text-gray-800">Welcome to Uni HelpDesk Services</h2>
                <p className="mt-2 text-gray-600 ">
                    If you are seeking for information, please type in the keywords in the search bar. Should you wish to connect with us, please fill out the Contact Us form. We are constantly updating this site to provide up-to-date services for you.
                </p>
            </div>
        </div>
    );
}