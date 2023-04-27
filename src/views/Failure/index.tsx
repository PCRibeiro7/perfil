import { IGameActions } from '@/models/IGameActions';
import { gameSlice } from '@/slices/game';
import { Zoom } from '@mui/material';

export default function Failure(): JSX.Element {
    const state = gameSlice.use();

    return (
        <div className="h-screen bg-slate-200">
            <Zoom in={true} timeout={1000}>
                <div className="flex flex-col justify-center items-center h-screen">
                    <div>
                        <h1 className="text-5xl text-center mb-8">
                            Oops!
                            <br />
                            <br />A resposta era:{' '}
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
                                type: IGameActions.HANDLE_FAILURE_PAGE_CLICK,
                            });
                            setTimeout(() => {
                                gameSlice.dispatch({
                                    type: IGameActions.SLIDE_SECOND_CARD,
                                });
                            }, 4000);
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
