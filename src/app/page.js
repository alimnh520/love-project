'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/user/user-image', { method: 'GET' });
        const data = await res.json();
        setUser(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='w-full h-auto flex flex-col items-center text-[#d31158] px-20 max-sm:px-5 max-sm:gap-5 mt-5'>
      <h1 className='text-2xl font-semibold sm:text-yellow-600 drop-shadow-[0_0_10px_#d31158]'>COUPLE IN LOVE</h1>
      <div className="w-full relative grid grid-cols-4 gap-8 max-sm:grid-cols-1 max-sm:gap-0 max-sm:gap-y-5">
        {
          user && user.slice().reverse().map((elem) => {
            return (
              <div className="h-auto flex flex-col p-4 gap-y-5 max-sm:p-0" key={elem._id}>
                <div className='flex items-center gap-x-5'>
                  <p>{elem.username}</p>
                </div>
                <p className=''>Caption: {elem.text}</p>
                <a href={elem.img_url} className='w-full h-96' >
                  <img src={elem.img_url} alt="" className='w-full h-full object-center object-cover' />
                </a>
              </div>
            )
          })
        }
        {
          user && <p>Nothing here...</p>
        }
      </div>
      {!user && (
        <div className='w-full h-screen flex items-center justify-center'>
          <p>Loading.....</p>
        </div>
      )}

    </div>
  )
}

export default page