import { gameSlice } from '@/slices/gameSlice';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Zoom } from '@mui/material';
import { useEffect, useState } from 'react';

type TipPanelProps = {
    currentQuestionIndex: number;
    currentCard: any;
    changeTip: (direction: 'back' | 'forward') => void;
    canGoBack: boolean;
    canGoForward: boolean;
};
export default function TipPanel() {
    const [mounted, setMounted] = useState(false);
    const state = gameSlice.use();
    const currentCard = state.cards[state.currentCardIndex];
    const askedQuestionsIndex = state.askedQuestions.indexOf(
        state.currentQuestionIndex,
    );
    const canGoForward =
        state.askedQuestions[askedQuestionsIndex + 1] !== undefined;
    const canGoBack =
        state.askedQuestions[askedQuestionsIndex - 1] !== undefined;

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 2000);
    }, []);

    const changeTip = (direction: 'back' | 'forward') => {
        const askedQuestionsIndex = state.askedQuestions.indexOf(
            state.currentQuestionIndex,
        );
        const newAskedQuestionsIndex =
            direction === 'back'
                ? askedQuestionsIndex - 1
                : askedQuestionsIndex + 1;
        gameSlice.dispatch({
            type: 'changeActiveTip',
            payload: { newAskedQuestionsIndex },
        });
    };

    return (
        <div className="h-fit bg-white rounded-xl p-2 relative">
            <div>
                <Zoom in={mounted}>
                    <h1 className="text-xl mb-4 text-slate-400">{'Dica: '}</h1>
                </Zoom>
                <Zoom
                    in={mounted}
                    style={{ transitionDelay: mounted ? `500ms` : '0ms' }}
                >
                    <h1 className="text-xl max-w-md">
                        {currentCard.tips[state.currentQuestionIndex]}
                    </h1>
                </Zoom>
            </div>
            <div className="absolute px-4 right-0 top-4">
                <button
                    onClick={() => changeTip('back')}
                    disabled={!canGoBack}
                    className="disabled:opacity-10 hover:enabled:bg-slate-200 rounded-full"
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={() => changeTip('forward')}
                    disabled={!canGoForward}
                    className="disabled:opacity-10 hover:enabled:bg-slate-200 rounded-full"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
