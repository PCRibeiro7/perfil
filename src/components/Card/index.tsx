import stringSimilarity from 'string-similarity';
import GuessComponent from './GuessComponent';
import GuessOptions from './GuessOptions';
import TipPanel from './TipPanel';
import TipTypePanel from './TipTypePanel';
import { Slide } from '@mui/material';
import { IState } from '../../pages';

const MINIMUN_SIMILARITY = 0.6;

export interface ICardProps {
    state: IState;
    setState: React.Dispatch<React.SetStateAction<IState>>;
}
export default function Card({ state, setState }: ICardProps): JSX.Element {
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
                showSuccessPage: true,
                cardSlides: {
                    first: false,
                    second: false,
                },
                correctAnswers: [...state.correctAnswers, currentCard.answer],
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
        <main className="pt-12 pb-12 flex justify-center min-h-screen bg-slate-100 sm:pt-0 sm:pb-0">
            <div className="justify-between flex flex-col p-6 w-[30rem] sm:p-2">
                <Slide
                    direction="up"
                    in={state.cardSlides.first}
                    timeout={1000}
                    mountOnEnter
                    unmountOnExit
                >
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
                </Slide>

                <Slide
                    direction="up"
                    in={state.cardSlides.second}
                    timeout={1000}
                    mountOnEnter
                    unmountOnExit
                >
                    <div className="bg-white flex flex-col   p-6 rounded-lg">
                        <GuessOptions
                            currentCard={currentCard}
                            askedQuestions={state.askedQuestions}
                            handleClickonGuessOption={handleClickonGuessOption}
                        />
                        <GuessComponent
                            handleQuestionAnswered={handleQuestionAnswered}
                            wrongAnswers={state.wrongAnswers}
                            usedTips={state.usedTips}
                        />
                    </div>
                </Slide>
            </div>
        </main>
    );
}
