'use client'

import { GlobalContext } from "@/context";
import { Relationship } from "@/utils/interface";
import { logger } from "@/utils/logger";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function TrendingTile(props: any) {
    // Context
    const context = useContext(GlobalContext);

    const router = useRouter();
    const { item } = props;

    if (context === null) {
        logger.error("No context")
        return null;
    }

    const { coverArt, setcoverArt } = context

    const relationshipTypes: Relationship[] = item.relationships.map((relationship: Relationship) => {
        if (relationship.type === 'cover_art')
            return {relationship}
    }).filter((relationship: Relationship) => relationship)
    .slice(0, 10)

    

    useEffect(() => {
        const updatedCoverArt = [...coverArt, ...relationshipTypes];
        setcoverArt(updatedCoverArt);
    }, []);

    console.log(coverArt)

    return (
        <>
            <div onClick={() => router.push('/manga')}>
                {/* <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52">
                    <img
                        src={item.image} alt={item.slug}
                        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                    />
                </div> */}
                <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                    <h3 className='mb-2 text-gray-400 text-sm'>{item.attributes?.title?.en || item.attributes?.title?.ja}</h3>
                </div>
            </div>
        </>
    );
}