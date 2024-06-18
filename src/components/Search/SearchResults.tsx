'use client'

import { Mng, SearchResults } from "@/utils/types";
import { useState, useEffect, memo } from "react";
import { useRouter } from "next/navigation";
import CoverArt from "../CoverArt/CoverArt";

const styles = {
    grid: 'mt-8 grid gap-6 lg:grid-cols-4 sm:gap-4 md:grid-cols-2'
};

const SrchResults = memo((props: { srchResults: SearchResults | null, coverArt: string[] }) => {
    const [results, setResults] = useState<Mng[]>([]);
    const [coverArt, setCoverArt] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (props.srchResults) {
            setResults(props.srchResults.data);
            setCoverArt(props.coverArt);
        }
    }, [props.srchResults, props.coverArt]);

    return (
        <div>
            <h2>Search Results</h2>
            <div className={styles.grid}>
                {
                    results.length > 0 && coverArt.length > 0 ?
                        results.map((res, i) => (
                            <div key={res.id} onClick={() => router.push(`manga/${res?.id}`)} className="cursor-pointer">
                                <h4>{res.attributes.title.en}</h4>
                                <CoverArt mngId={res.id} coverId={coverArt[i]} />
                            </div>
                        )) : 'No results found'
                }
            </div>
        </div>
    );
});

SrchResults.displayName = 'SrchResults';

export default SrchResults;
