'use client'

import { useState, useEffect, useContext } from "react"
import { GlobalContext } from "@/context"
import { Favourite, Favourites } from "@/utils/interface"
import { logger } from "@/utils/logger"
import { getFavourites } from "@/services/comic/favourites"
import MangaCards from "@/components/MangaCards/MangaCards"

export default function Favourites() {
    //context
    const context = useContext(GlobalContext)

    if (context === null) {
        console.log('No context')
        return (
            <h1>No Context</h1>
        )
    }
    const { user } = context

    // use Hooks
    const [favourites, setFavourites] = useState<Favourites>(null)
    const [loading, setLoading] = useState(true)

    const handleFavourites = async () => {
        try {
            setLoading(true);
            const res = await getFavourites(user.id)
            setFavourites(res?.result as Favourites)
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error: ${e.message}`)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        async function getFav() {
            await handleFavourites()
        }
        getFav()
    }, [user])

    useEffect(() => {
        if (!loading && favourites) {
            console.log(favourites)
        }
    }, [favourites, loading])

    if (loading) {
        return (
            <div className="flex min-h-screen min-w-screen flex-col justify-center items-center p-24 sm:p-1 mt-24 ml-10 mr-10">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen min-w-screen flex-col justify-center items-center p-24 sm:p-1 ml-10 mr-10">
            <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow-md py-4 px-4 my-20">
                <h1 className="text-2xl font-bold">Favourites</h1>
                <div className="grid gap-6 lg:grid-cols-4 sm:gap-4 md:grid-cols-2 m-8">
                    {
                        favourites.favourites && favourites.favourites.length ?
                        favourites.favourites.map((item: Favourite, i: number) => {
                            return (
                                <div key={item.id}>
                                    <MangaCards item={item} />
                                </div>
                            )
                        }) : (<p>No Favourites found!</p>)
                    }
                </div>
            </div>
        </div>
    )
}