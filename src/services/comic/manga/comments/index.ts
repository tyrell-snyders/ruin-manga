import { userComment } from "@/utils/interface"
import { logger } from "@/utils/logger"

//NextJS api url
const baseUrl = 'http://localhost:3000/api/comic'

export const getChapterComments = async(mangaId: string, chapterId: string) => {
    try {
        const res = await fetch(`${baseUrl}/manga/${mangaId}/chapters/${chapterId}/comments`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            next: { revalidate: 3600 } //revalidate data every hour
        })
        const data = await res.json()

        //return the data
        return data
    } catch (e) {
        if (e instanceof Error) {
            logger.error(`${e.message}`)
        }
    }
}

export const postComment = async(data: { mangaId: string, chapterId: string, commData: userComment }) => {
    const { commData, mangaId, chapterId } = data

    try { 
        await fetch(`${baseUrl}/manga/${mangaId}/chapters/${chapterId}/comments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify(commData)
        })
    } catch (e) {
        if (e instanceof Error) {
            logger.error(`${e.message}`)
        } 
    }
}