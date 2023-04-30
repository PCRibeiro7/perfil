import { useDelay } from '@/front/hooks/useDelay';
import GuessComponent from './components/BottomCard/GuessComponent';
import GuessOptions from './components/BottomCard/GuessOptions';
import TipPanel from './components/TopCard/TipPanel';
import TipTypePanel from './components/TopCard/TipTypePanel';
import { Slide } from '@mui/material';
import { sessionSlice } from '@/front/slices/session';
import { gameSlice } from '@/front/slices/game';
import { useEffect } from 'react';
import axios from 'axios';
import { ISessionAction } from '@/front/models/session/ISessionAction';
import useSound from 'use-sound';
import { GLOBAL_VOLUME } from '@/utils/consts';

export default function Game(): JSX.Element {
    const [playSound] = useSound('/sounds/slide.mp3', {
        interrupt: true,
        volume: GLOBAL_VOLUME,
    });
    const secondSlideReady = useDelay(4000);
    const game = gameSlice.use();
    const session = sessionSlice.use();
    const currentCard = game.cards[game.currentCardIndex];

    const markCardAsSeen = async (cardId: string, userId: string) => {
        const { data: user } = await axios.put(`/api/users/${userId}`, {
            seenCardIds: [cardId],
        });
        sessionSlice.dispatch({
            type: ISessionAction.SET_USER,
            payload: user,
        });
    };

    useEffect(() => {
        markCardAsSeen(currentCard.id, session.user.id);
    }, [currentCard.id, session.user.id]);

    return (
        <main className="flex justify-center min-h-screen bg-slate-200">
            <div className="justify-between flex flex-col p-3 w-[30rem] max-w-full sm:p-2">
                <Slide
                    direction="up"
                    in={true}
                    timeout={1000}
                    onEntered={() => playSound()}
                >
                    <div className="bg-white flex flex-col p-6 rounded-lg border-b-2 border-slate-200">
                        <TipTypePanel />
                        <TipPanel />
                    </div>
                </Slide>
                <Slide
                    direction="up"
                    in={secondSlideReady}
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
