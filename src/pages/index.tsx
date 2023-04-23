import { useState } from 'react';
import cards from '../consts/cards.json';
import Home from './Home';
import Card from './Card';
import Success from './Success';
import { shuffleArray } from '@/utils/shuffleArray';

const INITIAL_CARD_INDEX = 0;

type SnackbarType = 'success' | 'error';
export interface IState {
    gameStarted: boolean;
    showQuestionAnsweredPage: boolean;
    slides: {
        first: boolean;
        second: boolean;
    };
    cards: any[];
    currentCardIndex: number;
    askedQuestions: number[];
    currentQuestionIndex: number;
    wrongAnswers: number;
    usedTips: number;
    snackbar: {
        open: boolean;
        type: SnackbarType;
        message: string;
    };
}

export default function Main(): JSX.Element {
    const [state, setState] = useState<IState>({
        gameStarted: false,
        showQuestionAnsweredPage: false,
        slides: {
            first: false,
            second: false,
        },
        cards: cards,
        currentCardIndex: INITIAL_CARD_INDEX,
        askedQuestions: [0],
        currentQuestionIndex: 0,
        wrongAnswers: 0,
        usedTips: 0,
        snackbar: {
            open: false,
            type: 'success',
            message: '',
        },
    });

    const startGame = () => {
        setState(state => ({
            ...state,
            cards: shuffleArray(state.cards),
            gameStarted: true,
            slides: { ...state.slides, first: true },
        }));
        setTimeout(() => {
            setState(state => ({
                ...state,
                slides: { ...state.slides, second: true },
            }));
        }, 4000);
    };

    if (!state.gameStarted) {
        return <Home startGame={startGame} />;
    }

    if (state.showQuestionAnsweredPage) {
        return <Success setState={setState} startGame={startGame} />;
    }

    return <Card state={state} setState={setState} />;
}
