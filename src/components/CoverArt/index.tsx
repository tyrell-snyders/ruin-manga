'use server'

import { getCoverArt } from "@/services/comic/coverArt";
import { logger } from "@/utils/logger"

const handleCoverArt = async(coverId: string): Promise<string> => {
    try {
        const result = await getCoverArt(coverId);
            if (result.data.data.attributes.fileName != undefined)
                return result.data.data.attributes.fileName
            else
                return 'No Data'
    } catch (e) {
        if (e instanceof Error) {
            logger.error(`Error getting trend data: ${e.message}`)
            return e.message
        }
    }
    return ''
}

export default handleCoverArt