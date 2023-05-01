import CustomZoom from '@/frontend/components/CustomZoom';
import { useDelay } from '@/frontend/hooks/useDelay';
import ICurrentPage from '@/frontend/models/game/ICurrentPage';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { gameSlice } from '@/frontend/slices/game';
import { sessionSlice } from '@/frontend/slices/session';
import useSound from 'use-sound';

export default function Result({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}): JSX.Element {
    const game = gameSlice.use();
    const session = sessionSlice.use();
    const secondCardIsReady = useDelay(2000);
    const buttonIsReady = useDelay(2000, secondCardIsReady);

    const [playHover] = useSound('/sounds/hover.mp3', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });
    const [playClickSound] = useSound('/sounds/tip.wav', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });

    return (
        <div className="h-screen flex flex-col justify-evenly items-center bg-slate-200">
            <CustomZoom shouldStart={true} timeout={1000}>
                <div className="bg-white p-6 rounded-xl mb-8 min-w-[25%] max-w-[90%]">
                    <h1 className="text-2xl text-slate-400 mb-1">{title}</h1>
                    <h1 className="text-3xl mb-4">{subtitle}</h1>
                    <h1 className="text-5xl">
                        {game.correctAnswers[game.correctAnswers.length - 1]}
                    </h1>
                </div>
            </CustomZoom>
            <CustomZoom shouldStart={secondCardIsReady} timeout={1000}>
                <div className="bg-white p-6 rounded-xl mb-8 min-w-[25%] max-w-[90%]">
                    <div className="flex justify-between">
                        <h1 className="text-2xl text-slate-400">Já acertou:</h1>
                        <h1 className="text-2xl">
                            {session.user.correctCardIds.length} cartas!
                        </h1>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-2xl text-slate-400">Faltam:</h1>
                        <h1 className="text-2xl">
                            {game.cards.length - game.correctAnswers.length}{' '}
                            cartas!
                        </h1>
                    </div>
                </div>
            </CustomZoom>
            <CustomZoom shouldStart={buttonIsReady} timeout={1000}>
                <button
                    onMouseEnter={() => playHover()}
                    onClick={() => {
                        playClickSound();
                        gameSlice.dispatch({
                            type: IGameActions.CHANGE_PAGE,
                            payload: { page: ICurrentPage.GAME },
                        });
                    }}
                    className="bg-black p-2 rounded-xl w-40 hover:bg-slate-600"
                >
                    <h1 className="text-2xl text-white ">Próxima Carta</h1>
                </button>
            </CustomZoom>
        </div>
    );
}
