import { IState } from '@/pages';
import { shuffleArray } from '@/utils/shuffleArray';
import { Zoom } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface IHomeProps {
    setState: Dispatch<SetStateAction<IState>>;
}

export default function Home({ setState }: IHomeProps): JSX.Element {
    const startGame = () => {
        setState(state => ({
            ...state,
            cards: shuffleArray(state.cards),
            gameStarted: true,
            cardSlides: { ...state.cardSlides, first: true },
        }));
        setTimeout(() => {
            setState(state => ({
                ...state,
                cardSlides: { ...state.cardSlides, second: true },
            }));
        }, 4000);
    };
    return (
        <main className="flex justify-center items-center h-screen bg-slate-200">
            <Zoom in={true} timeout={1000}>
                <button
                    onClick={startGame}
                    className="bg-white p-2 rounded-xl w-40"
                >
                    <h1 className="text-3xl ">Jogar</h1>
                </button>
            </Zoom>
        </main>
    );
}
