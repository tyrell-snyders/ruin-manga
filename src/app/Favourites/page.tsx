'use client'

import { useState, useEffect, useContext } from "react"
import { GlobalContext } from "@/context"
import { Favourite, Favourites } from "@/utils/interface"
import { logger } from "@/utils/logger"
import MangaCards from "@/components/MangaCards/MangaCards"
import { useRouter } from "next/navigation"

export default function Favourites() {
    //router
    const router = useRouter()
    //context
    const context = useContext(GlobalContext)

    if (context === null) {
        console.log('No context')
        return (
            <h1>No Context</h1>
        )
    }
    const { user, favourites, loading } = context

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
                        favourites?.favourites && favourites.favourites.length ?
                        favourites?.favourites.map((item: Favourite, i: number) => {
                            return (
                                <div key={item.id} onClick={() => router.push(`/manga/${item.comic_id}`)}>
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