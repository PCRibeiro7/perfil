import { UserRepository } from '@/repositories/User';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { userId } = req.query;

        if (!userId) throw new Error('userId is required');

        if (!(typeof userId === 'string'))
            throw new Error('userId must be a string');

        const user = await UserRepository.getUserById(userId);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(JSON.stringify(error));
    }
}
