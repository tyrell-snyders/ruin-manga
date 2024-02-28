'use client'

import { useState, useContext, useEffect } from 'react'
import { GlobalContext } from "@/context"
import { logger } from "@/utils/logger"
import TrendingTile from './TrendingTile'
import { getTrendingComics } from '@/services/comic/trending'
import { TrendingItem } from '@/utils/interface'


export default function Trending() {
    // Context
    const context = useContext(GlobalContext);

    //Use State
    const [trendingData, setTrendingData] = useState<TrendingItem[]>([])

    if (context === null) {
        logger.error("No context")
        return null;
    }

    const { coverArt, setcoverArt, loading, setLoading } = context
    
    const getTrending = async () => {
        try {
            const result = await getTrendingComics() as TrendingItem;
            if (result && typeof result === 'object') {
                setTrendingData([result]);
                // setTrend([result])
            } else {
                logger.error('Fetched data is not in the expected format.');
            }
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error getting trend data: ${e.message}`);
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getTrending();
        };
        fetchData();
    }, []);

    let data
    data = trendingData[0]?.data


    const dta = data?.data
    let coverArtIds: string[] = []

    if (dta && dta.length > 0) {
        // Extract IDs with type 'cover_art'
        coverArtIds = dta
            .map((d) => d.relationships)
            .flat() // Flatten the nested arrays
            .filter((relationship) => relationship.type === 'cover_art')
            .map((relationship) => relationship.id);
    }

    useEffect(() => {
        setcoverArt(coverArtIds)
        setLoading(false)
    }, [dta])

    if (loading) {
        return (
            <section className='bg-gray-700 rounded-lg mt-20 mb-10 sm:py-16'>
                <div className="mx-4 my-10 px-4 sm:px-6">
                    <h1>Loading...</h1>
                </div>
            </section>
        )
    }
    
    return (
        <section className='bg-gray-700 rounded-lg mt-20 mb-10 sm:py-16 border border-gray-200'>
            <div className="mx-4 my-10 px-4 sm:px-6">
                <div className="grid gap-6 lg:grid-cols-4 sm:gap-4 md:grid-cols-2">
                    {
                        !loading && data?.data && data?.data.length ?
                        data?.data.map((item: any, i: number) => {
                            return ( 
                                <article 
                                    key={i}
                                    className="border border-gray-800 relative flex flex-col overflow-hidden border cursor-pointer rounded-lg shadow-xl"
                                >
                                    <TrendingTile item={item} coverArt={coverArt[i]} />
                                </article>
                            )
                        }) : (
                            <h1 className="flex text-xl font-bold">No Data Found</h1>
                        )
                    }
                </div>
            </div>
        </section>
    )
}