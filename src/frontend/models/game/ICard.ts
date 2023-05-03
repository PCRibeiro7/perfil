import { ICardCategories } from './ICardCategories';

export type ICard = {
    answer: string;
    categories: ICardCategories[];
    type: string;
    tips: string[];
    id: string;
};
