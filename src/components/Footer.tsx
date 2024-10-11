"use client";

import Image from "next/image";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Import additional social icons as needed

const Footer = () => {
  return (
    <div className="flex flex-row justify-between py-4 text-center bg-primary text-white px-20">
      <div className="flex justify-between gap-4">
        <a href="/impressum" className="hover:underline">
          Impressum
        </a>
        <a href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
      </div>
      <div className="mb-2">&copy; 2024 Thomas Schwabauer</div>
      <div className="flex justify-center space-x-4">
        <a
          href="https://www.linkedin.com/in/your-profile" // Replace with your LinkedIn profile URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://github.com/your-profile" // Replace with your GitHub profile URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300"
        >
          <FaGithub size={24} />
        </a>
        {/* Add more social links as needed */}
      </div>
    </div>
  );
};

export default Footer;
