import { useEffect, useState } from 'react';
import { gameSlice } from '@/slices/game';
import { IGameActions } from '@/models/game/IGameActions';
import CustomZoom from '@/components/CustomZoom';
import useSound from 'use-sound';
import { GLOBAL_VOLUME } from '@/utils/consts';

export default function GuessOptions() {
    const [play] = useSound('/sounds/tip.mp3', { volume: GLOBAL_VOLUME });
    const [mounted, setMounted] = useState(false);
    const [playHoverSound] = useSound('/sounds/hover.mp3', {
        volume: GLOBAL_VOLUME,
    });

    const state = gameSlice.use();
    const currentCard = state.cards[state.currentCardIndex];

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 1000);
    }, []);

    const handleClickonGuessOption = (index: number) => {
        play();
        gameSlice.dispatch({
            type: IGameActions.HANDLE_CLICK_ON_TIP_OPTION,
            payload: { index },
        });
    };

    return (
        <div className="rounded-xl p-2">
            <h1 className="text-xl mb-4 text-slate-400">Dicas disponíveis:</h1>
            <div className="grid grid-cols-3 gap-2 sm:block sm:overflow-auto sm:whitespace-nowrap">
                {[...Array(currentCard.tips.length).keys()].map(
                    (question, index) => (
                        <CustomZoom
                            shouldStart={mounted}
                            key={question}
                            style={{
                                transitionDelay: mounted
                                    ? `${300 * index}ms`
                                    : '0ms',
                            }}
                        >
                            <button
                                onMouseEnter={() => playHoverSound()}
                                onClick={e => handleClickonGuessOption(index)}
                                className="w-full h-12 justify-self-center rounded-md bg-slate-950 disabled:bg-slate-200 hover:bg-slate-600 sm:rounded-full sm:w-12 sm:mx-1"
                                disabled={state.askedQuestions.includes(index)}
                            >
                                <h1 className="text-xl text-white">
                                    {index + 1}
                                </h1>
                            </button>
                        </CustomZoom>
                    ),
                )}
            </div>
        </div>
    );
}
