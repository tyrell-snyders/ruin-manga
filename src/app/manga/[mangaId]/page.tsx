'use client'

import CoverArt from "@/components/CoverArt/CoverArt"
import { handleAddFavourites, handleRemoveFavourites } from "@/components/Favourites"
import { GlobalContext } from "@/context"
import { getMangaData } from "@/services/comic/manga"
import { FavouritesData } from "@/utils/interface"
import { logger } from "@/utils/logger"
import { Manga } from "@/utils/types"
import { useState, useContext, useEffect, memo } from "react"
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const DynamicChapters = dynamic(() => import('@/components/Chapters/Chapters'), {
  ssr: true,
});

const MemoizedCoverArt = memo(CoverArt);

const styles = {
    add: `disabled:opacity-50 inline-flex items-center justify-center bg-purple-600 
            px-6 py-4 text-lg text-white transition-all duration-200 
            ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-3xl`,
    remove: `disabled:opacity-50 inline-flex items-center justify-center bg-red-600 
            px-6 py-4 text-lg text-white transition-all duration-200 
            ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-3xl`
}

export default function MangaPage({ params }) {
    //context
    const context = useContext(GlobalContext)

    if (context == null)
        return (
            <h1>Internal Server Error</h1>
        )

    const { mangaId, setMangaId, user, favourites, loading, setLoading } = context

    //useState hooks
    const [manga, setManga] = useState<Manga>()
    const [mangaName, setMangaName] = useState<string>('')
    const [mngId, setMngId] = useState<string>('')
    const [favourite, setFavourite] = useState<FavouritesData>({} as FavouritesData)
    const [comicID, setComicID] = useState<string>(null)

    const router = useRouter()    

    const handleManga = async(mangaId: string) => {
        try {
            setLoading(true)
            const mangaData = await getMangaData(mangaId)
            if (mangaData && typeof mangaData === 'object' && mangaData?.success) {
                //Store the data in a const
                const mngData: Manga = mangaData?.data
                //set the manga
                setManga(mngData)
                //set the id of the manga
                setMangaId(mngData?.data.id)
            }
            else
                logger.error(`Could not find any manga data.`)
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`${e.message}`)
            }
        }
    }


    //Map through the manga object and filter it by the realtionship type and id
    const handleRelationship = () => {
        if (!manga?.data?.relationships) return;
        const coverArt = manga.data.relationships
            .flat()
            .filter(r => r.type === 'cover_art')
            .map(r => r.id);
        return coverArt[0]; // Return the first cover art ID
    }


    useEffect(() => {
        async function callManga() {
            await handleManga(params.mangaId)
        }
        callManga()
    }, [params])

    useEffect(() => {
    if (manga && manga.data && manga.data.attributes && manga.data.attributes.title && manga.data.attributes.title.en) {
            setMangaName(manga.data.attributes.title.en as string);
            setMngId(params.mangaId as string);
        }
    }, [manga, params]);

    const id = params.mangaId as string
    useEffect(() => {
        if (mngId != undefined && mangaName != undefined || '') {
            setFavourite({
                userName: user?.username,
                comicID: mangaId,
                comicTitle: mangaName || manga?.data.attributes.title.en as string,
            })
        } else {
            console.log('No manga name found.')
        }
        setLoading(false)
    }, [manga, user, params])

    useEffect(() => {
        if (!loading && favourites) {
            const cId = favourites.favourites
                .flat()
                .filter(f => f.comic_id === id)
                .map(f => f.comic_id)[0]

            setComicID(cId)
        }
    }, [favourites, loading])
    
    const handleRemove = async() => {
        router.push(`/manga/${id}`)
    }

    if (loading) {
        return (
            <div className='flex min-h-screen min-w-screen flex-col justify-center items-center p-24 sm:p-1 mt-24 ml-10 mr-10'>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className='flex min-h-screen min-w-screen flex-col justify-center items-center p-24 sm:p-1 mt-24 ml-10 mr-10'>
            <div className="flex flex-col justify-space-around ">
               <div className="flex flex-row p-10 mb-2">
                    {/* Cover Image */}
                    <MemoizedCoverArt coverId={handleRelationship()} className='mr-10' />
                    <div>
                        <h1 className="ml-20 font-bold text-xl">
                            {manga?.data.attributes.title.en}
                        </h1>
                        {
                            comicID && favourites.favourites && favourites.favourites.length ?
                            (
                                <div className="ml-20 mt-10">
                                    <button 
                                        className={styles.remove}
                                        onClick={handleRemove}
                                    >
                                        Remove From Favourites
                                    </button>
                                </div>
                            ) : (<div className="ml-20 mt-10">
                                <button 
                                    className={styles.add}
                                    onClick={() => {
                                        handleAddFavourites(favourite)
                                        router.push(`/manga/${id}`)
                                    }}
                                >
                                    Add To Favourites
                                </button>
                                </div>
                            )
                        }
                    </div>
                </div>
                {/* Descritpion */}
                <div className="m-10" style={{ height: '200px', overflow: 'hidden' }}>
                    <h1 className='text-lg font-bold'>Description</h1>
                    <p className=" text-clip overflow-hidden sm-text-ellipsis">{manga?.data.attributes.description.en}</p>
                </div>
            </div>
            {/* Chapters */}
            <div className="flex-col mt-10 mb-10 ml-4">
                <DynamicChapters />
            </div>
        </div>
    ) 
}