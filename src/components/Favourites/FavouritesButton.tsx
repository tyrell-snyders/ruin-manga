'use client'

import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import handleAddFavourites from "."
import { FavouritesData } from "@/utils/interface"

const styles = {
    button: `disabled:opacity-50 inline-flex w-full items-center justify-center bg-purple-600 
            px-6 py-4 text-lg text-white transition-all duration-200 
            ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-3xl`
}

export default function (props: { mngId: string, mngName: string }) {
    //context
    const context = useContext(GlobalContext)

    if (context == null)
        return (
            <h1>Internal Server Error</h1>
        )

    const { mangaId, isAuth, user } = context

    //useState hooks
    const [favourite, setFavourite] = useState<FavouritesData>({} as FavouritesData)

    useEffect(() => {
        if (props.mngId != undefined && props.mngName != undefined) {
            setFavourite({
                comicID: props.mngId || mangaId,
                comicTitle: props.mngName,
                userName: user?.username,
            })
        }
    }, [user])

    return (
        <button className={styles.button}
            onClick={() => handleAddFavourites(favourite)}
        >
            Add To Favourites
        </button>
    )
}