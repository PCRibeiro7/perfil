import GuessComponent from './components/BottomCard/GuessComponent';
import GuessOptions from './components/BottomCard/GuessOptions';
import TipPanel from './components/TopCard/TipPanel';
import TipTypePanel from './components/TopCard/TipTypePanel';
import { Slide } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Game(): JSX.Element {
    const [slides, setSlides] = useState({ first: false, second: false });

    useEffect(() => {
        setSlides({ first: true, second: false });
        setTimeout(() => {
            setSlides({ first: true, second: true });
        }, 4000);
    }, []);

    return (
        <main className="flex justify-center min-h-screen bg-slate-200">
            <div className="justify-between flex flex-col p-3 w-[30rem] max-w-full sm:p-2">
                <Slide direction="up" in={slides.first} timeout={1000}>
                    <div className="bg-white flex flex-col p-6 rounded-lg border-b-2 border-slate-200">
                        <TipTypePanel />
                        <TipPanel />
                    </div>
                </Slide>
                <Slide
                    direction="up"
                    in={slides.second}
                    timeout={1000}
                    mountOnEnter
                    unmountOnExit
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
