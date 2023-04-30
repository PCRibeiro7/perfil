import { createSlice } from 'react-slice';
import cards from '../../../assets/cards.json';
import { IGameState } from '@/front/models/game/IGameState';
import { gameReducer } from './reducer';
import ICurrentPage from '@/front/models/game/ICurrentPage';
import { shuffleArray } from '@/utils/shuffleArray';

const initialGameState: IGameState = {
    currentPage: ICurrentPage.HOME,
    correctAnswers: [],
    cards: shuffleArray(cards),
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
