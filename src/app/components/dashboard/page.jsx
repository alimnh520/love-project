'use client'
import { FaCircleUser } from "react-icons/fa6";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";

const page = () => {
    const [upload, setUpload] = useState(false);
    const [userMenu, setUserMenu] = useState(true);

    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const { data } = useSession();

    const [user, setUser] = useState('');

    const email = data ? data.user.email : '';
    const username = data ? data.user.name : '';
    console.log(email);
    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('username', username);
            formData.append('text', text);
            formData.append('image', image);
            const response = await fetch('/api/user/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/user/my-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({})
                });
                const data = await res.json();
                setUser(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    user && console.log(user)

    return (
        <div className='h-screen flex items-start justify-center  gap-x-4 relative text-white'>

            {upload &&
                <div className="absolute w-7/12 h-auto bg-blue-600 top-1/2 -translate-y-1/2 p-6 flex flex-col gap-y-4 items-center z-30 max-sm:w-full">
                    <div className="absolute top-2 right-2 text-2xl cursor-pointer" onClick={() => setUpload(false)}><RxCross2 /></div>
                    <textarea name="" value={text} className='w-full outline-none border rounded-md p-6 h-60 mt-5' onChange={(e) => setText(e.target.value)}></textarea>

                    <div className="bg-yellow-300 flex items-center justify-center w-80 rounded-md">
                        <input type="file" className='py-2 rounded-md w-full' onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    <button className='py-1.5 bg-red-600 rounded-md text-white text-lg w-40' onClick={handleUpload}>Upload</button>
                </div>
            }

            <div className="absolute left-2 top-2 text-2xl cursor-pointer hidden max-sm:block" onClick={() => setUserMenu(false)}><FaCircleUser /></div>

            <div className={`w-3/12 h-full bg-yellow-200 flex flex-col items-center pt-10 gap-y-3 max-sm:absolute max-sm:w-full transition-all duration-300 ${userMenu ? '-left-full' : 'left-0'}`}>

                <div className="absolute top-2 right-2 text-2xl cursor-pointer hidden max-sm:block" onClick={() => setUserMenu(true)}><RxCross2 /></div>

                <div className="size-40 bg-red-400 rounded-full"></div>
                <h1 className='text-3xl font-medium italic'>Your name here</h1>
                <button className='py-1.5 bg-red-600 rounded-md text-white text-lg w-40' onClick={() => setUpload(true)}>Upload</button>
            </div>
            <div className="w-9/12 h-full overflow-y-scroll bg-red-200 grid grid-cols-3 gap-4 max-sm:gap-0 max-sm:gap-y-5 max-sm:grid-cols-1 max-sm:w-full">
                {
                    user && user.images.map((elem, index) => {
                        return (
                            <div className="bg-green-600 h-auto flex flex-col p-4 gap-y-5" key={index}>
                                <p className='h-10 truncate'>{elem.text ? elem.text : 'Nothing caption...'}</p>
                                <img src={elem.url} alt="" className='w-full h-72 object-cover object-center' />

                                <div className="flex items-center justify-center gap-x-5">
                                    <Link href={`/components/dashboard/${elem.public_id.split('/')[1]}`} className='py-1.5 bg-red-600 rounded-md text-white text-lg w-40 text-center' >See</Link>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    !user && (
                        <div className="w-full h-full flex items-center justify-center">
                            <p>Loading...</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default page