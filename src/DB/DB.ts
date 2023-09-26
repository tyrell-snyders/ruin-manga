import { config } from '@/utils/config'
import { logger } from '@/utils/logger'
import mysql, { ConnectionOptions } from 'mysql2' 

export const connectToDB = async() => {
    try {
        const access: ConnectionOptions = {
            user: config.DB_USER,
            database: config.DB_NAME,
            host: config.DB_HOST
        }

        const conn = mysql.createConnection(access)

        return conn
    } catch (e) {
        logger.error(`${e}`)
    }
}