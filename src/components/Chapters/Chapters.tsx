'use client'

import { GlobalContext } from "@/context"
import { useState, useEffect, useContext } from "react"
import handleChapters from "."
import { Chapter, Volume } from "@/utils/types"
import Link from "next/link"

export default function Chapters() {
    //Context
    const context = useContext(GlobalContext)

    if (context == null)
        return (
            <h1>Internal Server Error</h1>
        )

    const { mangaId } = context

    //Use State Hooks
    const [results, setResults] = useState<Volume>()
    const [chapters, setChapters] = useState<Chapter[]>([])

    const handleChapters_Volumes = async() => {
        const chpt = await handleChapters(mangaId)
        if (chpt != null || chpt == 'No Chapters Available.')
            setResults(chpt)
    }

    useEffect(() => {
        async function callChapters() {
            await handleChapters_Volumes()
        }

        callChapters()
    }, [mangaId])

    useEffect(() => {
        if (results != null || results != undefined) {
            if (results.volumes != null || undefined) {
                const volumeKeys = Object.keys(results.volumes);
                // Loop through the volume keys
                volumeKeys.forEach((volumeKey) => {
                    const volume = results.volumes[volumeKey];
                    if (volume.chapters != null || undefined) {
                        const chapterKeys = Object.keys(volume.chapters);
                        //Loop through the chapter keys
                        const volumeChapters = chapterKeys.map((chapterKey) => {
                            const chapter = volume.chapters[chapterKey];
                            return chapter as Chapter;
                        });
                        // Store the chapters in a state array
                        setChapters((prevChapters) => [...prevChapters, ...volumeChapters]);
                    }
                });
            }
        }
    }, [results])

    return (
        <section>
            <h1>Chapters</h1>
            {
                chapters && chapters.length ? 
                chapters.map((item: Chapter, i: number) => {
                    return (
                        <div key={i} className='flex flex-col mt-6 hover:border hover-border-gray-200 rounded-md p-2'>
                            <Link href={`/manga/${mangaId}/${item.id}`} rel="preload">Chapter {item.chapter}</Link>
                        </div>
                    )
                }) :  <h1>No Chapters Available</h1>
            }
        </section>
    )
}