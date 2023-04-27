import { IGameActions } from '@/models/IGameActions';
import { IGameState } from '@/models/IGameState';

export interface IGameReducerActions {
    type: IGameActions;
    payload?: any;
}

export const gameReducer = (
    state: IGameState,
    { type, payload }: IGameReducerActions,
): IGameState => {
    switch (type) {
        case IGameActions.CHANGE_PAGE:
            return {
                ...state,
                currentPage: payload.page,
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
        case IGameActions.SETUP_NEXT_CARD:
            return {
                ...state,
                currentCardIndex: state.currentCardIndex + 1,
                askedQuestions: [0],
                currentQuestionIndex: 0,
                correctAnswers: [
                    ...state.correctAnswers,
                    payload.currentCard.answer,
                ],
            };
        default:
            throw new Error(`Invalid action type: ${type}`);
    }
};
