'use client'

import { Manga, Mng, SearchResults } from "@/utils/types"
import handleSrch from "."
import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import { logger } from '@/utils/logger'
import CoverArt from "../CoverArt/CoverArt"

const styles = {
    grid: 'mt-8 grid gap-6 lg:grid-cols-4 sm:gap-4 md:grid-cols-2'
}

export default function SrchResults(props: {srchResults: SearchResults, coverId: string}) {
    //hooks
    const [results, setResults] = useState<Mng[]>([])
    const [mangaId, setMangaId] = useState<string>('')

    useEffect(() => {
        setResults(props.srchResults?.data)
    }, [props])


    return (
        <div>
            <h2>Search Results</h2>
            <div className={styles.grid}>
                {
                    results && results.length ?
                    results.map(res => (
                        <div>
                            <h4 key={res.id}>{res.attributes.title.en}</h4>
                            <CoverArt coverId={coverArt} />
                        </div>
                    )) : 'No results found'
                }
            </div>
        </div>
    )
}