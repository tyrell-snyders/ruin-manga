'use client'

import { GlobalContext } from "@/context"
import { useState, useEffect, useContext } from "react"
import handleChapters from "."

export default function Chapters() {
    //Context
    const context = useContext(GlobalContext)

    if (context == null)
        return (
            <h1>Internal Server Error</h1>
        )

    const { mangaId } = context

    //Use State Hooks
    const [chapters, setChapters] = useState()

    const handleChapters_Volumes = async() => {
        const chpt = await handleChapters(mangaId)
        if (chpt != null)
            setChapters(chpt)
    }

    useEffect(() => {
        async function callChapters() {
            await handleChapters_Volumes()
        }

        callChapters()
    }, [mangaId])


    useEffect(() => {
        if (chapters == 'No Chapters Available')
            return (
                <div>{chapters}</div>
            )
    }, [chapters])


    console.log(chapters)

    return (
        <section>
            <h1>Chapters</h1>
        </section>
    )
}