import { ICard } from './ICard';
import { ICardCategories } from './ICardCategories';
import ICurrentPage from './ICurrentPage';

export interface ISound {
    isMuted: boolean;
    masterVolume: number;
}
export interface IGameState {
    currentPage: ICurrentPage;
    cards: ICard[];
    currentCardIndex: number;
    askedQuestions: number[];
    correctAnswers: string[];
    currentQuestionIndex: number;
    wrongAnswers: number;
    usedTips: number;
    loading: boolean;
    showCardStats: boolean;
    sound: ISound;
    selectedCategories: ICardCategories[];
}
