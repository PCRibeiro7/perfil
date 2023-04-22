import { ChevronLeft, ChevronRight } from '@mui/icons-material';

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
    return (
        <div className="h-fit bg-white rounded-xl p-2 relative">
            <div>
                <h1 className="text-xl mb-4 text-slate-400">{'Dica: '}</h1>
                <h1 className="text-2xl max-w-md">
                    {currentCard.questions[currentQuestionIndex]}
                </h1>
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
