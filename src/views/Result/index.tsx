import { gameSlice } from '@/slices/game';
import { IGameActions } from '@/models/game/IGameActions';
import ICurrentPage from '@/models/game/ICurrentPage';
import { useDelay } from '@/hooks/useDelay';
import { sessionSlice } from '@/slices/session';
import CustomZoom from '@/components/CustomZoom';

export default function Result({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}): JSX.Element {
    const state = gameSlice.use();
    const session = sessionSlice.use();
    const secondCardIsReady = useDelay(3000);
    const buttonIsReady = useDelay(3000, secondCardIsReady);

    return (
        <div className="h-screen flex flex-col justify-evenly items-center bg-slate-200">
            <CustomZoom shouldStart={true} timeout={1000}>
                <div className="bg-white p-6 rounded-xl mb-8 w-80">
                    <h1 className="text-2xl text-slate-400 mb-1">{title}</h1>
                    <h1 className="text-3xl mb-4">{subtitle}</h1>
                    <h1 className="text-5xl">
                        {state.correctAnswers[state.correctAnswers.length - 1]}
                    </h1>
                </div>
            </CustomZoom>
            <CustomZoom shouldStart={secondCardIsReady} timeout={1000}>
                <div className="bg-white p-6 rounded-xl mb-8 w-80">
                    <div className="flex justify-between">
                        <h1 className="text-2xl text-slate-400">Já acertou:</h1>
                        <h1 className="text-2xl">
                            {session.user.correctCardIds.length} cartas!
                        </h1>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-2xl text-slate-400">Faltam:</h1>
                        <h1 className="text-2xl">
                            {state.cards.length - state.correctAnswers.length}{' '}
                            cartas!
                        </h1>
                    </div>
                </div>
            </CustomZoom>
            <CustomZoom shouldStart={buttonIsReady} timeout={1000}>
                <button
                    onClick={() => {
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
