import { NextResponse } from "next/server";
import { logger } from '@/utils/logger';

export const dynamic = 'force-dynamic';

const baseUrl = 'http://localhost:8080';

export const GET = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/v1/comic/trending`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

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
    } catch (e) {
        if (e instanceof Error) {
            logger.error(`Error getting data: ${e.message}`);
            return NextResponse.json({
                success: false,
                message: 'Something went wrong!'
            });
        }
    }
};