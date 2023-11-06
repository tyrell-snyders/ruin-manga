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
            // Parse the string as JSON
            const body = JSON.parse(requestBody)

            const response = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: JSON.stringify(body)
            })

            if (response.status === 200) {
                const data = await response.json()
                return NextResponse.json({
                    data,
                    message: 'Successfully registered.',
                    success: true
                })
            } else {
                return NextResponse.json({
                    message: 'Failed to register user.', success: false
                })
            }
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error: ${e.stack}`)
                return NextResponse.json({
                    message: e.message,
                    success: false
                })
            }
        }
    } else {
        return res.status(405).end()
    }
}