'use client'

import { User, Users } from '@/utils/interface';
import { logger } from '@/utils/logger';
import { usePathname, useRouter } from 'next/navigation'
import React, { createContext, useState, useEffect } from 'react'

//Context types
type GlobalContextValue = {
    showNavModal: boolean;
    setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    coverArt: Array<string>;
    setcoverArt: React.Dispatch<React.SetStateAction<Array<string>>>;
    mangaId: string;
    setMangaId: React.Dispatch<React.SetStateAction<string>>;
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    users: Users;
    setUsers: React.Dispatch<React.SetStateAction<Users>>;
}

//Export contexts
export const GlobalContext = createContext<GlobalContextValue | null>(null)


//Initialization
const initUser: User = JSON.parse(localStorage.getItem('user') as string)

const initUsers: Users = {
    users: [
        {
            username: '',
            email: ''
        }
    ],
    success: false
}


export default function GlobalState({ children } : {children: React.ReactNode}) {
    //states
    const [showNavModal, setShowNavModal] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState<User>(initUser)
    const [coverArt, setcoverArt] = useState<Array<string>>([])
    const [mangaId, setMangaId] = useState<string>('')
    const [users, setUsers]  = useState<Users>(initUsers)

    useEffect(() => {
        if (user != null)
            setIsAuth(true)
    }, [user])

    useEffect(() => {
    }, [isAuth])

    const router = useRouter()
    const pathName = usePathname()

    return (
        <>
            <GlobalContext.Provider value={{
                showNavModal, setShowNavModal, 
                isAuth, setIsAuth,
                coverArt, setcoverArt,
                mangaId, setMangaId,
                user, setUser,
                users, setUsers
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}