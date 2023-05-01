import axiosInstance from '@/frontend/client';
import CustomZoom from '@/frontend/components/CustomZoom';
import { useDelay } from '@/frontend/hooks/useDelay';
import ICurrentPage from '@/frontend/models/game/ICurrentPage';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { ISessionAction } from '@/frontend/models/session/ISessionAction';
import { gameSlice } from '@/frontend/slices/game';
import { sessionSlice } from '@/frontend/slices/session';
import { GLOBAL_VOLUME } from '@/utils/consts';
import { useEffect, useState } from 'react';
import stringSimilarity from 'string-similarity';
import useSound from 'use-sound';

const MINIMUN_SIMILARITY = 0.6;

export default function GuessComponent() {
    const [playWrongSound] = useSound('/sounds/wrongAnswer.mp3', {
        volume: GLOBAL_VOLUME,
    });
    const [playCorrectSound] = useSound('/sounds/success.mp3', {
        volume: GLOBAL_VOLUME,
    });
    const [playSkipSound] = useSound('/sounds/skip.mp3', {
        volume: GLOBAL_VOLUME,
    });
    const [playHoverSound] = useSound('/sounds/hover.mp3', {
        volume: GLOBAL_VOLUME,
    });
    const [shake, setShake] = useState(false);
    const state = gameSlice.use();
    const session = sessionSlice.use();
    const currentCard = state.cards[state.currentCardIndex];
    const mounted = useDelay(1500 + currentCard.tips.length * 300);

    useEffect(() => {
        if (state.wrongAnswers > 0) {
            setShake(true);
            setTimeout(() => {
                setShake(false);
            }, 1000);
        }
    }, [state.wrongAnswers]);

    const skipQuestion = async () => {
        const { data: user } = await axiosInstance.put(
            `/api/users/${session.user.id}`,
            {
                skippedCardIds: [currentCard.id],
            },
        );
        playSkipSound();
        sessionSlice.dispatch({
            type: ISessionAction.SET_USER,
            payload: user,
        });
        gameSlice.dispatch({
            type: IGameActions.SETUP_NEXT_CARD,
            payload: { currentCard },
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
                },
            );
            sessionSlice.dispatch({
                type: ISessionAction.SET_USER,
                payload: user,
            });
            gameSlice.dispatch({
                type: IGameActions.SETUP_NEXT_CARD,
                payload: { currentCard },
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
                        <button
                            onMouseEnter={() => playHoverSound()}
                            className={`w-full h-10 bg-slate-950 rounded-xl hover:bg-slate-600 ${
                                shake ? 'shake' : ''
                            }`}
                        >
                            <h1 className="text-xl text-white">
                                {'Responder'}
                            </h1>
                        </button>
                    </div>
                </CustomZoom>
            </form>
            <CustomZoom
                shouldStart={
                    currentCard.tips.length === state.askedQuestions.length
                }
                style={{
                    transitionDelay:
                        currentCard.tips.length === state.askedQuestions.length
                            ? `500ms`
                            : '0ms',
                }}
                mountOnEnter
                unmountOnExit
            >
                <button
                    onMouseEnter={() => playHoverSound()}
                    className={`w-full h-10 bg-slate-300 rounded-xl hover:bg-slate-200 mt-2`}
                    onClick={skipQuestion}
                >
                    <h1 className="text-xl text-black">{'Pular'}</h1>
                </button>
            </CustomZoom>
            <CustomZoom
                shouldStart={mounted}
                style={{ transitionDelay: mounted ? `1500ms` : '0ms' }}
            >
                <div className="mt-4 text-center">
                    <h1 className="text-slate-400">
                        {' '}
                        Palpites Errados: {state.wrongAnswers}
                    </h1>
                    <h1 className="text-slate-400">
                        {' '}
                        Dicas Usadas: {state.usedTips}
                    </h1>
                </div>
            </CustomZoom>
        </div>
    );
}
