import GuessComponent from './components/GuessComponent';
import GuessOptions from './components/GuessOptions';
import TipPanel from './components/TipPanel';
import TipTypePanel from './components/TipTypePanel';
import { Slide } from '@mui/material';
import { gameSlice } from '@/slices/game';

export default function Card(): JSX.Element {
    const state = gameSlice.use();

    return (
        <main className="flex justify-center min-h-screen bg-slate-200">
            <div className="justify-between flex flex-col p-3 w-[30rem] max-w-full sm:p-2">
                <Slide
                    direction="up"
                    in={state.cardSlides.first}
                    timeout={1000}
                >
                    <div className="bg-white flex flex-col p-6 rounded-lg border-b-2 border-slate-200">
                        <TipTypePanel />
                        <TipPanel />
                    </div>
                </Slide>
                <Slide
                    direction="up"
                    in={state.cardSlides.second}
                    timeout={1000}
                >
                    <div className="bg-white flex flex-col   p-6 rounded-lg">
                        <GuessOptions />
                        <GuessComponent />
                    </div>
                </Slide>
            </div>
        </main>
    );
}
