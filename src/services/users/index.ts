import { logger } from "@/utils/logger"
import axios from 'axios'
const baseUrl = 'http://localhost:3000'

export const getUsers = async() => {
    try {
        const res = await fetch(`${baseUrl}/api/users`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            next: { revalidate: 3600 } //revalidate data every hour
        })

        const data = await res.json()
        return data
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message)
        }   
    }
}

export const getUser = async(userId: number) => {
    try {
        if (userId && userId != undefined) {
            const { data } = await axios.get(`${baseUrl}/api/users/${userId}`)
            return data
        } else {
            logger.error(`Could not get user.`)
        }
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message)
        }        
    }
}