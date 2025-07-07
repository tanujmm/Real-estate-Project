import React from "react";
import { FaLaptopCode, FaHome, FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-100 text-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-blue-600 text-white py-16 text-center px-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About This Project
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          This is a simple real estate web app built for learning and practice.
          It helps explore how to create a full-stack project using React and
          Node.js.
        </p>
      </motion.div>

      <div className="px-6 md:px-16 py-14 space-y-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Why This App?</h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            This dummy real estate app was made as a practice project to
            understand how to build modern web applications. It includes
            features like user login, posting property listings, searching
            homes, and contacting property owners.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: (
                <FaLaptopCode className="text-4xl text-blue-600 mx-auto mb-4" />
              ),
              title: "Learning Full Stack",
              description:
                "Built using React for frontend and Express/MongoDB for backend. Helps understand how full-stack apps work.",
            },
            {
              icon: <FaHome className="text-4xl text-blue-600 mx-auto mb-4" />,
              title: "Dummy Listings",
              description:
                "Properties shown here are not real. They’re just used for testing features like filtering, sorting, and messaging.",
            },
            {
              icon: (
                <FaUserGraduate className="text-4xl text-blue-600 mx-auto mb-4" />
              ),
              title: "Made for Practice",
              description:
                "This app was created as a student project to practice coding skills, not for real business or commercial use.",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {card.icon}
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-blue-100 rounded-xl p-10 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Note from Developer</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed">
            I'm learning how to build better websites, and this project helped
            me practice real-world features like login, search, filters, and
            database connections. Thanks for checking it out!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
