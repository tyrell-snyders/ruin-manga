import { logger } from "@/utils/logger"

//NextJS api url
const baseUrl = 'http://localhost:3000/api/comic'

//Call the search api endpoint
export const search = async(title: string) => {
    try {
        if (title && title != undefined) {
            const res = await fetch(`${baseUrl}/search/${title}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                cache: 'no-cache'
            })

            const data = await res.json()
            return data
        }
    } catch (e) {
        if (e instanceof Error) {
            logger.error(`${e.message}`)
        } 
    }
}

//Search Filters will be implemented at a later stage