import ICurrentPage from '@/models/ICurrentPage';
import { IGameActions } from '@/models/IGameActions';
import { IGameState } from '@/models/IGameState';
import { shuffleArray } from '@/utils/shuffleArray';

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
            };
        case IGameActions.SLIDE_SECOND_CARD:
            return {
                ...state,
                cardSlides: { ...state.cardSlides, second: true },
            };
        case IGameActions.CHANGE_PAGE:
            switch (payload.page) {
                case ICurrentPage.GAME:
                    return {
                        ...state,
                        currentPage: payload.page,
                        cardSlides: { ...state.cardSlides, first: true },
                    };
                default:
                    return {
                        ...state,
                        currentPage: payload.page,
                    };
            }
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
        case IGameActions.SETUP_NEXT_CARD:
            return {
                ...state,
                currentCardIndex: state.currentCardIndex + 1,
                askedQuestions: [0],
                currentQuestionIndex: 0,
                cardSlides: {
                    first: false,
                    second: false,
                },
                correctAnswers: [
                    ...state.correctAnswers,
                    payload.currentCard.answer,
                ],
            };
        default:
            throw new Error('Invalid action type');
    }
};
