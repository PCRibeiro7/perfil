import { gameSlice } from '@/slices/gameSlice';
import { Zoom } from '@mui/material';
import { useEffect, useState } from 'react';
import stringSimilarity from 'string-similarity';

const MINIMUN_SIMILARITY = 0.6;

export default function GuessComponent() {
    const [mounted, setMounted] = useState(false);
    const [shake, setShake] = useState(false);
    const state = gameSlice.use();
    const currentCard = state.cards[state.currentCardIndex];

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 1500 + currentCard.tips.length * 300);
    }, [currentCard.tips.length]);

    useEffect(() => {
        if (state.wrongAnswers > 0) {
            setShake(true);
            setTimeout(() => {
                setShake(false);
            }, 1000);
        }
    }, [state.wrongAnswers]);

    const skipQuestion = () => {
        gameSlice.dispatch({
            type: 'skipQuestion',
            payload: currentCard,
        });
    };

    const handleQuestionAnswered = (event: any) => {
        event.preventDefault();
        const value: string = event.target.answer.value || '';
        if (
            stringSimilarity.compareTwoStrings(
                value.toLowerCase(),
                currentCard.answer.toLowerCase(),
            ) > MINIMUN_SIMILARITY
        ) {
            gameSlice.dispatch({
                type: 'handleQuestionAnsweredCorrectly',
                payload: { currentCard },
            });
        } else {
            gameSlice.dispatch({
                type: 'handleQuestionAnsweredWrongly',
            });
        }
        event.target.reset();
    };

    return (
        <div className="self-center bg-white rounded-xl w-full p-3 flex flex-col items-center">
            <form
                onSubmit={handleQuestionAnswered}
                className="w-full"
                autoComplete="off"
            >
                <Zoom in={mounted}>
                    <input
                        type="text"
                        name="answer"
                        placeholder="Digite seu palpite aqui..."
                        className="text-center w-full h-10 text-xl border-2 border-slate-200 rounded-xl mb-2 placeholder:text-slate-400"
                    />
                </Zoom>
                <Zoom
                    in={mounted}
                    style={{ transitionDelay: mounted ? `500ms` : '0ms' }}
                >
                    <div>
                        <button
                            className={`w-full h-10 bg-slate-950 rounded-xl hover:bg-slate-600 ${
                                shake ? 'shake' : ''
                            }`}
                        >
                            <h1 className="text-xl text-white">
                                {'Responder'}
                            </h1>
                        </button>
                    </div>
                </Zoom>
            </form>
            <Zoom
                in={currentCard.tips.length === state.askedQuestions.length}
                style={{
                    transitionDelay:
                        currentCard.tips.length === state.askedQuestions.length
                            ? `500ms`
                            : '0ms',
                }}
                mountOnEnter
                unmountOnExit
            >
                <button
                    className={`w-full h-10 bg-slate-300 rounded-xl hover:bg-slate-200 mt-2`}
                    onClick={skipQuestion}
                >
                    <h1 className="text-xl text-black">{'Pular'}</h1>
                </button>
            </Zoom>
            <Zoom
                in={mounted}
                style={{ transitionDelay: mounted ? `1500ms` : '0ms' }}
            >
                <div className="mt-4">
                    <h1 className="text-slate-400">
                        {' '}
                        Palpites Errados: {state.wrongAnswers}
                    </h1>
                    <h1 className="text-slate-400">
                        {' '}
                        Dicas Usadas: {state.usedTips}
                    </h1>
                </div>
            </Zoom>
        </div>
    );
}
