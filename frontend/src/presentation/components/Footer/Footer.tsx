import React from "react";
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="p-4 w-full bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0">
            <img
              src={logo}
              className="mr-3 h-8"
              alt="Go Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              TechSavvy
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

       
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-5 gap-8">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Company
            </h3>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">About Us</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Careers</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Press</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Blog</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Products
            </h3>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">App</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Integration</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Features</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Pricing</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Resources
            </h3>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">Documentation</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">API Reference</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Guides</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Community</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Connect
            </h3>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">Facebook</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Twitter</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">LinkedIn</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Instagram</a>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Legal
            </h3>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">Terms of Service</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Privacy Policy</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline">License Agreement</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            TechSavvy
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </>
  );
};

export default Footer;
