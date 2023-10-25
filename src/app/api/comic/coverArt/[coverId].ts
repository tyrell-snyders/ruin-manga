import type { NextApiRequest, NextApiResponse } from 'next'

export const GET = async(req: NextApiRequest, res: NextApiResponse) => {
    const { coverId } = req.query
    res.send('Param:' + coverId)
}