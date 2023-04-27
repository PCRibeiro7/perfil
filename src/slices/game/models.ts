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

export enum IGameActions {
    START_GAME = 'START_GAME',
    SLIDE_SECOND_CARD = 'SLIDE_SECOND_CARD',
    HANDLE_SUCCESS_PAGE_CLICK = 'HANDLE_SUCCESS_PAGE_CLICK',
    HANDLE_FAILURE_PAGE_CLICK = 'HANDLE_FAILURE_PAGE_CLICK',
    HANDLE_QUESTION_ANSWERED_CORRECTLY = 'HANDLE_QUESTION_ANSWERED_CORRECTLY',
    HANDLE_QUESTION_ANSWERED_WRONG = 'HANDLE_QUESTION_ANSWERED_WRONG',
    CHANGE_ACTIVE_TIP = 'CHANGE_ACTIVE_TIP',
    HANDLE_CLICK_ON_GUESS_OPTION = 'HANDLE_CLICK_ON_GUESS_OPTION',
    SKIP_QUESTION = 'SKIP_QUESTION',
}
