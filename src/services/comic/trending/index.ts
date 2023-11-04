import { logger } from "@/utils/logger"

const baseUrl = 'http://localhost:3000'

export const getTrendingComics = async() => {
    try {
        const res = await fetch(`${baseUrl}/api/comic/trending`, {
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
        return data
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message)
        }
    }
}