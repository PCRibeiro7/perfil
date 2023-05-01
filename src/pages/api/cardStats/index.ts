import { CardStatsRepository } from '@/backend/repositories/CardStats';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { method } = req;

        if (method === 'GET') {
            const { cardId } = req.query;

            if (!cardId) {
                throw new Error('cardId is required');
            }
            if (!(typeof cardId === 'string')) {
                throw new Error('cardId must be a string');
            }
            const cardStats = await CardStatsRepository.getCardStatsByCardId(
                cardId,
            );
            res.status(200).json(cardStats);
        }

        if (method === 'PUT') {
            const { type, cardId } = req.body;

            const cardStats = await CardStatsRepository.upsertCardStats(
                cardId,
                type,
            );
            res.status(200).json(cardStats);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify(error));
    }
}
