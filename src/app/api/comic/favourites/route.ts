import { NextRequest, NextResponse } from "next/server"
import { logger } from "@/utils/logger"
import { NextApiRequest, NextApiResponse } from "next"

const baseUrl = 'http://localhost:4000/api/favourites'

export const dynamic = 'force-dynamic'

export const POST = async(req: NextRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            // Read the request body as a string
            const requestBody = await req.text();
            // Parse the string as JSON
            const body = JSON.parse(requestBody);

            const response = await fetch(`${baseUrl}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: JSON.stringify(body)
            })

            if (response.ok) {
                await response.json();
                return NextResponse.json({
                    message: 'Successfully added to favourites',
                    success: true
                })
            } else
                return new NextResponse('Failed to add to favourites.', {
                    status: 400
                })
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error: ${e.stack}`)
                return new NextResponse('Internal Server Error', {
                    status: 500
                })
            }
        }
    } else {
        res.status(405).end()
    }
}