import { NextRequest, NextResponse } from "next/server"
import { logger } from "@/utils/logger"
import { NextApiRequest, NextApiResponse } from "next"
import axios, { AxiosResponse } from 'axios'

export const dynamic = 'force-dynamic'

const baseUrl = 'http://localhost:4000/api/favourites'

export const POST = async(req: NextRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            // Read the request body as a string
            const requestBody = await req.text();
            // Parse the string as JSON
            const body = JSON.parse(requestBody);
            const { data } = await axios.post(`${baseUrl}/add`, body, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            })
            console.log('After API fetch', data)
            if (data != null) {
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
                logger.error(`Error: ${e.cause}`)
                return new NextResponse('Internal Server Error', {
                    status: 500
                })
            }
        }
    } else {
        res.status(405).end()
    }
}

export const GET = async (req: NextRequest, res: NextApiResponse, route: { params: { userID: string }}) => {
    if (req.method === 'GET') {
        try {
            const userID = route.params.userID
            const { data } = await axios.get(`${baseUrl}/get-favourites?user_id${userID}`)
            
            if (data != null) {
                return NextResponse.json({
                    result: data,
                    success: true
                })
            } else {
                return new NextResponse('Failed to get favourites', {
                    status: 400
                })
            }
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error: ${e.cause}`)
                return new NextResponse('Internal Server Error', {
                    status: 500
                })
            }
        }
    } else {
        res.status(405).end()
    }
}