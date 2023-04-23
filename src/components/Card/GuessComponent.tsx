import { Zoom } from '@mui/material';
import { useEffect, useState } from 'react';

interface GuessComponentProps {
    handleQuestionAnswered: (event: any) => void;
    wrongAnswers: number;
    usedTips: number;
}
export default function GuessComponent({
    handleQuestionAnswered,
    wrongAnswers,
    usedTips,
}: GuessComponentProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 5000);
    }, []);

    return (
        <div className="self-center bg-white rounded-xl w-full p-3 flex flex-col items-center">
            <form
                onSubmit={handleQuestionAnswered}
                className="w-full"
                autoComplete="off"
            >
                <Zoom in={mounted}>
                    <input
                        type="text"
                        name="answer"
                        placeholder="Digite seu palpite aqui..."
                        className="text-center w-full h-10 text-xl border-slate-600 rounded-xl mb-2 placeholder:text-slate-500"
                    />
                </Zoom>
                <Zoom
                    in={mounted}
                    style={{ transitionDelay: mounted ? `500ms` : '0ms' }}
                >
                    <div>
                        <button className="w-full h-10 bg-slate-950 rounded-xl hover:bg-slate-600">
                            <h1 className="text-xl text-white">
                                {'Responder'}
                            </h1>
                        </button>
                    </div>
                </Zoom>
            </form>
            <Zoom
                in={mounted}
                style={{ transitionDelay: mounted ? `1500ms` : '0ms' }}
            >
                <div className="mt-4">
                    <h1 className="text-slate-400">
                        {' '}
                        Palpites Errados: {wrongAnswers}
                    </h1>
                    <h1 className="text-slate-400">
                        {' '}
                        Dicas Usadas: {usedTips}
                    </h1>
                </div>
            </Zoom>
        </div>
    );
}
