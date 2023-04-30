import { ICard } from '@/front/models/game/ICard';
import { User } from '@prisma/client';

export const filterCardsForUser = (cards: ICard[], user: User): ICard[] => {
    let cardsToHide = [
        ...user.correctCardIds,
        ...user.seenCardIds,
        ...user.skippedCardIds,
    ];

    let filteredCards = cards.filter(card => !cardsToHide.includes(card.id));

    if (filteredCards.length !== 0) {
        return filteredCards;
    }

    cardsToHide = [...user.correctCardIds, ...user.skippedCardIds];
    filteredCards = cards.filter(card => !cardsToHide.includes(card.id));

    if (filteredCards.length !== 0) {
        return filteredCards;
    }

    cardsToHide = [...user.correctCardIds];
    filteredCards = cards.filter(card => !cardsToHide.includes(card.id));

    if (filteredCards.length !== 0) {
        return filteredCards;
    }

    return [];
};
