import { createSlice } from 'react-slice';
import cards from '../consts/cards.json';
import { shuffleArray } from '@/utils/shuffleArray';

export type ICard = {
    type: string;
    answer: string;
    tips: string[];
};

export interface IGameState {
    gameStarted: boolean;
    showSuccessPage: boolean;
    showFailurePage: boolean;
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

const initialGameState: IGameState = {
    gameStarted: false,
    showSuccessPage: false,
    showFailurePage: false,
    cardSlides: {
        first: false,
        second: false,
    },
    correctAnswers: [],
    cards: cards,
    currentCardIndex: 0,
    askedQuestions: [0],
    currentQuestionIndex: 0,
    wrongAnswers: 0,
    usedTips: 1,
};

export const gameSlice = createSlice({
    reducer: (state, { type, payload }) => {
        switch (type) {
            case 'startGame':
                return {
                    ...state,
                    cards: shuffleArray(state.cards),
                    gameStarted: true,
                    cardSlides: { ...state.cardSlides, first: true },
                };
            case 'slideSecondCard':
                return {
                    ...state,
                    cardSlides: { ...state.cardSlides, second: true },
                };
            case 'handleSuccessPageClick':
                return {
                    ...state,
                    showSuccessPage: false,
                    cardSlides: {
                        ...state.cardSlides,
                        first: true,
                    },
                };
            case 'handleFailurePageClick':
                return {
                    ...state,
                    showFailurePage: false,
                    cardSlides: {
                        ...state.cardSlides,
                        first: true,
                    },
                };

            case 'handleQuestionAnsweredCorrectly':
                return {
                    ...state,
                    currentCardIndex: state.currentCardIndex + 1,
                    askedQuestions: [0],
                    currentQuestionIndex: 0,
                    showSuccessPage: true,
                    cardSlides: {
                        first: false,
                        second: false,
                    },
                    correctAnswers: [
                        ...state.correctAnswers,
                        payload.currentCard.answer,
                    ],
                };
            case 'handleQuestionAnsweredWrongly':
                return {
                    ...state,
                    wrongAnswers: state.wrongAnswers + 1,
                };

            case 'changeActiveTip':
                return {
                    ...state,
                    currentQuestionIndex:
                        state.askedQuestions[payload.newAskedQuestionsIndex],
                };
            case 'handleClickonGuessOption':
                return {
                    ...state,
                    askedQuestions: [...state.askedQuestions, payload.index],
                    currentQuestionIndex: payload.index,
                    usedTips: state.usedTips + 1,
                };
            case 'skipQuestion':
                return {
                    ...state,
                    currentCardIndex: state.currentCardIndex + 1,
                    askedQuestions: [0],
                    currentQuestionIndex: 0,
                    showFailurePage: true,
                    cardSlides: {
                        first: false,
                        second: false,
                    },
                    correctAnswers: [
                        ...state.correctAnswers,
                        payload.currentCard,
                    ],
                };
            default:
                return state;
        }
    },
    initialState: initialGameState,
    debugName: 'Game',
});
