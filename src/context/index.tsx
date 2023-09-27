'use client'

import { logger } from '@/utils/logger';
import { usePathname, useRouter } from 'next/navigation'
import { createContext, useState, useEffect } from 'react'

type GlobalContextValue = {
    showNavModal: boolean;
    setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextValue | null>(null)

export default function GlobalState({ children } : {children: React.ReactNode}) {
    //Hooks
    const [showNavModal, setShowNavModal] = useState(false)

    const router = useRouter()
    const pathName = usePathname()

    return (
        <>
            <GlobalContext.Provider value={{
                showNavModal, setShowNavModal, 
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}