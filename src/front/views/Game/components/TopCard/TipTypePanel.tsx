import CustomZoom from '@/front/components/CustomZoom';
import { gameSlice } from '@/front/slices/game';
import { useEffect, useState } from 'react';

export default function TipTypePanel() {
    const [mounted, setMounted] = useState(false);
    const state = gameSlice.use();
    const currentCard = state.cards[state.currentCardIndex];

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 1000);
    }, []);

    return (
        <div className="bg-white rounded-xl p-2">
            <CustomZoom shouldStart={mounted}>
                <h1 className="text-xl text-slate-400">{'Sou um(a) ... '}</h1>
            </CustomZoom>
            <CustomZoom
                shouldStart={mounted}
                style={{ transitionDelay: mounted ? `500ms` : '0ms' }}
            >
                <h1 className="text-3xl mt-2">{currentCard.type}</h1>
            </CustomZoom>
        </div>
    );
}
