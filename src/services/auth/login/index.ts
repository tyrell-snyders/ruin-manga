import { logger } from '@/utils/logger'
import { LoginForm } from "@/utils/interface"

const baseUrl = 'http://localhost:3000'

export const loginUser = async(formData: LoginForm) => {
    try {
        if (formData && formData != undefined) {
            const res = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()
            return data
        } else {
            return null
        }
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message)
            throw e
        }
    }
}