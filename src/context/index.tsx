'use client'

import { Relationship } from '@/utils/interface';
import { logger } from '@/utils/logger';
import { usePathname, useRouter } from 'next/navigation'
import { createContext, useState, useEffect } from 'react'

type GlobalContextValue = {
    showNavModal: boolean;
    setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    coverArt: Relationship[];
    setcoverArt: React.Dispatch<React.SetStateAction<Relationship[]>>;
}

export const GlobalContext = createContext<GlobalContextValue | null>(null)

export default function GlobalState({ children } : {children: React.ReactNode}) {
    //Hooks
    const [showNavModal, setShowNavModal] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState([])
    const [coverArt, setcoverArt] = useState<Relationship[]>([])

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