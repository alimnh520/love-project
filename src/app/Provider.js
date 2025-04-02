'use client'
import React, { useEffect, useRef } from 'react'
import Header from './layout/Header'
import { SessionProvider } from 'next-auth/react';

const Provider = ({ children }) => {
    const mainDiv = useRef();

    useEffect(() => {
        if (mainDiv.current) {
            for (let i = 0; i < 30; i++) {
                const newDiv = document.createElement('span');
                newDiv.classList.add('love');
                mainDiv.current.appendChild(newDiv);

                const randomSize = Math.random() * 20 + 10;

                newDiv.style.height = randomSize + 'px';
                newDiv.style.width = randomSize + 'px';

                newDiv.style.setProperty('--before-top', randomSize / 2 + 'px');
                newDiv.style.setProperty('--after-left', randomSize / 2 + 'px');

                const delayTime = Math.random() * 3 + 2;
                const durationTime = Math.random() * 4 + 2;
                newDiv.style.animationDelay = delayTime + 's';
                newDiv.style.animationDuration = durationTime + 's';

                const move = Math.random() * window.innerWidth + 0;
                newDiv.style.left = move + 'px';
            }
        }
        
    }, []);

    return (
        <div className='bg-[#111020] w-full overflow-hidden relative' ref={mainDiv}>
            <SessionProvider>
                <Header />
                {children}
            </SessionProvider>
        </div>
    )
}

export default Provider