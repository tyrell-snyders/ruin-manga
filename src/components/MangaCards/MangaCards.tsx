import { logger } from "@/utils/logger"
import { Data, Favourite } from "@/utils/interface"
import { Manga } from "@/utils/types"
import CoverArt from "../CoverArt/CoverArt"
import { handleManga } from "."
import { useEffect, useState } from "react"

export default function MangaCards( props: { item: Favourite }) {
    const { item } = props

    const [mangaData, setMangaData] = useState<Data>(null)
    const [coverID, setCoverID] = useState<string>('')
    
    useEffect(() => {
        async function getManga() {
            const manga = await handleManga(item.comic_id)
            setMangaData(manga?.data)
        }
        getManga()
    }, [item.comic_id])

    useEffect(() => { 
        const cID = mangaData?.relationships
            .filter(c => c.type === 'cover_art')
            .flatMap(r => r.id)[0]
        
        setCoverID(cID)
    }, [mangaData])

    
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg border border-gray-200 cursor-pointer">
            {/* Cover Art */}
            <CoverArt coverId={coverID} mngId={mangaData?.id}/>
            <div className="px-6 py-4 flex justify-center items-center">
                <div className="mb-2 truncate w-32">
                    <p className="font-bold text-xl">{item.manga_title}</p>
                </div>
            </div>
            {/* Tags */}
            {/* <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Action</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Adventure</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Isekai</span>
            </div> */}
        </div>
    )
}