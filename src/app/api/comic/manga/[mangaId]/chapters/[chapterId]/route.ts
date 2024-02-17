import { NextRequest, NextResponse } from "next/server"
import { logger } from "@/utils/logger"
import { NextApiRequest, NextApiResponse } from "next"
import { json } from "stream/consumers"

export const dynamic = 'force-dynamic'

const baseUrl = 'http://localhost:8081/api/v1'

export const GET = async(req: NextApiRequest, route: { params: { chapterId: string }}) => {
    if (req.method === 'GET') {
        try {
            const chapterId = route.params.chapterId
            const response = await fetch(baseUrl + `/manga/chapter/pages/${chapterId}`)

            if (!response.ok) {
                logger.error(`Error: ${response.statusText}\n${response.status}`)
                return new NextResponse('Failed to get chapter pages', {
                    statusText: response.statusText,
                    status: response.status
                })
            }

            const data = await response.json()
            return NextResponse.json(data)
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