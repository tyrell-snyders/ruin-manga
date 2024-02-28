'use client'

import { getFavourites } from '@/services/comic/favourites';
import { Favourites, User, Users } from '@/utils/interface';
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
    favourites: Favourites; 
    setFavourites: React.Dispatch<React.SetStateAction<Favourites>>;
    loading: boolean; 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

//Export contexts
export const GlobalContext = createContext<GlobalContextValue | null>(null)


//Initialization
// const initUser: User = JSON.parse(localStorage.getItem('user') as string)

const initUsers: Users = {
    users: [
        {
            id: 0,
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
    const [user, setUser] = useState<User>(null)
    const [coverArt, setcoverArt] = useState<Array<string>>([])
    const [mangaId, setMangaId] = useState<string>('')
    const [users, setUsers]  = useState<Users>(initUsers)
    const [favourites, setFavourites] = useState<Favourites>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Access localStorage here
        const initUser: User | null = JSON.parse(localStorage.getItem('user') as string);
        setUser(initUser);
    }, []);


    useEffect(() => {
        if (user != null || undefined)
            setIsAuth(true)
    }, [user])

    const router = useRouter()
    const pathName = usePathname()

    //Handle Favourites in context
    const handleFavourites = async () => {
        try {
            setLoading(true);
            const res = await getFavourites(user.id)
            setFavourites(res?.result as Favourites)
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error: ${e.message}`)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        async function getFav() {
            await handleFavourites()
        }
        getFav()
    }, [user])

    return (
        <>
            <GlobalContext.Provider value={{
                showNavModal, setShowNavModal, 
                isAuth, setIsAuth,
                coverArt, setcoverArt,
                mangaId, setMangaId,
                user, setUser,
                users, setUsers,
                favourites, setFavourites,
                loading, setLoading
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}