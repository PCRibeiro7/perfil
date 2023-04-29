import { Zoom } from '@mui/material';
import { gameSlice } from '@/slices/game';
import { IGameActions } from '@/models/game/IGameActions';
import ICurrentPage from '@/models/game/ICurrentPage';

export default function Sucess(): JSX.Element {
    const state = gameSlice.use();
    return (
        <div className="h-screen bg-slate-200">
            <Zoom in={true} timeout={1000}>
                <div className="flex flex-col justify-center items-center h-screen">
                    <div>
                        <h1 className="text-5xl text-center mb-8">
                            Parabéns!
                            <br />
                            <br />
                            Resposta:{' '}
                            {
                                state.correctAnswers[
                                    state.correctAnswers.length - 1
                                ]
                            }{' '}
                        </h1>
                    </div>
                    <button
                        onClick={() => {
                            gameSlice.dispatch({
                                type: IGameActions.CHANGE_PAGE,
                                payload: { page: ICurrentPage.GAME },
                            });
                        }}
                        className="bg-white p-2 rounded-xl w-40"
                    >
                        <h1 className="text-3xl ">Próxima Carta</h1>
                    </button>
                </div>
            </Zoom>
        </div>
    );
}
