import { NextRequest, NextResponse } from "next/server"
import { logger } from "@/utils/logger"
import { NextApiRequest, NextApiResponse } from "next"

export const dynamic = 'force-dynamic'

const baseUrl = 'http://127.0.0.1:4000/api/comments'


/**
 * GET handler for chapter comments API route.
 *
 * Fetches comments for the chapter with the given ID from the comments API.
 *
 * Returns JSON response with comments data on success,
 * or error response on failure.
 */
export const GET = async (req: NextApiRequest, route: { params: { chapterId: string } }) => {
    if (req.method != "GET")
        return new NextResponse("Not Implemented", {
        status: 405,
        });

    try {
        const chapterId = route.params.chapterId;
        const response = await fetch(
        `${baseUrl}/get-chapter-comments?chapterId=${chapterId}`
        );

        if (!response.ok) {
        logger.error(`Error: ${response.statusText}\n${response.status}`);
        return new NextResponse("Failed to get chapter comments", {
            statusText: response.statusText,
            status: response.status,
        });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (e) {
        if (e instanceof Error) {
        logger.error(`${e.message}`);
        return new NextResponse("Internal Server Error", {
            status: 500,
        });
        }
    }
};

/** TODO: POST comment */
export const POST = async () => {}

/** TODO: DELETE comment */
export const DELETE = async () => {}

/** TODO: PUT comment */
export const PUT = async () => {}