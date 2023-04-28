import { UserRepository } from '@/repositories/User';
import { Card, User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        if (req.method === 'GET') {
            const users: User[] = await UserRepository.getAllUsers();
            res.status(200).json(users);
        }
        if (req.method === 'POST') {
            const users: User[] = req.body;
            await UserRepository.createUsers(users);
            res.status(200);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(JSON.stringify(error));
    }
}
