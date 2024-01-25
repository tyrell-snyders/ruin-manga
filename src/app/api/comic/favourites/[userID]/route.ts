import { NextRequest, NextResponse } from "next/server"
import { logger } from "@/utils/logger"
import axios from 'axios'

export const dynamic = 'force-dynamic'

const baseUrl = 'http://127.0.0.1:4000/api/favourites'

export const GET = async (req: NextRequest, route: { params: { userID: number }}) => {
    if (req.method === 'GET') {
        try {
            const userID = route.params.userID
            const { data } = await axios.get(`${baseUrl}/get-favourites?user_id=${userID}`)
            if (data != null) {
                return NextResponse.json({
                    result: data,
                    success: true
                })
            } else {
                return new NextResponse('Failed to get favourites', {
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