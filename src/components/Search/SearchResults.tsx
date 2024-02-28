'use client'

import { Manga, Mng, SearchResults } from "@/utils/types"
import Link from "next/link"
import { useState, memo, useEffect, useContext } from "react"
import CoverArt from "../CoverArt/CoverArt"
import { useRouter } from "next/navigation"

const styles = {
    grid: 'mt-8 grid gap-6 lg:grid-cols-4 sm:gap-4 md:grid-cols-2'
}

const useConditionalRender = (results:SearchResults, coverArt: string[]) => {
    const [shouldRender, setShouldRender] = useState(results != null && coverArt?.length > 0);

    useEffect(() => {
        setShouldRender(results != null && coverArt?.length > 0);
    }, [results, coverArt]);

    return shouldRender;
};

export const SrchResults = (props: {srchResults: SearchResults, coverId: string, coverArt: string[]}) => {
    const shouldRender = useConditionalRender(props.srchResults, props.coverArt);
    //hooks
    const [results, setResults] = useState<Mng[]>([])
    const [coverArt, setCoverArt] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        //Initialize useState values everytime the props are changed
        setResults(props.srchResults?.data)
        setCoverArt(props.coverArt)
    }, [props])

    return (
        <div>
            <h2>Search Results</h2>
            <div className={styles.grid}>
                {
                    results && results.length && 
                    coverArt && coverArt.length ?
                    results.map((res, i) => (
                        <div onClick={() => router.push(`manga/${res?.id}`)} className="cursor-pointer">
                            <h4 key={res.id}>{res.attributes.title.en}</h4>
                            <CoverArt mngId={res.id} coverId={coverArt[i]} />
                        </div>
                    )) : 'No results found'
                }
            </div>
        </div>
    )
}

export default memo(SrchResults);