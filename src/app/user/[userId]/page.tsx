'use client'

import { useRouter } from 'next/navigation'
import { GlobalContext } from "@/context"
import { logger } from "@/utils/logger"
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Favourite } from "@/utils/interface"
import MangaCards from "@/components/MangaCards/MangaCards"

export default function UserPage({ params } : { params: { userId: string } }) {
    const router = useRouter();
    const context = useContext(GlobalContext);

    const handleUser = async(uID: string) => {
        //Gets the user's data as the page loads e.g. Favourites, username and profile picture 
        
    }

    return (
        <div className='flex flex-col justify-center p-24 sm:p-1 ml-16 mr-10 mt-20'>
            <div className='flex items-center p-6'>
                <Image 
                    className='m-6 rounded-2xl'
                    alt='profile picture'
                    src={'https://static.animecorner.me/2023/12/1702779218-65971.jpg'}
                    width={100}
                    height={100}
                />
                <h1 className='text-lg font-bold'>Username</h1>
            </div>
            <div className="flex flex-col mt-14 ml-20">
                <h2 className='text-2xl font-bold'>Favourites</h2>
                <div className="grid gap-6 lg:grid-cols-4 sm:gap-4 md:grid-cols-2 m-8">
                    {/* TODO: Display user's favourites */}
                </div>
            </div>
            
        </div>
    );
}