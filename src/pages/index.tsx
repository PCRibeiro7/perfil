import { useState } from 'react';
import stringSimilarity from 'string-similarity';
import GuessComponent from '../components/GuessComponent';
import GuessOptions from '../components/GuessOptions';
import TipPanel from '../components/TipPanel';
import TipTypePanel from '../components/TipTypePanel';
import FeedbackSnackbar from '../components/FeedbackSnackbar';
import cards from './cards.json';

const INITIAL_CARD_INDEX = 0;
const MINIMUN_SIMILARITY = 0.8;

type SnackbarType = 'success' | 'error';
export interface IState {
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
export default function Home(): JSX.Element {
    const [state, setState] = useState<IState>({
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

    const currentCard = state.cards[state.currentCardIndex];
    const askedQuestionsIndex = state.askedQuestions.indexOf(
        state.currentQuestionIndex,
    );
    const canGoForward =
        state.askedQuestions[askedQuestionsIndex + 1] !== undefined;
    const canGoBack =
        state.askedQuestions[askedQuestionsIndex - 1] !== undefined;

    const handleQuestionAnswered = (event: any) => {
        event.preventDefault();
        const value = event.target.answer.value;
        if (
            stringSimilarity.compareTwoStrings(value, currentCard.answer) >
            MINIMUN_SIMILARITY
        ) {
            setState(state => ({
                ...state,
                currentCardIndex: state.currentCardIndex + 1,
                askedQuestions: [0],
                currentQuestionIndex: 0,
                snackbar: { type: 'success', open: true, message: 'Acertou!' },
            }));
        } else {
            setState(state => ({
                ...state,
                wrongAnswers: state.wrongAnswers + 1,
                snackbar: { type: 'error', open: true, message: 'Errou!' },
            }));
        }
        event.target.reset();
    };

    const handleClickonGuessOption = (index: number) => {
        setState(state => ({
            ...state,
            askedQuestions: [...state.askedQuestions, index],
            currentQuestionIndex: index,
            usedTips: state.usedTips + 1,
        }));
    };

    function handleSnackBar(snackbarData: Partial<IState['snackbar']>) {
        setState(s => ({
            ...s,
            snackbar: { ...state.snackbar, ...snackbarData },
        }));
    }

    const changeTip = (direction: 'back' | 'forward') => {
        const askedQuestionsIndex = state.askedQuestions.indexOf(
            state.currentQuestionIndex,
        );
        if (direction === 'back') {
            setState(state => ({
                ...state,
                currentQuestionIndex:
                    state.askedQuestions[askedQuestionsIndex - 1],
            }));
        } else {
            setState(state => ({
                ...state,
                currentQuestionIndex:
                    state.askedQuestions[askedQuestionsIndex + 1],
            }));
        }
    };

    return (
        <main className="pt-12 pb-12 flex justify-center h-screen bg-slate-100 sm:pt-0 sm:pb-0">
            <div className="justify-between flex flex-col p-6 w-[30rem] sm:p-2">
                <div className="bg-white flex flex-col   p-6 rounded-lg">
                    <TipTypePanel currentCard={currentCard} />
                    <TipPanel
                        currentCard={currentCard}
                        currentQuestionIndex={state.currentQuestionIndex}
                        changeTip={changeTip}
                        canGoForward={canGoForward}
                        canGoBack={canGoBack}
                    />
                </div>
                <div className="bg-white flex flex-col   p-6 rounded-lg">
                    <GuessOptions
                        currentCard={currentCard}
                        askedQuestions={state.askedQuestions}
                        handleClickonGuessOption={handleClickonGuessOption}
                    />
                    <GuessComponent
                        handleQuestionAnswered={handleQuestionAnswered}
                        wrongAnswers={state.wrongAnswers}
                        askedQuestions={state.askedQuestions}
                        usedTips={state.usedTips}
                    />
                </div>
            </div>
            <FeedbackSnackbar
                snackbar={state.snackbar}
                handleSnackBar={handleSnackBar}
            />
        </main>
    );
}
