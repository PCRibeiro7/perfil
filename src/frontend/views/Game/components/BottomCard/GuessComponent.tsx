import axiosInstance from '@/frontend/client';
import CustomButton from '@/frontend/components/CustomButton';
import CustomZoom from '@/frontend/components/CustomZoom';
import { useDelay } from '@/frontend/hooks/useDelay';
import ICurrentPage from '@/frontend/models/game/ICurrentPage';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { ISessionAction } from '@/frontend/models/session/ISessionAction';
import { gameSlice } from '@/frontend/slices/game';
import { sessionSlice } from '@/frontend/slices/session';
import { CardStatsType } from '@/shared/models/CardStatsType';
import calculateScore from '@/utils/calculateScore';
import { MINIMUN_SIMILARITY } from '@/utils/consts';
import { useEffect, useState } from 'react';
import stringSimilarity from 'string-similarity';
import useSound from 'use-sound';

export default function GuessComponent() {
    const game = gameSlice.use();
    const session = sessionSlice.use();
    const [shake, setShake] = useState(false);

    const [playWrongSound] = useSound('/sounds/wrongAnswer.wav', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });
    const [playCorrectSound] = useSound('/sounds/success.wav', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });
    const [playSkipSound] = useSound('/sounds/skip.wav', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });

    const currentCard = game.cards[game.currentCardIndex];
    const mounted = useDelay(1500 + currentCard.tips.length * 300);

    useEffect(() => {
        if (game.wrongAnswers > 0) {
            setShake(true);
            setTimeout(() => {
                setShake(false);
            }, 1000);
        }
    }, [game.wrongAnswers]);

    const skipQuestion = async () => {
        playSkipSound();
        const { data: user } = await axiosInstance.put(
            `/api/users/${session.user.id}`,
            {
                skippedCardIds: [currentCard.id],
            },
        );
        await axiosInstance.put(`/api/cardStats`, {
            cardId: currentCard.id,
            type: CardStatsType.SKIPPED,
        });
        sessionSlice.dispatch({
            type: ISessionAction.SET_USER,
            payload: user,
        });
        gameSlice.dispatch({
            type: IGameActions.CHANGE_PAGE,
            payload: { page: ICurrentPage.FAILURE },
        });
    };

    const handleQuestionAnswered = async (event: any) => {
        event.preventDefault();
        const value: string = event.target.answer.value || '';
        if (
            stringSimilarity.compareTwoStrings(
                value.toLowerCase(),
                currentCard.answer.toLowerCase(),
            ) > MINIMUN_SIMILARITY
        ) {
            playCorrectSound();
            const { data: user } = await axiosInstance.put(
                `/api/users/${session.user.id}`,
                {
                    correctCardIds: [currentCard.id],
                    score: (session.user.score || 0) + calculateScore(game),
                },
            );
            sessionSlice.dispatch({
                type: ISessionAction.SET_USER,
                payload: user,
            });
            await axiosInstance.put(`/api/cardStats`, {
                cardId: currentCard.id,
                type: CardStatsType.CORRECT,
            });
            gameSlice.dispatch({
                type: IGameActions.CHANGE_PAGE,
                payload: { page: ICurrentPage.SUCCESS },
            });
        } else {
            playWrongSound();
            gameSlice.dispatch({
                type: IGameActions.HANDLE_QUESTION_ANSWERED_WRONG,
            });
        }
        event.target.reset();
    };

    return (
        <div className="self-center bg-white rounded-xl w-full p-6 flex flex-col items-center">
            <form
                onSubmit={handleQuestionAnswered}
                className="w-full"
                autoComplete="off"
            >
                <CustomZoom shouldStart={mounted}>
                    <input
                        type="text"
                        name="answer"
                        placeholder="Digite seu palpite aqui..."
                        className="text-center w-full h-10 text-xl border-2 border-slate-200 rounded-xl mb-2 placeholder:text-slate-400"
                    />
                </CustomZoom>
                <CustomZoom
                    shouldStart={mounted}
                    style={{ transitionDelay: mounted ? `500ms` : '0ms' }}
                >
                    <div>
                        <CustomButton
                            className={`w-full h-10 bg-slate-950 rounded-xl hover:bg-slate-600 ${
                                shake ? 'shake' : ''
                            }`}
                        >
                            <h1 className="text-xl text-white">
                                {'Responder'}
                            </h1>
                        </CustomButton>
                    </div>
                </CustomZoom>
            </form>
            <CustomZoom
                shouldStart={mounted}
                style={{
                    transitionDelay: mounted ? `1500ms` : '0ms',
                }}
                mountOnEnter
                unmountOnExit
            >
                <div className="w-full">
                    <CustomButton
                        className={`w-full h-10 bg-slate-300 rounded-xl hover:bg-slate-200 mt-2`}
                        onClick={skipQuestion}
                    >
                        <h1 className="text-xl text-black">{'Pular'}</h1>
                    </CustomButton>
                </div>
            </CustomZoom>
            <CustomZoom
                shouldStart={mounted}
                style={{ transitionDelay: mounted ? `1500ms` : '0ms' }}
            >
                <div className="mt-4 text-center">
                    <h1 className="text-slate-400">
                        {' '}
                        Palpites Errados: {game.wrongAnswers}
                    </h1>
                    <h1 className="text-slate-400">
                        {' '}
                        Dicas Usadas: {game.usedTips}
                    </h1>
                </div>
            </CustomZoom>
        </div>
    );
}
