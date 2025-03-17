import React from 'react';
import { motion } from 'framer-motion';

export default function SupportCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className="w-4/5 mx-auto overflow-hidden bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="px-6 py-8">
        <h2 className="font-poppins text-2xl font-semibold text-gray-800 mb-4">
          Welcome to Uni HelpDesk Services
        </h2>
        <p className="font-poppins text-gray-600 leading-relaxed">
          If you are seeking for information, please type in the keywords in the search bar.
          Should you wish to connect with us, please fill out the Contact Us form.
          We are constantly updating this site to provide up-to-date services for you.
        </p>
      </div>
    </motion.div>
  );
}
