import { logger } from '@/utils/logger';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

const baseUrl = 'http://localhost:8080';

export const dynamic = 'force-dynamic';

export const GET = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        const coverId = req.query?.coverId
        const response = await fetch(`${baseUrl}/api/v1/comic/manga/coverArt/${coverId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json({
                data,
                message: 'Got Trending',
                success: true
            });
        } else {
            logger.error(`Error getting data: ${response.statusText}`);
            return NextResponse.json({
                message: 'No Trending',
                success: false
            });
        }
    } catch(e) {
        if (e instanceof Error) {
            logger.error(`Error getting data: ${e.message}`);
            return NextResponse.json({
                success: false,
                message: 'Something went wrong!'
            });
        }
    }
}