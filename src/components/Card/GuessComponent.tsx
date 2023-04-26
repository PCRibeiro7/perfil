import { ICard, IState } from '@/pages';
import { Zoom } from '@mui/material';
import { useEffect, useState } from 'react';

interface GuessComponentProps {
    handleQuestionAnswered: (event: any) => void;
    wrongAnswers: number;
    usedTips: number;
    currentCard: ICard;
    setState: React.Dispatch<React.SetStateAction<IState>>;
}
export default function GuessComponent({
    handleQuestionAnswered,
    wrongAnswers,
    usedTips,
    currentCard,
    setState,
}: GuessComponentProps) {
    const [mounted, setMounted] = useState(false);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 1500 + currentCard.tips.length * 300);
    }, [currentCard.tips.length]);

    useEffect(() => {
        if (wrongAnswers > 0) {
            setShake(true);
            setTimeout(() => {
                setShake(false);
            }, 1000);
        }
    }, [wrongAnswers]);

    const skipQuestion = () => {
        setState(state => ({
            ...state,
            currentCardIndex: state.currentCardIndex + 1,
            askedQuestions: [0],
            currentQuestionIndex: 0,
            showFailurePage: true,
            cardSlides: {
                first: false,
                second: false,
            },
            correctAnswers: [...state.correctAnswers, currentCard.answer],
        }));
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
                        className="text-center w-full h-10 text-xl border-slate-600 rounded-xl mb-2 placeholder:text-slate-400 bg-slate-100"
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
                in={currentCard.tips.length === usedTips}
                style={{
                    transitionDelay:
                        currentCard.tips.length === usedTips ? `500ms` : '0ms',
                }}
            >
                <button
                    className={`w-full h-10 bg-white rounded-xl hover:bg-slate-200 mt-2 border-slate-500 border-2 `}
                    onClick={skipQuestion}
                >
                    <h1 className="text-xl">{'Pular'}</h1>
                </button>
            </Zoom>
            <Zoom
                in={mounted}
                style={{ transitionDelay: mounted ? `1500ms` : '0ms' }}
            >
                <div className="mt-4">
                    <h1 className="text-slate-400">
                        {' '}
                        Palpites Errados: {wrongAnswers}
                    </h1>
                    <h1 className="text-slate-400">
                        {' '}
                        Dicas Usadas: {usedTips}
                    </h1>
                </div>
            </Zoom>
        </div>
    );
}
