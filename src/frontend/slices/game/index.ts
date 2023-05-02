import { createSlice } from 'react-slice';
import cards from '../../../frontend/assets/cards.json';
import { IGameState } from '@/frontend/models/game/IGameState';
import { gameReducer } from './reducer';
import ICurrentPage from '@/frontend/models/game/ICurrentPage';
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
    loading: false,
    showCardStats: false,
    sound: {
        isMuted: false,
        masterVolume: 0.5,
    },
};

export const gameSlice = createSlice({
    reducer: gameReducer,
    initialState: initialGameState,
    debugName: 'Game',
});
