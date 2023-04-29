import { useDelay } from '@/hooks/useDelay';
import ICurrentPage from '@/models/game/ICurrentPage';
import { IGameActions } from '@/models/game/IGameActions';
import { gameSlice } from '@/slices/game';
import { sessionSlice } from '@/slices/session';
import { Zoom } from '@mui/material';

import Typewriter from 'typewriter-effect';

const instructions = [
    'Descubra a palavra secreta',
    'Pode ser uma coisa, pessoa, lugar ou ano',
    'Use suas dicas com sabedoria',
    'Use o mínimo de dicas e palpites errados para ganhar mais pontos',
    'Boa sorte!',
];

export default function Home(): JSX.Element {
    const isReady = useDelay(2000);
    const session = sessionSlice.use();
    const startGame = () => {
        gameSlice.dispatch({
            type: IGameActions.CHANGE_PAGE,
            payload: { page: ICurrentPage.GAME },
        });
    };
    return (
        <main className="flex flex-col justify-evenly items-center h-screen bg-slate-200 center">
            <h1 className="text-6xl text-black text-center">
                Adivinha quem é?
            </h1>
            <div className="max-w-xs text-center h-56">
                <div className="bg-white p-2 rounded-xl">
                    <Typewriter
                        options={{
                            strings: [
                                `Olá, ${session.user.name}`,
                                ...instructions,
                            ],
                            autoStart: true,
                            loop: true,
                            wrapperClassName: 'text-3xl',
                            deleteSpeed: 5,
                        }}
                    />
                </div>
            </div>
            <Zoom in={isReady} timeout={1000}>
                <button
                    onClick={startGame}
                    className="bg-black p-2 rounded-xl w-40  hover:bg-slate-600"
                >
                    <h1 className="text-3xl text-white">Jogar</h1>
                </button>
            </Zoom>
        </main>
    );
}
