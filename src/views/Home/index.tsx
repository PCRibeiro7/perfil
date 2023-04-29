import { useDelay } from '@/hooks/useDelay';
import ICurrentPage from '@/models/game/ICurrentPage';
import { IGameActions } from '@/models/game/IGameActions';
import { gameSlice } from '@/slices/game';
import { sessionSlice } from '@/slices/session';
import { Zoom } from '@mui/material';

import Typewriter from 'typewriter-effect';
import useSound from 'use-sound';

const instructions = [
    'Descubra a palavra secreta',
    'Pode ser uma coisa, pessoa, lugar ou ano',
    'Use suas dicas com sabedoria',
    'Use o mínimo de dicas e palpites errados para ganhar mais pontos',
    'Boa sorte!',
];

export default function Home(): JSX.Element {
    const [playSound] = useSound('/sounds/background.mp3', {
        volume: 0,
    });
    const startButtonIsReady = useDelay(4000);
    const instructionsIsReady = useDelay(1000);
    const session = sessionSlice.use();
    const startGame = () => {
        playSound({});
        gameSlice.dispatch({
            type: IGameActions.CHANGE_PAGE,
            payload: { page: ICurrentPage.GAME },
        });
    };
    return (
        <main className="flex flex-col justify-evenly items-center h-screen bg-slate-200 center">
            <Zoom in={true} timeout={1000}>
                <div className="bg-white p-4 rounded-xl max-w-xs">
                    <h1 className="text-6xl text-black">Perfil Online</h1>
                </div>
            </Zoom>
            <div className="max-w-xs h-56">
                {instructionsIsReady && (
                    <div className="bg-white p-4 rounded-xl">
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
                )}
            </div>
            <Zoom in={startButtonIsReady} timeout={1000}>
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
