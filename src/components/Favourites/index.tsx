'use server'

import { logger } from "@/utils/logger"
import { addFavourite } from "@/services/comic/favourites"
import { FavouritesData } from "@/utils/interface"

export const handleAddFavourites = async(data: FavouritesData) => {
    try {
        const result = await addFavourite(data)
        if (result?.success === true) {
            return result
        }
        else
            return `No manga/manhwa with title: ${data?.comicTitle} found.`
    } catch (e) {
        if (e instanceof Error) {
            logger.error(`Error getting trend data: ${e.message}`)
            console.log(e.message)
            return e.message
        }
    }
}

export const handleRemoveFavourites = async(id: string) => {
    console.log('removing...')
}
