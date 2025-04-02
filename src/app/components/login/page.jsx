'use client'
import { signIn, useSession } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import { PiEyeBold } from "react-icons/pi";
import { FaFacebook } from "react-icons/fa";
import { PiEyeClosedBold } from "react-icons/pi";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [eye, setEye] = useState(false);
    const router = useRouter();

    const data = useSession();
    console.log(data);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password
            });
            if (res.ok) {
                router.push('/components/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col py-12 sm:px-6 lg:px-8 text-[#d31158]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold">
                    Login your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto w-[370px] sm:max-w-md z-10 bg-[#ff066131] rounded-md text-white">
                <div className="bg-transparent py-8 px-4 shadow sm:rounded-lg sm:px-10 backdrop-blur-xl">
                    <form className="space-y-6 flex flex-col" onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <div className="mt-1 relative flex items-center justify-center">
                                <input
                                    id="password"
                                    name="password"
                                    type={eye ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <button className="absolute right-5 z-10 text-xl cursor-pointer" onClick={() => setEye(!eye)}>
                                    {eye ? <PiEyeBold /> : <PiEyeClosedBold />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm">
                                    Remember me
                                </label>
                            </div>
                            <Link href="/components/signup" className='text-blue-600 cursor-pointer'>create account</Link>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-indigo-500"
                            >
                                Login
                            </button>
                        </div>
                        <Link href="components/login" className='text-blue-600 cursor-pointer self-end'>forget password</Link>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="bg-white text-blue-700 py-1 rounded-md flex items-center justify-center text-3xl cursor-pointer">
                                <FcGoogle />
                            </button>

                            <button className="bg-white text-blue-700 py-1 rounded-md flex items-center justify-center text-3xl cursor-pointer">
                                <FaFacebook />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;