'use client'

import { useContext, useEffect, useState } from "react";
import handleCoverArt from ".";
import { GlobalContext } from "@/context";
import Image from "next/image";

export default function CoverArt(props: { coverId: string, mngId: string }) {
    //context
    const context = useContext(GlobalContext)

    //useState hooks
    const [coverFile, setCoverFile] = useState<string>('')
    const [mngId, setMngId] = useState<string>('')

    if (context == null)
        return (
            <h1>Internal Server Error</h1>
        )

    const { mangaId } = context

    const coverId = props.coverId

    //Call the handleCoverArt method and set the result to coverFile
    useEffect(() => {
        async function getArt() {
            setCoverFile(await handleCoverArt(coverId))
        }
        getArt()
        if (props.mngId != undefined)
            setMngId(props.mngId)
    }, [coverId])


    return (
        <div>
            {
                coverFile != null ? 
                <Image
                    src={`https://uploads.mangadex.org/covers/${mangaId || mngId}/${coverFile}.256.jpg`} alt='Hi'
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125 w-60 h-90 rounded-md"
                    width={500}
                    height={300}
                    loading="lazy"
                /> : null
            }
        </div>
    )
}
