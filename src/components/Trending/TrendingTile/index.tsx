'use client'

import { GlobalContext } from "@/context"
import { getCoverArt } from "@/services/comic/coverArt"
import { Relationship } from "@/utils/interface"
import { logger } from "@/utils/logger"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function TrendingTile(props: any) {
    // Context
    const context = useContext(GlobalContext)

    const [cover, setCover] = useState<string>('')

    const router = useRouter()
    const { item, coverArt } = props

    if (context === null) {
        logger.error("No context")
        return null;
    }

    const getArt = async(coverId: string) => {
        try {
            const result = await getCoverArt(coverId)
            if (result != null)
                return result
            else
                return 'No Data'
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error getting trend data: ${e.message}`);
            }
        }
    }

    useEffect(() => {
        const art = async() => {
            const cv = await getArt(coverArt)
            console.log(coverArt)
        }
        art()
    }, [item])

    return (
        <>
            <div onClick={() => router.push('/manga')}>
                <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52">
                    <img
                        src={`https://uploads.mangadex.org/covers/8f3e1818-a015-491d-bd81-3addc4d7d56a/26dd2770-d383-42e9-a42b-32765a4d99c8.png.256.jpg`} alt={item.slug}
                        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                    />
                </div>
                <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                    <h3 className='mb-2 text-gray-400 text-sm'>{item.attributes?.title?.en || item.attributes?.title?.ja}</h3>
                </div>
            </div>
        </>
    );
}