import { logger } from "@/utils/logger"

const baseUrl = 'http://localhost:3000'

export const getCoverArt = async(coverId: string) => {
    try {
        if (coverId && coverId !== undefined) {
            const res = await fetch(`${baseUrl}/api/comic/coverArt/${coverId}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
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