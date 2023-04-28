import { CardRepository } from '@/repositories/Card';
import { Card } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        if (req.method === 'GET') {
            const cards = await CardRepository.getAllCards();
            res.status(200).json(cards);
        }
        if (req.method === 'POST') {
            const cards = req.body as Card[];
            await CardRepository.createCards(cards);
            res.status(200);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
