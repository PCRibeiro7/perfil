import CustomZoom from '@/frontend/components/CustomZoom';
import { useDelay } from '@/frontend/hooks/useDelay';
import ICurrentPage from '@/frontend/models/game/ICurrentPage';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { gameSlice } from '@/frontend/slices/game';
import { sessionSlice } from '@/frontend/slices/session';
import { filterCardsForUser } from '@/utils/filterCardsForUser';
import { shuffleArray } from '@/utils/shuffleArray';
import Typewriter from 'typewriter-effect';

const instructions = shuffleArray([
    'Descubra a palavra secreta',
    'Pode ser uma coisa, pessoa, lugar ou ano',
    'Use suas dicas com sabedoria',
    'Use o mínimo de dicas e palpites errados para ganhar mais pontos',
]);

export default function Home(): JSX.Element {
    const game = gameSlice.use();
    const session = sessionSlice.use();
    const startButtonIsReady = useDelay(4000);
    const instructionsIsReady = useDelay(1000);

    const startGame = () => {
        gameSlice.dispatch({
            type: IGameActions.FILTER_CARDS,
            payload: filterCardsForUser(game.cards, session.user),
        });
        gameSlice.dispatch({
            type: IGameActions.CHANGE_PAGE,
            payload: { page: ICurrentPage.GAME },
        });
    };
    return (
        <main className="flex flex-col justify-evenly items-center h-screen bg-slate-200 center">
            <CustomZoom shouldStart={true} timeout={1000}>
                <div className="bg-white p-6 rounded-xl max-w-xs">
                    <h1 className="text-6xl">Perfil Online</h1>
                </div>
            </CustomZoom>
            <div className="max-w-xs h-56">
                {instructionsIsReady && (
                    <div className="bg-white p-6 rounded-xl">
                        <Typewriter
                            options={{
                                strings: [
                                    `Olá, ${session.user.name}`,
                                    ...instructions,
                                    'Boa sorte!',
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
            <CustomZoom shouldStart={startButtonIsReady} timeout={1000}>
                <button
                    onClick={startGame}
                    className="bg-black p-2 rounded-xl w-40  hover:bg-slate-600"
                >
                    <h1 className="text-3xl text-white">Jogar</h1>
                </button>
            </CustomZoom>
        </main>
    );
}
