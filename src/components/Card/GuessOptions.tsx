import { useEffect, useState } from 'react';
import { gameSlice } from '@/slices/game';
import { IGameActions } from '@/slices/game/models';
import { Zoom } from '@mui/material';

type GuessOptionsProps = {
    askedQuestions: number[];
    handleClickonGuessOption: (index: number) => void;
    currentCard: any;
};

export default function GuessOptions() {
    const [mounted, setMounted] = useState(false);
    const state = gameSlice.use();
    const currentCard = state.cards[state.currentCardIndex];

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 1000);
    }, []);

    const handleClickonGuessOption = (index: number) => {
        gameSlice.dispatch({
            type: IGameActions.HANDLE_CLICK_ON_GUESS_OPTION,
            payload: { index },
        });
    };

    return (
        <div className="rounded-xl p-2">
            <h1 className="text-xl mb-4 text-slate-400">Dicas disponíveis:</h1>
            <div className="grid grid-cols-3 gap-2 sm:block sm:overflow-auto sm:whitespace-nowrap">
                {[...Array(currentCard.tips.length).keys()].map(
                    (question, index) => (
                        <Zoom
                            in={mounted}
                            key={question}
                            style={{
                                transitionDelay: mounted
                                    ? `${300 * index}ms`
                                    : '0ms',
                            }}
                        >
                            <button
                                onClick={e => handleClickonGuessOption(index)}
                                className="w-full h-12 justify-self-center rounded-md bg-slate-950 disabled:bg-slate-200 hover:bg-slate-600 sm:rounded-full sm:w-12 sm:mx-1"
                                disabled={state.askedQuestions.includes(index)}
                            >
                                <h1 className="text-xl text-white">
                                    {index + 1}
                                </h1>
                            </button>
                        </Zoom>
                    ),
                )}
            </div>
        </div>
    );
}
