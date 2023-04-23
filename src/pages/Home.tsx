import { Zoom } from '@mui/material';

interface IHomeProps {
    startGame: () => void;
}

export default function Home({ startGame }: IHomeProps): JSX.Element {
    return (
        <main className="flex justify-center items-center h-screen bg-slate-100">
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
