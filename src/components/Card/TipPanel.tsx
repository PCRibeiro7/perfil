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
export default function TipPanel({
    currentCard,
    currentQuestionIndex,
    changeTip,
    canGoBack,
    canGoForward,
}: TipPanelProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 2000);
    }, []);

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
                        {currentCard.tips[currentQuestionIndex]}
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
