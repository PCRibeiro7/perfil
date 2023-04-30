import { UserRepository } from '@/back/repositories/User';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { method, body } = req;
        const { userId } = req.query;

        if (!userId) throw new Error('userId is required');
        if (!(typeof userId === 'string'))
            throw new Error('userId must be a string');

        if (method == 'GET') {
            const user = await UserRepository.getUserById(userId);

            res.status(200).json(user);
        }

        if (method === 'PUT') {
            if (!body) throw new Error('body is required');

            const user = await UserRepository.updateUserById(userId, body);
            res.status(200).json(user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify(error));
    }
}
