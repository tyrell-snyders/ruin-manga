'use server'

import { logger } from "@/utils/logger"
import { getMangaData } from "@/services/comic/manga"
import { Data } from "@/utils/interface"

export const handleManga = async(id: string) => {
    const mangaDta = await getMangaData(id)

    if (mangaDta && typeof mangaDta === 'object' && mangaDta?.success) {
        const mngData: Data = mangaDta?.data
        return mngData
    } else {
        logger.error(`Could not find any manga data.`)
        return null
    }
}
