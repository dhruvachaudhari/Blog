import React from 'react'
import { useState } from 'react';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        <a href='/'></a>
    }
    return (
        <div className='flex flex-col justify-center items-center h-screen '>
            <h1 className='m-5 font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]'>
                Login
            </h1>
            <form className="flex flex-col justify-center items-center w-[500px] h-[200px] mx-auto p-6 bg-white rounded-lg shadow-diff1 hover:shadow-diff transition duration-1000 ease-in-out">
                <input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' className=' w-[350px] h-10 m-2 p-2 border-b-2  border-black' />
                <input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' className=' w-[350px] h-10 p-2 m-2 border-b-2 border-black' />
                <button onClick={submit} className='text-green-600 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'>Login</button>
            </form>

        </div>
    )
}

export default SignIn


