import { createSlice } from 'react-slice';
import cards from '../../consts/cards.json';
import { IGameState } from './models';
import { gameReducer } from './reducer';

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
    reducer: gameReducer,
    initialState: initialGameState,
    debugName: 'Game',
});
