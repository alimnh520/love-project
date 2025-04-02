'use client'
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const params = useParams();
    const [user, setUser] = useState('');
    console.log(params);
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
    return (
        <div className='w-full h-auto flex flex-col p-10'>
            {
                user ? (
                    user.images.filter((currElm) => {
                        return currElm.public_id.split('/')[1] === params.id;
                    }).map((elem, index) => {
                        return (
                            <div className="bg-green-600 w-full h-auto flex flex-col p-4 gap-y-5" key={index}>
                                <p className=''>{elem.text ? elem.text : 'Nothing caption...'}</p>
                                <img src={elem.url} alt="" className='' />

                                <div className="flex items-center justify-center gap-x-5">
                                    <button className='py-1.5 bg-red-600 rounded-md text-white text-lg w-40 text-center cursor-pointer' >Delete</button>
                                    <button className='py-1.5 bg-red-600 rounded-md text-white text-lg w-40 text-center cursor-pointer' >Download</button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <p>Loading</p>
                )
            }
        </div>
    )
}

export default page