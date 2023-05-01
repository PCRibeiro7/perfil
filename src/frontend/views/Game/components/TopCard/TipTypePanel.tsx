import CustomZoom from '@/frontend/components/CustomZoom';
import { gameSlice } from '@/frontend/slices/game';
import { useEffect, useState } from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import { IconButton } from '@mui/material';
import { IGameActions } from '@/frontend/models/game/IGameActions';

export default function TipTypePanel() {
    const [mounted, setMounted] = useState(false);
    const state = gameSlice.use();
    const currentCard = state.cards[state.currentCardIndex];

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 1000);
    }, []);

    const showCardStats = () => {
        gameSlice.dispatch({
            type: IGameActions.SET_SHOW_CARD_STATS,
            payload: true,
        });
    };

    return (
        <div className="p-2 flex justify-between">
            <div>
                <CustomZoom shouldStart={mounted}>
                    <h1 className="text-xl text-slate-400">
                        {'Sou um(a) ... '}
                    </h1>
                </CustomZoom>
                <CustomZoom
                    shouldStart={mounted}
                    style={{ transitionDelay: mounted ? `500ms` : '0ms' }}
                >
                    <h1 className="text-3xl mt-2">{currentCard.type}</h1>
                </CustomZoom>
            </div>
            <div onClick={showCardStats}>
                <IconButton>
                    <BarChartIcon />
                </IconButton>
            </div>
        </div>
    );
}
