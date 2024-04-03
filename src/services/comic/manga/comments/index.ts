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