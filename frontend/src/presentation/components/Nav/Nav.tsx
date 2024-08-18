import { Avatar } from "flowbite-react";
import React, { SyntheticEvent, useState } from "react";
import logo from "../../../assets/logo.png";
import { BiSearch, BiMenu } from "react-icons/bi";
import { SearchPosts } from "../../../domain/api/post";
import { Navigate, useNavigate } from "react-router-dom";
const navbarOpen = true;

export const Nav: React.FC<{}> = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(true);
  const [redirect, setRedirect] = useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(searchValue);
    navigate("/search/" + searchValue);
    setRedirect(true);
  }

  if (redirect) {
    window.location.reload();
  }

  return (
    <>
      {/* <nav className="bg-white border-b-2 border-r-2 border-l-2 mb-5 border-gray-200 px-2 sm:px-4 py-2.5 rounded-lg dark:bg-gray-900"> */}
      <nav className="bg-white border-b-2 rounded-lg px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            TechSavvy
            </span>
          </a>
          <div className="flex items-center order-1">
            <a href="/upload">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Upload
              </button>
            </a>
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="/login"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Login
                </a>
              </li>
              
            </ul>
          </div>
          <div className="flex md:order-last gap-3">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
            >
              <BiSearch className="h-6 w-6" />
              <span className="sr-only">Search</span>
            </button>

            <div className="hidden relative md:block">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <BiSearch className="h-6 w-6 " color="gray" />

                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => {
                  e.key === "Enter" && handleSearch(e);                  ;
                }}
              />
            </div>
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="true"
            >
              <span className="sr-only">Open menu</span>
              <BiMenu className="h-6 w-6" color="gray" />
            </button>
            <a href="/user/profile" className="flex flex-wrap gap-2">
              <div className="w-10 h-10 rounded-full cursor-pointer">
                <Avatar
                  img="https://m.yodycdn.com/blog/hinh-anh-meo-hai-huoc-yodyvn37.jpg"
                  rounded={true}
                  bordered={true}
                  data-dropdown-toggle="userDropdown"
                  alt="User Avatar"
                />
              </div>
            </a>
          </div>
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <BiSearch className="h-6 w-6" color="gray" />
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
