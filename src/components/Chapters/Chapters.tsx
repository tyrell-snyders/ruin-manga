'use client'

import { GlobalContext } from "@/context"
import { useState, useEffect, useContext } from "react"
import handleChapters from "."
import { Chapter, Volume } from "@/utils/types"
import Link from "next/link"

const styles = {
    button: `border border-blue-300 p-4 rounded-lg bg-blue-600`
}

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
    const [page, setPage] = useState(1);

    const handleChapters_Volumes = async() => {
        const chpt = await handleChapters(mangaId)
        if (chpt != null || chpt == 'No Chapters Available.')
            setResults(chpt)
    }

    const itemsPerPage = 10

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedChapters = chapters.slice(startIndex, endIndex);
    const totalPages = Math.ceil(chapters.length / itemsPerPage);

    useEffect(() => {
        async function callChapters() {
            await handleChapters_Volumes()
        }

        callChapters()
    }, [mangaId])

    useEffect(() => {
        if (results?.volumes) {
        //Efficiently extract and flatten chapters
            const flattenedChapters = Object.values(results.volumes)
                .flatMap((volume) => Object.values(volume.chapters)) as Chapter[];
            setChapters(flattenedChapters);
        }
    }, [results]);

    return (
        <section className="flex flex-col justify-center">
            <h1>Chapters</h1>
            {paginatedChapters.length ? (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8 gap-4 border border-gray-300 rounded-lg mt-10">
                {paginatedChapters.map((item: Chapter, i: number) => (
                    <div key={i} className="flex flex-col items-center hover:border hover-border-gray-200 rounded-md p-2">
                    <Link href={`/manga/${mangaId}/${item.id}`} rel="preload">
                        <h4>Chapter {item.chapter}</h4>
                    </Link>
                    </div>
                ))}
                </div>
            ) : (
                <h1>No Chapters Available</h1>
            )}
            <div className="pagination mt-10 flex justify-end gap-4">
                <button
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    className={styles.button}
                >
                Previous
                </button>
                <button
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    className={styles.button}
                >
                    Next
                </button>
            </div>
        </section>
    )
}