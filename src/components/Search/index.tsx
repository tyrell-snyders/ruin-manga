'use server'

import { search } from "@/services/comic/search"
import { logger } from "@/utils/logger"

const handleSrch = async(title: string) => {
    try {
        const result = await search(title)
        if (result?.data)
            return result
        else
            return `No manga/manhwa with title: ${title} found.`
    } catch (e) {
        if (e instanceof Error) {
            logger.error(`${e.message}`)
            return e.message
        }
    }

    return ''
}

export default handleSrch