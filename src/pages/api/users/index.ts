import { UserRepository } from '@/backend/repositories/User';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { method } = req;
        if (method === 'GET') {
            const users = await UserRepository.getAllUsers();
            res.status(200).json(users);
        }
        if (method === 'POST') {
            const user = await UserRepository.createNewUser();
            res.status(200).json(user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify(error));
    }
}
