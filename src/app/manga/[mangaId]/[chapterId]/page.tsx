'use client'

import Comments from "@/components/Chapters/Comments/Comments"
import { GlobalContext } from "@/context"
import { getPages } from "@/services/comic/manga"
import { User } from "@/utils/interface"
import { logger } from "@/utils/logger"
import { ChapterPages } from "@/utils/types"
import Image from "next/image"
import { useState, useContext, useRef, useEffect } from "react"
import { useParams } from 'next/navigation'

export default function ChapterPage({ params } : { params: { mangaId: string, chapterId: string } }) { 
    // Context
    const context = useContext(GlobalContext)
    if (context == null)
        return (
            <div className='flex min-h-screen min-w-screen flex-col justify-center items-center p-24 sm:p-1 mt-24 ml-10 mr-10'>
                <h1>No context provided</h1>
            </div>
        )

    const { loading, setLoading, isAuth, user } = context

    // State and Ref initialization
    const [pages, setPages] = useState<string[]>(null)
    const [hash, setHash] = useState<string>()

    const handleImages = async (mangaId: string, chapterId: string) => {
        const chapterPages: ChapterPages = await getPages({ mangaId, chapterId}) as ChapterPages
        if (chapterPages != null) {
            setPages(chapterPages.pages)
            setHash(chapterPages.hash)
            setLoading(false)
        }
    }
    
    useEffect(() => {
        const getImages = async() => {
            await handleImages(params.mangaId, params.chapterId)
        }
        getImages()
    }, [params.chapterId])

    useEffect(() => {
        console.log(isAuth)
    }, [context])

    // If the loading is true, then show the loading message
    if (loading) {
        return (
            <p>Loading</p>
        )
    }


    return (
        <div className='flex  flex-col justify-center items-center sm:p-1 mt-24 ml-10 mr-10'>
            {pages && hash && <ImagePages data={{ pages, hash } as ChapterPages} isAuth={isAuth} user={user} />}
        </div>
    )
}

//Image Handling
function ImagePages({ data, isAuth, user }: { data: ChapterPages, isAuth: boolean, user: User }) {
    const baseImageUrl = 'https://uploads.mangadex.org/data/'
    const {mangaId, chapterId} = useParams<{mangaId: string, chapterId: string}>()

    return (
        <div className="mb-10">
            <div className='rounded-md overflow-hidden'>
                {/* Image container */}
                {/* Map through data to render images */}
                    {data.pages.map((v, i) => (
                        <div key={v} className='w-full h-full mt-2'>
                            <Image
                                className='pointer-events-none'
                                alt={`Page ${i}`}
                                width={800}
                                height={800}
                                
                                src={`${baseImageUrl}/${data.hash}/${v}`}
                            />
                        </div>
                    ))}
            </div>
            <Comments isAuth={isAuth} user={user} mangaId={mangaId} chapterId={chapterId} />
        </div>
    )
}