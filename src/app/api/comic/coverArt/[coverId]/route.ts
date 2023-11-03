import { logger } from '@/utils/logger';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse, NextRequest } from 'next/server';

const url = 'http://localhost:8080/api/v1/comic/manga/coverArt'
// const baseUrl = 'http://localhost:8080';

export const dynamic = 'force-dynamic';

export const GET = async(req: NextRequest, route: { params: {coverId: string}}) => {
    try {
        // const url = new URL(req.url)
        const coverId: string = String(route.params.coverId)
        if (coverId != null || coverId != undefined) {
            const response = await fetch(`${url}/${coverId}`, {
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
        } else {
            return NextResponse.json({
                message: 'coverId is null or undefined',
                success: false
            })
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