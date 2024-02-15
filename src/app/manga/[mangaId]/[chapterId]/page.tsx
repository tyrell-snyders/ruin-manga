'use client'

import { logger } from "@/utils/logger"
import { ChapterPages } from "@/utils/types"
import Image from "next/image"
import { useState, useContext, useRef, useEffect } from "react"

export default function ChapterPage() { 
    const [pages, setPages] = useState<string[]>(null)
    const [hash, setHash] = useState<string>('')
    const dummyData: ChapterPages = {
        pages: ['1', '2', '3', '4', '5', '6'],
        hash: '2889593493200'
    }
    
    return (
        <div className='flex min-h-screen min-w-screen flex-col justify-center items-center p-24 sm:p-1 mt-24 ml-10 mr-10'>
            <ImagePages data={dummyData}/>
        </div>
    )
}

function ImagePages({ data }: { data: ChapterPages }) {
    // State and Ref initialization
    const [currentImg, setCurrentImg] = useState(0)
    const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 })
    const carouselRef = useRef(null)

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


    return (
        <div>
            {/* Carousel container */}
            <div className='w-80 h-60 rounded-md overflow-hidden relative'>
                {/* Image container */}
                <div
                    ref={carouselRef}
                    style={{
                        left: -currentImg * carouselSize.width
                    }}
                    className='w-full h-full absolute flex transition-all duration-300'>
                    {/* Map through data to render images */}
                    {data.pages.map((v, i) => (
                        <div key={i} className='relative shrink-0 w-full h-full'>
                            <Image
                                className='pointer-events-none'
                                alt={`Page ${i}`}
                                fill
                                src={"https://random.imagecdn.app/500/500"}
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