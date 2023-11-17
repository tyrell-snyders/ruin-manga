import { logger } from "@/utils/logger"

//NextJS api url
const baseUrl = 'http://localhost:3000/api/comic'

//get the data of the manga
export const getMangaData = async(mangaId: string) => {
    try {
        if (mangaId && mangaId != undefined) {
            const res = await fetch(`${baseUrl}/manga/${mangaId}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                next: { revalidate: 3600 } //revalidate data every hour
            })
            const data = await res.json()
            //return the data
            return data
        }
    } catch (e) {
        if (e instanceof Error) {
            logger.error(`${e.message}`)
        }
    }
}