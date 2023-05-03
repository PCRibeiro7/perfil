import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { gameSlice } from '@/frontend/slices/game';
import CustomZoom from '@/frontend/components/CustomZoom';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import CustomButton from '@/frontend/components/CustomButton';

export default function GuessOptions() {
    const game = gameSlice.use();
    const [mounted, setMounted] = useState(false);

    const [play] = useSound('/sounds/tip.wav', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });

    const currentCard = game.cards[game.currentCardIndex];

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
            <div className="grid grid-cols-3 gap-2 sm:flex sm:overflow-auto sm:whitespace-nowrap sm:gap-0">
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
                            <div>
                                <CustomButton
                                    onClick={() =>
                                        handleClickonGuessOption(index)
                                    }
                                    className="w-full h-12 justify-self-center rounded-md bg-slate-950 disabled:bg-slate-200 hover:bg-slate-600 sm:rounded-full sm:w-12 sm:mx-1"
                                    disabled={game.askedQuestions.includes(
                                        index,
                                    )}
                                >
                                    <h1 className="text-xl text-white">
                                        {index + 1}
                                    </h1>
                                </CustomButton>
                            </div>
                        </CustomZoom>
                    ),
                )}
            </div>
        </div>
    );
}
