import { useState } from 'react';
import stringSimilarity from 'string-similarity';
import GuessComponent from './components/GuessComponent';
import GuessOptions from './components/GuessOptions';
import TipPanel from './components/TipPanel';
import TipTypePanel from './components/TipTypePanel';
import FeedbackSnackbar from './components/FeedbackSnackbar';
import cards from './cards.json';

const INITIAL_CARD_INDEX = 0;
const MINIMUN_SIMILARITY = 0.8;

const mockCards = [
    {
        type: 'Pessoa',
        answer: 'Monalisa',
        questions: [
            'Também sou conhecida como Gioconda.',
            'Fui feita por um dos pintores mais conhecidos do renascimento italian, Leonardo da Vinci,',
            'Atualmente estou exposta no Museu do Louvre, em Paris.',
            'Eu retrato a figura de uma mulher com um soso enigmatic.',
            'Volte uma casa.',
            'Ful avaliada, na década de 1960, em cerca de 100 milhes de dolares.',
            'Avance uma casa.',
            'Sou um dos quadros mais famosos do mundo.',
            'Minha pintura foi iniciada do ano de 1503.',
            'Perca sua vez.',
        ],
    },
    {
        type: 'Pessoa',
        answer: 'Mecenas',
        questions: [
            'Minha funggo é financiar as atividades intelectuais e artisticas dos artistas do Renascimento.',
            'OS mals conhecidos foram Lourenco de Médici, banqueiro ftallano, Come de Médici, politico bangqueira italiano e Francisca |, rei da Franga',
            'Ameu ver a patrocinio das obras do renascimento era uma forma de abter status social.',
            'Escolha uma pessoa para avangar uma casa.',
            'Perca sua vez,',
            'Eu patracino einvisto na produgo cultural dos artistas do Renascimento.',
            'Artistas como Leonardo Da Vince, Sandro Boticelli, Michelangelo Buonarotti, Rafael Sanzio, entre outros, foram finandiados por mim.',
            'Avance uma casa.',
            'Essa palavra tem origem na Roma Antiga. Caio Mecenaspatrocinou a produggio de varios artistas e poetas nesta época.',
            'Como eram chamados os comerciantes, principes, condes, bispos e banqueiros que financiavam a sobras de arte no Renascimento.',
        ],
    },
];

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
        <main className="pt-12 pb-12 flex justify-center h-screen">
            <div
                className="text-center justify-between flex flex-col snap-center
                     bg-slate-100 p-6 w-fit rounded-lg"
            >
                <TipTypePanel currentCard={currentCard} />
                <TipPanel
                    currentCard={currentCard}
                    currentQuestionIndex={state.currentQuestionIndex}
                    changeTip={changeTip}
                    canGoForward={canGoForward}
                    canGoBack={canGoBack}
                />
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
            <FeedbackSnackbar
                snackbar={state.snackbar}
                handleSnackBar={handleSnackBar}
            />
        </main>
    );
}
