import { FavouritesData } from "@/utils/interface"
import { logger } from "@/utils/logger"

const baseUrl = 'http://localhost:3000'

export const addFavourite = async(favouritesData: FavouritesData) => {
    try {
        if (favouritesData && favouritesData !== undefined) {
            const res = await fetch(`${baseUrl}/api/comic/favourites`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(favouritesData),
            })

            const data = await res.json()
            return data
        }
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message)
        }        
    }
}