import { NextRequest, NextResponse } from "next/server"
import { logger } from "@/utils/logger"
import axios from 'axios'


export const dynamic = 'force-dynamic'

const baseUrl = 'http://127.0.0.1:4000/api'

export const GET = async(req: NextRequest, route: { params: { userId: number }}) => {
    if (req.method === 'GET') {
        try {
            const userId = route.params.userId
            const { data } = await axios.get(`${baseUrl}/auth/user?user_id=${userId}`)
            if (data != null) {
                return NextResponse.json({
                    result: data,
                    success: true
                })
            } else {
                return new NextResponse('Failed to get user', {
                    status: 404
                })
            }
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`${e.stack}`)
                return new NextResponse('Internal Server Error', {
                    status: 500
                })
            }
        }
    } else {
        return new NextResponse('Not Implemented', {
            status: 405
        })
    }
}