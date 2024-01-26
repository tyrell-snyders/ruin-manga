import { logger } from "@/utils/logger"
import { NextResponse, NextRequest } from "next/server"

const url = 'http://localhost:8081/api/v1/comic/manga'

export const dynamic = 'force-dynamic'
                        
export const GET = async (req: NextRequest, route : { params: {mangaId: string} }) => {
    if (req.method === 'GET') {
        try {
            const mangaId: string = route.params.mangaId
            const response = await fetch(`${url}/${mangaId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                const data = await response.json()
                return NextResponse.json({
                    data,
                    message: '',
                    success: true
                })
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
        return new NextResponse('Not Allowed', {
            status: 405
        })
}