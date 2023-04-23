import { Zoom } from '@mui/material';
import { IState } from '.';

interface ISuccessProps {
    setState: React.Dispatch<React.SetStateAction<IState>>;
    startGame: () => void;
}

export default function Sucess({
    setState,
    startGame,
}: ISuccessProps): JSX.Element {
    return (
        <div className='h-screen bg-slate-100'>
            <Zoom in={true} timeout={1000}>
                <div className="flex flex-col justify-center items-center h-screen">
                    <div>
                        <h1 className="text-5xl text-center mb-8">
                            Acertou! Parabéns!
                        </h1>
                    </div>
                    <button
                        onClick={() => {
                            setState(state => ({
                                ...state,
                                showQuestionAnsweredPage: false,
                                slides: { ...state.slides, first: true },
                            }));
                            setTimeout(() => {
                                setState(state => ({
                                    ...state,
                                    slides: { ...state.slides, second: true },
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
