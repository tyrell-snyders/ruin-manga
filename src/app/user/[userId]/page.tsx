'use client'

import { useRouter } from 'next/navigation'
import { GlobalContext } from "@/context"
import { logger } from "@/utils/logger"
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Favourite, Favourites, User } from "@/utils/interface"
import MangaCards from "@/components/MangaCards/MangaCards"
import { getUser } from '@/services/users'
import { getFavourites } from '@/services/comic/favourites'

export default function UserPage({ params } : { params: { userId: number } }) {
    const router = useRouter();
    const context = useContext(GlobalContext);

    if (context === null) {
        console.log('No context')
        return (
            <h1>No Context</h1>
        )
    }
    const { loading, setLoading } = context
    //useStates
    const [user, setUser] = useState<User>({} as User)
    const [favourites, setFavourites] = useState<Favourites>({} as Favourites)

    const handleUser = async (uID: number) => {
        setLoading(true)
        try {
            const data = await getUser(uID)
            const usr = data?.result?.user
            if (usr) {
                setUser(usr)
            }
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error fetching user: ${e.message}`)
            }
        } finally {
            setLoading(false)
        }
    };

    const handleFavourites = async (uID: number) => {
        setLoading(true);
        try {
            const res = await getFavourites(uID)
            setFavourites(res?.result as Favourites)
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error fetching favourites: ${e.message}`)
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userId = params.userId
        handleUser(userId)
    }, [params.userId])

    useEffect(() => {
        if (user.id) {
            handleFavourites(user.id)
        }
    }, [user.id])

    if (loading) {
        return (
            <div className="flex min-h-screen min-w-screen flex-col justify-center items-center p-24 sm:p-1 mt-24 ml-10 mr-10">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-center p-24 sm:p-1 lg:ml-16 mr-10 mt-20'>
            <div className='flex flex-col items-center pt-6'>
                <Image 
                    className='mt-6 rounded-2xl'
                    alt='profile picture'
                    src={'https://static.animecorner.me/2023/12/1702779218-65971.jpg'}
                    width={100}
                    height={100}
                />
                <h1 className='text-lg font-bold'>{user.username}</h1>
            </div>
            <div className="flex flex-col mt-14 ml-20">
                <h2 className='text-2xl font-bold'>Favourites</h2>
                <div className="grid gap-6 lg:grid-cols-4 sm:gap-4 md:grid-cols-2 m-8 border border-gray-200 rounded-lg shadow-md py-8 px-8 my-20">
                    {
                        favourites?.favourites && favourites.favourites.length ? 
                        favourites?.favourites.map((item: Favourite) => {
                            return (
                                <div key={item.id} onClick={() => router.push(`/manga/${item.comic_id}`)}>
                                    <MangaCards item={item} />
                                </div>
                            )
                        }) : (<p>User has no favourites! Womp Womp</p>)
                    }
                </div>
            </div>
            
        </div>
    );
}