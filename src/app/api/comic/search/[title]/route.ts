import { logger } from "@/utils/logger"
import { NextResponse, NextRequest } from "next/server"

export const dynamic = 'force-dynamic';

const baseUrl = 'http://localhost:8081/api/v1/comic';

export const GET = async (req: NextRequest, route : { params: {title: string} }) => {
    if (req.method === 'GET') {
        try {
            const title = route.params.title
            const response = await fetch(`${baseUrl}/search/${title}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                const data = await response.json()
                return NextResponse.json(data)
            } else
                return new NextResponse(response.statusText, {
                    status: response.status
                })
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`${e.message}`)
                return new NextResponse('Internal Server Error', {
                    status: 500
                })
            }
        }
    } else
        return new NextResponse('Not Implemented', {
            status: 405
        })
}