import { NextRequest, NextResponse } from "next/server"
import { logger } from "@/utils/logger"
import { NextApiRequest, NextApiResponse } from "next"

export const dynamic = 'force-dynamic'

const baseUrl = 'http://127.0.0.1:4000/api/favourites'

export const POST = async(req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            // Read the request body as a string
            const requestBody = await req.json()
            console.log('RequestBody: \n', requestBody)
            const res = await fetch(`${baseUrl}/add`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            }).catch((error) => {
                console.error('Error making fetch request:', error);
                throw error;
            });

            console.log('Res: \n', res)

            if (res.ok) {
                const data = await res.json()
                console.log('After API fetch\n', data)
                if (data != null) {
                    return NextResponse.json({
                        message: 'Successfully added to favourites',
                        success: true
                    })
                } else
                    return new NextResponse('Failed to add to favourites.', {
                        status: 400
                    })
            }
            
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error: ${e.message}`)
                return new NextResponse('Internal Server Error', {
                    status: 500
                })
            }
        }
    } else {
        res.status(405).end()
    }
}