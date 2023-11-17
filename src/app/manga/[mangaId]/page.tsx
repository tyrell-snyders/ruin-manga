'use client'

import { GlobalContext } from "@/context"
import { useState, useContext } from "react"

export default function MangaPage({ params }) {
    const context = useContext(GlobalContext)
    if (context == null)
        return (
            <h1>Internal Server Error</h1>
        )


    return (
        <div className='flex min-h-screen flex-col items-center justify-between p-24 sm:p-1 mt-24'>
            <div className="flex">
                <h1>{params.mangaId}</h1>
            </div>
        </div>
    )
}