import { ICard } from '@/frontend/models/game/ICard';
import { User } from '@prisma/client';

export const filterCardsForUser = (cards: ICard[], user: User): ICard[] => {
    const seenButNotAnsweredCards = cards.filter(
        card =>
            user.seenCardIds.includes(card.id) &&
            !user.correctCardIds.includes(card.id) &&
            !user.skippedCardIds.includes(card.id),
    );

    const skippedCards = cards.filter(card =>
        user.skippedCardIds.includes(card.id),
    );

    let cardsToHide = [
        ...user.correctCardIds,
        ...user.seenCardIds,
        ...user.skippedCardIds,
    ];

    let neverSeenBeforeCards = cards.filter(
        card => !cardsToHide.includes(card.id),
    );

    return [
        ...seenButNotAnsweredCards,
        ...neverSeenBeforeCards,
        ...skippedCards,
    ];
};
