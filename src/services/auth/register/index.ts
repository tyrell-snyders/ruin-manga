import {  RegisterForm } from "@/utils/interface"
import { logger } from "@/utils/logger"

const baseUrl = 'http://localhost:3000'

export const registerUser = async (formData: RegisterForm) => {
    try {
        if (formData && formData != undefined) {
            const res = await fetch(`${baseUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData),
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