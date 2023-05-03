import CustomButton from '@/frontend/components/CustomButton';
import CustomZoom from '@/frontend/components/CustomZoom';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { gameSlice } from '@/frontend/slices/game';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';

type TipPanelProps = {
    currentQuestionIndex: number;
    currentCard: any;
    changeTip: (direction: 'back' | 'forward') => void;
    canGoBack: boolean;
    canGoForward: boolean;
};
export default function TipPanel() {
    const [mounted, setMounted] = useState(false);
    const game = gameSlice.use();

    const currentCard = game.cards[game.currentCardIndex];
    const askedQuestionsIndex = game.askedQuestions.indexOf(
        game.currentQuestionIndex,
    );
    const canGoForward =
        game.askedQuestions[askedQuestionsIndex + 1] !== undefined;
    const canGoBack =
        game.askedQuestions[askedQuestionsIndex - 1] !== undefined;

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 2000);
    }, []);

    const changeTip = (direction: 'back' | 'forward') => {
        const askedQuestionsIndex = game.askedQuestions.indexOf(
            game.currentQuestionIndex,
        );
        const newAskedQuestionsIndex =
            direction === 'back'
                ? askedQuestionsIndex - 1
                : askedQuestionsIndex + 1;
        gameSlice.dispatch({
            type: IGameActions.CHANGE_ACTIVE_TIP,
            payload: { newAskedQuestionsIndex },
        });
    };

    return (
        <div className="h-fit bg-white rounded-xl p-2 relative">
            <div>
                <CustomZoom shouldStart={mounted}>
                    <div className="flex justify-between items-end">
                        <h1 className="text-xl mb-4 text-slate-400 sm:text-lg">
                            {'Dica: '}
                        </h1>
                        <div className="mb-4">
                            <CustomButton
                                onClick={() => {
                                    changeTip('back');
                                }}
                                disabled={!canGoBack}
                                className="disabled:opacity-10 hover:enabled:bg-slate-200 rounded-full h-10 w-10"
                            >
                                <ChevronLeft />
                            </CustomButton>
                            <CustomButton
                                onClick={() => {
                                    changeTip('forward');
                                }}
                                disabled={!canGoForward}
                                className="disabled:opacity-10 hover:enabled:bg-slate-200 rounded-full h-10 w-10"
                            >
                                <ChevronRight />
                            </CustomButton>
                        </div>
                    </div>
                </CustomZoom>
                <CustomZoom
                    shouldStart={mounted}
                    style={{ transitionDelay: mounted ? `500ms` : '0ms' }}
                >
                    <h1 className="text-xl max-w-md sm:text-base">
                        {currentCard.tips[game.currentQuestionIndex]}
                    </h1>
                </CustomZoom>
            </div>
        </div>
    );
}
