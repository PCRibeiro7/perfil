import { ICard } from './ICard';
import ICurrentPage from './ICurrentPage';

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
}
