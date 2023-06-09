import axiosInstance from '@/frontend/client';
import { useDelay } from '@/frontend/hooks/useDelay';
import { ISessionAction } from '@/frontend/models/session/ISessionAction';
import { gameSlice } from '@/frontend/slices/game';
import { sessionSlice } from '@/frontend/slices/session';
import { Slide } from '@mui/material';
import { useEffect } from 'react';
import useSound from 'use-sound';
import GuessComponent from './components/BottomCard/GuessComponent';
import GuessOptions from './components/BottomCard/GuessOptions';
import TipPanel from './components/TopCard/TipPanel';
import TipTypePanel from './components/TopCard/TipTypePanel';
import { CardStatsType } from '@/shared/models/CardStatsType';
import { CardStats } from './components/CardStats';
import SoundController from '@/frontend/components/SoundController';

export default function Game(): JSX.Element {
    const secondSlideReady = useDelay(1000);
    const game = gameSlice.use();
    const session = sessionSlice.use();
    const currentCard = game.cards[game.currentCardIndex];
    const [playSound] = useSound('/sounds/slide.wav', {
        interrupt: true,
        volume: game.sound.masterVolume * 0.5,
        soundEnabled: !game.sound.isMuted,
    });

    const markCardAsSeen = async (cardId: string, userId: string) => {
        const { data: user } = await axiosInstance.put(`/api/users/${userId}`, {
            seenCardIds: [cardId],
        });
        await axiosInstance.put(`/api/cardStats`, {
            cardId,
            type: CardStatsType.SEEN,
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
        <main className="flex justify-center min-h-screen bg-slate-200  relative">
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
                <CardStats cardId={currentCard.id} />
            </div>
            <SoundController />
        </main>
    );
}
