import { useState } from 'react';
import cards from '../consts/cards.json';
import Home from '../components/Home/Home';
import Card from '../components/Card';
import Success from '../components/Success/Success';
import Failure from '@/components/Failure';
import { gameSlice } from '@/slices/gameSlice';

const INITIAL_CARD_INDEX = 0;

export type ICard = {
    type: string;
    answer: string;
    tips: string[];
};
export interface IState {
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

export default function Main(): JSX.Element {
    const state = gameSlice.use();
    // const [state, setState] = useState<IState>({
    //     gameStarted: false,
    //     showSuccessPage: false,
    //     showFailurePage: false,
    //     cardSlides: {
    //         first: false,
    //         second: false,
    //     },
    //     correctAnswers: [],
    //     cards: cards,
    //     currentCardIndex: INITIAL_CARD_INDEX,
    //     askedQuestions: [0],
    //     currentQuestionIndex: 0,
    //     wrongAnswers: 0,
    //     usedTips: 1,
    // });

    if (!state.gameStarted) {
        return <Home />;
    }

    if (state.showSuccessPage) {
        return <Success />;
    }

    if (state.showFailurePage) {
        return <Failure />;
    }

    return <Card />;
}
