import { logger } from '@/utils/logger'
import { FormData } from "@/utils/interface"

const baseUrl = 'http://localhost:3000'

export const login = async(formData: FormData) => {
    try {
        
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message)
            return e.message
        }
    }
}