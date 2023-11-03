'use client'

import { ArtData, Relationship } from '@/utils/interface';
import { logger } from '@/utils/logger';
import { usePathname, useRouter } from 'next/navigation'
import React, { createContext, useState, useEffect } from 'react'

type GlobalContextValue = {
    showNavModal: boolean;
    setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    coverArt: Array<string>;
    setcoverArt: React.Dispatch<React.SetStateAction<Array<string>>>;
    cover: ArtData;
    setCover: React.Dispatch<React.SetStateAction<ArtData>>;
}

export const GlobalContext = createContext<GlobalContextValue | null>(null)

const initCover: ArtData = {
    data: {
        attributes: {
            filename: '',
            locale: '',
            version: 0,
            volume: '',
            id: ''
        },
        relationships: [
            {
                id: '',
                type: ''
            },
            {
                id: '',
                type: ''
            }
        ],
        type: 'cover_art'
    }
}

export default function GlobalState({ children } : {children: React.ReactNode}) {
    //Hooks
    const [showNavModal, setShowNavModal] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState([])
    const [coverArt, setcoverArt] = useState<Array<string>>([])
    const [cover, setCover] = useState<ArtData>(initCover)

    const router = useRouter()
    const pathName = usePathname()

    return (
        <>
            <GlobalContext.Provider value={{
                showNavModal, setShowNavModal, 
                isAuth, setIsAuth,
                coverArt, setcoverArt,
                cover, setCover
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}