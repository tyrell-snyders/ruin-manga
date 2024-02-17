'use client'

import { GlobalContext } from "@/context"
import { getPages } from "@/services/comic/manga"
import { logger } from "@/utils/logger"
import { ChapterPages } from "@/utils/types"
import Image from "next/image"
import { useState, useContext, useRef, useEffect } from "react"

export default function ChapterPage({ params } : { params: { mangaId: string, chapterId: string } }) { 
    // Context
    const context = useContext(GlobalContext)
    if (context == null)
        return (
            <div className='flex min-h-screen min-w-screen flex-col justify-center items-center p-24 sm:p-1 mt-24 ml-10 mr-10'>
                <h1>No context provided</h1>
            </div>
        )

    const { loading, setLoading } = context

    // State and Ref initialization
    const [pages, setPages] = useState<string[]>(null)
    const [hash, setHash] = useState<string>()
    const dummyData: ChapterPages = {
        pages: ['1', '2', '3', '4', '5', '6'],
        hash: '2889593493200'
    }

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

    // If the loading is true, then show the loading message
    if (loading) {
        return (
            <p>Loading</p>
        )
    }

    return (
        <div className='flex  flex-col justify-center items-center sm:p-1 mt-24 ml-10 mr-10'>
            {pages && hash && <ImagePages data={{ pages, hash } as ChapterPages} />}
        </div>
    )
}

function ImagePages({ data }: { data: ChapterPages }) {
    // State and Ref initialization
    const [currentImg, setCurrentImg] = useState(0)
    const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 })
    const carouselRef = useRef<HTMLDivElement>(null)

    //Get the initial carousel size
    useEffect(() => {
        let elem = carouselRef.current as unknown as HTMLDivElement
        let { width, height } = elem.getBoundingClientRect()
        if (carouselRef.current) {
            setCarouselSize({
                width,
                height,
            })
        }
    }, [])

    // Calculate the aspect ratio of the images
    const intrinsicAspectRatio = 275 / 192

    // Update the height of the carousel container based on the aspect ratio
    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.style.height = `${carouselRef.current.offsetWidth * intrinsicAspectRatio}px`
        }
    }, [carouselSize.width])

    const baseImageUrl = 'https://uploads.mangadex.org/data/'

    console.log(carouselSize)

    // Calculate the height of the images based on their aspect ratio
    const imageAspectRatio = 367 / 256
    const imageHeight = Math.round(carouselSize.width * imageAspectRatio)


    return (
        <div>
            {/* Carousel container */}
            <div className='w-80 h-80 rounded-md overflow-hidden relative'>
                {/* Image container */}
                <div
                    ref={carouselRef}
                    style={{
                        left: -currentImg * carouselSize.width
                    }}
                    className='w-full h-full absolute flex transition-all duration-300'>
                    {/* Map through data to render images */}
                    {data.pages.map((v, i) => (
                        <div key={v} className='relative shrink-0 w-full h-full'>
                            <Image
                                className='pointer-events-none'
                                alt={`Page ${i}`}
                                width={carouselSize.width}
                                height={imageHeight}
                                objectFit='contain'
                                src={`${baseImageUrl}/${data.hash}/${v}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Navigation buttons */}
            <div className='flex justify-center mt-3'>
                <button
                    disabled={currentImg === 0}
                    onClick={() => setCurrentImg(prev => prev - 1)}
                    className={`border px-4 py-2 font-bold ${currentImg === 0 && 'opacity-50'}`}
                >
                    {"<"}
                </button>
                <button
                    disabled={currentImg === data.pages.length - 1}
                    onClick={() => setCurrentImg(prev => prev + 1)}
                    className={`border px-4 py-2 font-bold ${currentImg === data.pages.length - 1 && 'opacity-50'}`}
                >
                    {">"}
                </button>
            </div>
        </div>
    )
}