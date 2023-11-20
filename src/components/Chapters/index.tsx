'use server'

import { getChapters } from "@/services/comic/manga"
import { logger } from "@/utils/logger"

const handleChapters = async(mangaId: string) => {
    try {
        const result = await getChapters(mangaId)
        if (result?.volumes)
            return result
        else    
            return 'No Chapters Available.'
    } catch (e) {
        if (e instanceof Error) {
            logger.error(`${e.message}`)
            return e.message
        }
    }
    return ''
}

export default handleChapters