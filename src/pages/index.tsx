import { useState } from 'react';
import cards from '../consts/cards.json';
import Home from '../components/Home/Home';
import Card from '../components/Card/Card';
import Success from '../components/Success/Success';

const INITIAL_CARD_INDEX = 0;

type SnackbarType = 'success' | 'error';
export interface IState {
    gameStarted: boolean;
    showSuccessPage: boolean;
    cardSlides: {
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
        showSuccessPage: false,
        cardSlides: {
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

    if (!state.gameStarted) {
        return <Home setState={setState} />;
    }

    if (state.showSuccessPage) {
        return <Success setState={setState} />;
    }

    return <Card state={state} setState={setState} />;
}
