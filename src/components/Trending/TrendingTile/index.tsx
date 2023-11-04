'use client'

import { GlobalContext } from "@/context"
import { getCoverArt } from "@/services/comic/coverArt"
import { ArtData, Relationship } from "@/utils/interface"
import { logger } from "@/utils/logger"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState, useRef } from "react"

export default function TrendingTile(props: any) {

    const context = useContext(GlobalContext)

    const [coverFileName, setCoverFileName] = useState<string>('')

    if (context === null) {
        logger.error("No context provided")
        return null;
    }

    const { mangaId, setMangaId } = context
    const [id, setId] = useState<string>('')

    const router = useRouter()
    const { item, coverArt } = props

    const getArt = async(coverId: string) => {
        try {
            const result = await getCoverArt(coverId);
            if (result.data.data.attributes.fileName != undefined)
                setCoverFileName(result.data.data.attributes.fileName)
            else
                return 'No Data'
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error getting trend data: ${e.message}`);
            }
        }
    }

    useEffect(() => {
        if (coverArt) {
            const art = async() => {
                getArt(coverArt)
            }
            art()
            if (item?.id != null) {
                setId(item?.id)
            }
        }
    }, [item]);

     
    return (
        <>
            <div onClick={() => router.push('/manga')}>
                <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52">
                    {
                        coverFileName != null ? 
                            <img
                                src={`https://uploads.mangadex.org/covers/${id}/${coverFileName}.256.jpg`} alt={item.slug}
                                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                                loading="lazy"
                            /> : null
                    }
                </div>
                <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                    <h3 className='mb-2 text-gray-400 text-sm'>{item.attributes?.title?.en || item.attributes?.title?.ja}</h3>
                </div>
            </div>
        </>
    );
}