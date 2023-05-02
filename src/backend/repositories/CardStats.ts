import { PrismaClient, CardStats } from '@prisma/client';
import { CardStatsType } from '../../shared/models/CardStatsType';
import { prisma } from '../client';

export class CardStatsRepository {
    static async getCardStatsByCardId(
        cardId: string,
    ): Promise<CardStats | null> {
        return await prisma.cardStats.findFirst({
            where: { cardId },
        });
    }

    static async upsertCardStats(cardId: string, type: CardStatsType) {
        const cardStats = await prisma.cardStats.findFirst({
            where: { cardId },
        });
        if (cardStats) {
            const newCardStats = this.incrementCardStats(cardStats, type);
            delete newCardStats.id;
            return await prisma.cardStats.update({
                where: { id: cardStats.id },
                data: newCardStats,
            });
        } else {
            const newCardStats = this.incrementCardStats(
                {
                    cardId,
                },
                type,
            );
            return await prisma.cardStats.create({
                data: { ...newCardStats, cardId },
            });
        }
    }

    private static incrementCardStats(
        cardStats: Partial<CardStats>,
        type: CardStatsType,
    ): Partial<CardStats> {
        const newCardStats: Partial<CardStats> = {
            ...cardStats,
        };
        switch (type) {
            case CardStatsType.SEEN:
                newCardStats.seenCount = (cardStats.seenCount || 0) + 1;
                break;
            case CardStatsType.CORRECT:
                newCardStats.correctCount = (cardStats.correctCount || 0) + 1;
                break;
            case CardStatsType.SKIPPED:
                newCardStats.skippedCount = (cardStats.skippedCount || 0) + 1;
                break;
        }
        return newCardStats;
    }
}
