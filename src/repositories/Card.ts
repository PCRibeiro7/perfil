import { Card, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CardRepository {
    static async getAllCards(): Promise<Card[]> {
        return await prisma.card.findMany();
    }

    static async createCards(cards: Card[]) {
        return await prisma.card.createMany({ data: cards });
    }
}
