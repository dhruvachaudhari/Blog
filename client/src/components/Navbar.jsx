import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/react.svg'

function Navbar({ currentUser, logout }) {

    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const check = true

    return (
        <nav className="bg-white text-black border-gray-200  font-noto">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-evenly mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Logo} className="h-8" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">YourBrand</span>
                </Link>

                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {check ? (
                        <>
                            <button
                                type="button"
                                className="flex text-sm  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-expanded={dropdownOpen}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src={"https://i.pinimg.com/236x/e8/e6/41/e8e64141f4c0ae39c32f9701ccea9a2e.jpg"} alt="User profile" />
                            </button>
                            {dropdownOpen && (
                                <div className="z-50 absolute top-12 right-4 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                    <div className="px-4 py-3">
                                        {/* <span className="block text-sm text-gray-900 dark:text-white">{currentUser.username}</span>
                                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{currentUser.email}</span> */}
                                        <span className="block text-sm text-black dark:text-white">name</span>
                                        <span className="block text-sm text-black truncate dark:text-gray-400">email</span>
                                    </div>
                                    <ul className="py-2">
                                        <li>
                                            <Link to="/dashboard" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                                        </li>

                                        <li>
                                            <span onClick={logout} className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">Sign out</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" to="/login">
                            Login
                        </Link>
                    )}
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-controls="navbar-user"
                        aria-expanded={menuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
                <div className={` text-xl items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? 'flex' : 'hidden'}`}>
                    <ul className="flex flex-col font-medium p-4 w-full md:p-0 mt-4 border border-gray-100 rounded-lg text-black bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white md:dark:bg-white dark:bg-white">
                        <li>
                            <Link to="/posts" className="block animate-T1 py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</Link>
                        </li>
                        <li>
                            <Link to="/blogs" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Blogs</Link>
                        </li>
                        <li>
                            <Link to="/posts" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 darktext-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
                        </li>
                        {check && (
                            <li>
                                <Link to="/write" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Write</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );

}

export default Navbar

