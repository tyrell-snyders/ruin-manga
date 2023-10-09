'use client'

import { useState, useContext, useEffect, Dispatch, SetStateAction } from 'react'
import { useRouter, usePathname } from "next/navigation"
import { GlobalContext } from "@/context"
import { logger } from "@/utils/logger"
import dynamic from 'next/dynamic'
// import { getTrending } from '@/services/dummyData'
import TrendingTile from './TrendingTile'
import { getTrendingComics } from '@/services/comic/trending'

interface TrendingItem {
    id: number;
    name: string;
    slug: string;
    image: string;
    type: string;
}


export default function Trending() {
    // Context
    const context = useContext(GlobalContext);

    //Use State
    const [dummyData, setDummyData] = useState<TrendingItem[]>([])
    const [trendingData, setTrendingData] = useState<unknown[]>([])

    if (context === null) {
        logger.error("No context")
        return null;
    }

    // const getDummyData = async () => {
    //     try {
    //         const result = await getTrending();
    //         if (result === null) {
    //             logger.error(`There is no data`);
    //         } else {
    //             setDummyData(result as unknown as TrendingItem[]); // Type assertion here
    //         }
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             logger.error(`Error getting trend data: ${error.message}`);
    //         }
    //     }
    // }

    const getTrending = async() => {
        try {
            const result = await getTrendingComics()
            if (result === null)
                logger.error(`There is no data`)
            else
                setTrendingData(result)
        } catch (e) {
            if (e instanceof Error)
                logger.error(`Error getting trend data: ${e.message}`)
        }
    }

    // useEffect(() => {
    //     getDummyData()
    // }, [])

    useEffect(() => {
        getTrending()
    }, [])

    console.log(trendingData);
    

    return (
        <section className='bg-gray-700 rounded-lg mt-20 mb-10 sm:py-16 border border-gray-200'>
            <div className="mx-4 my-10 px-4 sm:px-6">
                <div className="grid gap-6 lg:grid-cols-4 sm:gap-4 md:grid-cols-2">
                    {
                        dummyData && dummyData.length ?
                        dummyData.map((item) => (
                            <>
                                <article 
                                    key={item.id}
                                    className="border border-gray-800 relative flex flex-col overflow-hidden border cursor-pointer rounded-lg shadow-xl"
                                >
                                    <TrendingTile item={item} />
                                </article> 
                            </>
                        )) : (
                            <h1 className="flex text-xl font-bold">No Data Found</h1>
                        )
                    }
                </div>
            </div>
        </section>
    )
}