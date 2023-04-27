import { ICard } from './ICard';
import ICurrentPage from './ICurrentPage';

export interface IGameState {
    gameStarted: boolean;
    currentPage: ICurrentPage;
    cardSlides: {
        first: boolean;
        second: boolean;
    };
    cards: ICard[];
    currentCardIndex: number;
    askedQuestions: number[];
    correctAnswers: string[];
    currentQuestionIndex: number;
    wrongAnswers: number;
    usedTips: number;
}
