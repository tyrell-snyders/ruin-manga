import { NextRequest, NextResponse } from "next/server"
import { logger } from "@/utils/logger"
import {  NextApiRequest, NextApiResponse } from "next"

export const dynamic = 'force-dynamic'

const baseUrl = 'http://127.0.0.1:4000'

export const POST = async (req: NextRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            // Read the request body as a string
            const requestBody = await req.text()

            const response = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: requestBody
            })

            if (response.status === 201) {
                const data = await response.json()
                return NextResponse.json({
                    data,
                    message: 'Successfully registered.',
                    success: true
                })
            } else {
                return new NextResponse('Failed to log in! No user found with provided credentials.', {
                    status: 404
                })
            }
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error: ${e.message}`)
                return new NextResponse( 'Internal Server error', {
                    status: 500
                })
            }
        }
    } else {
        return new NextResponse('Not Allowed', {
            status: 405
        })
    }
}