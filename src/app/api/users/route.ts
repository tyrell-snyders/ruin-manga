import { NextResponse } from "next/server"
import { logger } from "@/utils/logger"

export const dynamic = 'force-dynamic'

const baseUrl = 'http://127.0.0.1:4000/api'

export const GET = async() => {
    try {
        const response = await fetch(`${baseUrl}/auth/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const data = await response.json()
            return NextResponse.json({
                data,
                message: 'Got Users',
                success: true
            })
        } else {
            logger.error(`Error getting data: ${response.statusText}`);
            return new NextResponse(response.statusText, {
                status: response.status
            })
        }
    } catch (e) {
        if (e instanceof Error) {
            logger.error(`Error getting data: ${e.message}`);
            return NextResponse.json({
                success: false,
                message: 'Something went wrong!'
            });
        } 
    }
}