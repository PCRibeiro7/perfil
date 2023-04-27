import { createSlice } from 'react-slice';
import cards from '../../assets/cards.json';
import { IGameState } from '@/models/IGameState';
import { gameReducer } from './reducer';
import ICurrentPage from '@/models/ICurrentPage';

const initialGameState: IGameState = {
    gameStarted: false,
    currentPage: ICurrentPage.HOME,
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
