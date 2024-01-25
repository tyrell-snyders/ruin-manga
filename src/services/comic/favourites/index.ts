import { FavouritesData } from "@/utils/interface"
import { logger } from "@/utils/logger"
import axios, { AxiosResponse } from 'axios'

const baseUrl = 'http://localhost:3000'

export const addFavourite = async(favouritesData: FavouritesData) => {
    console.log(favouritesData)
    try {
        if (favouritesData && favouritesData !== undefined) {
            // console.log('before fetch')

            // const res = await fetch(`${baseUrl}/api/comic/favourites`, {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(favouritesData),
            // })
            // console.log('after fetch')
            // const data = await res.json()
            // console.log('after data')
            const { data } = await axios.post(`${baseUrl}/api/comic/favourites`, favouritesData, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            })
            return data
        } else {
            logger.error(`Could not add favourite.`)
        }
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message)
            console.log(e)
        }        
    }
}

export const getFavourites = async(userID: number) => {
    try {
        if (userID && userID != undefined) {
            const { data } = await axios.get(`${baseUrl}/api/comic/favourites/${userID}`)
            return data
        } else {
            logger.error(`Could not get favourites.`)
        }
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message)
        }
    }
}