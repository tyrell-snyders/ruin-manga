'use client'

import CoverArt from "@/components/CoverArt/CoverArt"
import { GlobalContext } from "@/context"
import { getMangaData } from "@/services/comic/manga"
import { logger } from "@/utils/logger"
import { Manga } from "@/utils/types"
import { useState, useContext, useEffect } from "react"

export default function MangaPage({ params }) {
    //context
    const context = useContext(GlobalContext)

    //useState hooks
    const [manga, setManga] = useState<Manga>()

    if (context == null)
        return (
            <h1>Internal Server Error</h1>
        )

    const { mangaId, setMangaId } = context

    const handleManga = async(mangaId: string) => {
        try {
            const mangaData = await getMangaData(mangaId)
            if (mangaData && typeof mangaData === 'object' && mangaData?.success) {
                //Store the data in a const
                const mngData: Manga = mangaData?.data
                //set the manga
                setManga(mngData)
                //set the id of the manga
                setMangaId(mngData.data.id)
            }
            else
                logger.error(`Could not find any manga data.`)
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`${e.message}`)
            }
        }
    }

    //Map through the manga object and filter it by the realtionship type and id
    const handleRelationship = () => {
        const coverArt = manga?.data.relationships
            .flat()
            .filter(r => r.type === 'cover_art')
            .map(r => r.id)

        if (coverArt && coverArt != undefined)
            return coverArt[0].toString()
    }

    useEffect(() => {
        async function callManga() {
            await handleManga(params.mangaId)
        }
        callManga()
    }, [params])


    return (
        <div className='flex min-h-screen min-w-screen flex-col justify-between p-24 sm:p-1 mt-24 ml-10'>
            <div className="flex flex-col justify-space-around border border-gray-500 rounded-md mr-20">
                {/* Cover Image */}
                <CoverArt coverId={handleRelationship()} />
                <div className="flex">
                    hi
                </div>
            </div>
        </div>
    )
}