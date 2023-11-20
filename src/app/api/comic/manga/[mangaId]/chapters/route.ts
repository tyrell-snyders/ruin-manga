import { logger } from "@/utils/logger"
import { NextResponse, NextRequest } from "next/server"

const url = 'http://localhost:8081/api/v1/manga/chapters'

export const dynamic = 'force-dynamic'

export const GET = async(req: NextRequest, route : { params: {mangaId: string} }) => {
    if (req.method === 'GET') {
        try {
            const  mangaId = route.params.mangaId
            const response = await fetch(`${url}/${mangaId}`, {
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