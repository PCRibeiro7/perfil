import ICurrentPage from '@/models/ICurrentPage';
import { IGameActions } from '@/models/IGameActions';
import { gameSlice } from '@/slices/game';
import { Zoom } from '@mui/material';

export default function Home(): JSX.Element {
    const state = gameSlice.use();

    const startGame = () => {
        gameSlice.dispatch({ type: IGameActions.START_GAME });
        gameSlice.dispatch({
            type: IGameActions.CHANGE_PAGE,
            payload: { page: ICurrentPage.GAME },
        });

        setTimeout(() => {
            gameSlice.dispatch({ type: IGameActions.SLIDE_SECOND_CARD });
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
