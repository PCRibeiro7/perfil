import { shuffleArray } from '@/utils/shuffleArray';
import { IGameActions, IGameState } from './models';

export interface IGameReducer {
    (
        state: IGameState,
        action: { type: IGameActions; payload?: any },
    ): IGameState;
}

export const gameReducer: IGameReducer = (state, { type, payload }) => {
    switch (type) {
        case IGameActions.START_GAME:
            return {
                ...state,
                cards: shuffleArray(state.cards),
                gameStarted: true,
                cardSlides: { ...state.cardSlides, first: true },
            };
        case IGameActions.SLIDE_SECOND_CARD:
            return {
                ...state,
                cardSlides: { ...state.cardSlides, second: true },
            };
        case IGameActions.HANDLE_SUCCESS_PAGE_CLICK:
            return {
                ...state,
                showSuccessPage: false,
                cardSlides: {
                    ...state.cardSlides,
                    first: true,
                },
            };
        case IGameActions.HANDLE_FAILURE_PAGE_CLICK:
            return {
                ...state,
                showFailurePage: false,
                cardSlides: {
                    ...state.cardSlides,
                    first: true,
                },
            };
        case IGameActions.HANDLE_QUESTION_ANSWERED_CORRECTLY:
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
        case IGameActions.HANDLE_QUESTION_ANSWERED_WRONG:
            return {
                ...state,
                wrongAnswers: state.wrongAnswers + 1,
            };

        case IGameActions.CHANGE_ACTIVE_TIP:
            return {
                ...state,
                currentQuestionIndex:
                    state.askedQuestions[payload.newAskedQuestionsIndex],
            };
        case IGameActions.HANDLE_CLICK_ON_GUESS_OPTION:
            return {
                ...state,
                askedQuestions: [...state.askedQuestions, payload.index],
                currentQuestionIndex: payload.index,
                usedTips: state.usedTips + 1,
            };
        case IGameActions.SKIP_QUESTION:
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
                correctAnswers: [...state.correctAnswers, payload.currentCard],
            };
        default:
            throw new Error('Invalid action type');
    }
};
