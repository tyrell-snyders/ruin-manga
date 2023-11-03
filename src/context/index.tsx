'use client'

import { Relationship } from '@/utils/interface';
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
}

export const GlobalContext = createContext<GlobalContextValue | null>(null)


export default function GlobalState({ children } : {children: React.ReactNode}) {
    //Hooks
    const [showNavModal, setShowNavModal] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState([])
    const [coverArt, setcoverArt] = useState<Array<string>>([])

    const router = useRouter()
    const pathName = usePathname()

    return (
        <>
            <GlobalContext.Provider value={{
                showNavModal, setShowNavModal, 
                isAuth, setIsAuth,
                coverArt, setcoverArt
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}