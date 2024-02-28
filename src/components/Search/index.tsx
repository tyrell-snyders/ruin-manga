'use server'

import { search } from "@/services/comic/search"
import { logger } from "@/utils/logger"

const handleSrch = async(title: string) => {
    try {
        const result = await search(title)
        if (result?.data)
            return result
        else {
            return { error: `No manga/manhwa with title: ${title} found.` };
        }
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message);
            throw new Error('An error occurred during search.');
        }
    }
};

export default handleSrch