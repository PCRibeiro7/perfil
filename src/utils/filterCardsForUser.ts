import { ICard } from '@/frontend/models/game/ICard';
import { ICardCategories } from '@/frontend/models/game/ICardCategories';
import { User } from '@prisma/client';

export const filterCardsForUser = (
    cards: ICard[],
    user: User,
    categories: ICardCategories[],
): ICard[] => {
    const cardsWithinSelectedCategories = cards.filter(card => {
        const matchedCategories = card.categories.filter(category =>
            categories.includes(category),
        );
        return matchedCategories.length > 0;
    });

    const seenButNotAnsweredCards = cardsWithinSelectedCategories.filter(
        card =>
            user.seenCardIds.includes(card.id) &&
            !user.correctCardIds.includes(card.id) &&
            !user.skippedCardIds.includes(card.id),
    );

    const skippedCards = cardsWithinSelectedCategories.filter(card =>
        user.skippedCardIds.includes(card.id),
    );

    let cardsToHide = [
        ...user.correctCardIds,
        ...user.seenCardIds,
        ...user.skippedCardIds,
    ];

    let neverSeenBeforeCards = cardsWithinSelectedCategories.filter(
        card => !cardsToHide.includes(card.id),
    );

    return [
        ...seenButNotAnsweredCards,
        ...neverSeenBeforeCards,
        ...skippedCards,
    ];
};
