import { Zoom } from '@mui/material';
import { useEffect, useState } from 'react';

type TipTypePanelProps = {
    currentCard: any;
};
export default function TipTypePanel({ currentCard }: TipTypePanelProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 1000);
    }, []);

    return (
        <div className="bg-white rounded-xl p-2">
            <Zoom in={mounted}>
                <h1 className="text-xl text-slate-400">{'Sou um(a) ... '}</h1>
            </Zoom>
            <Zoom
                in={mounted}
                style={{ transitionDelay: mounted ? `500ms` : '0ms' }}
            >
                <h1 className="text-3xl mt-2">{currentCard.type}</h1>
            </Zoom>
        </div>
    );
}
