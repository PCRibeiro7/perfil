import { Zoom } from '@mui/material';
import { IState } from '../../pages';

interface ISuccessProps {
    state: IState;
    setState: React.Dispatch<React.SetStateAction<IState>>;
}

export default function Sucess({
    state,
    setState,
}: ISuccessProps): JSX.Element {
    return (
        <div className="h-screen bg-slate-100">
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
                            setState(state => ({
                                ...state,
                                showSuccessPage: false,
                                cardSlides: {
                                    ...state.cardSlides,
                                    first: true,
                                },
                            }));
                            setTimeout(() => {
                                setState(state => ({
                                    ...state,
                                    cardSlides: {
                                        ...state.cardSlides,
                                        second: true,
                                    },
                                }));
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
