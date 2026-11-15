import axiosInstance from '@/frontend/client';
import { mutateUser } from '@/frontend/client/userMutations';
import CustomButton from '@/frontend/components/CustomButton';
import Icon from '@/frontend/components/Icon';
import ICurrentPage from '@/frontend/models/game/ICurrentPage';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { ISessionAction } from '@/frontend/models/session/ISessionAction';
import { gameSlice } from '@/frontend/slices/game';
import { sessionSlice } from '@/frontend/slices/session';
import { CardStatsType } from '@/shared/models/CardStatsType';
import calculateScore from '@/utils/calculateScore';
import { MINIMUN_SIMILARITY } from '@/utils/consts';
import { FormEvent, useEffect, useRef, useState } from 'react';
import stringSimilarity from 'string-similarity';
import useSound from 'use-sound';

export default function GuessComponent() {
    const game = gameSlice.use();
    const { user } = sessionSlice.use();
    const card = game.cards[game.currentCardIndex];
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [saving, setSaving] = useState(false);
    const busy = useRef(false);
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    const [playWrong] = useSound('/sounds/wrongAnswer.wav', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });
    const [playSuccess] = useSound('/sounds/success.wav', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });
    const [playSkip] = useSound('/sounds/skip.wav', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });
    const finish = async (skip: boolean) => {
        if (busy.current) return;
        busy.current = true;
        setSaving(true);
        setFeedback('');
        try {
            const { data } = await mutateUser(
                user.id,
                skip
                    ? { skippedCardIds: [card.id] }
                    : {
                          correctCardIds: [card.id],
                          score: (user.score || 0) + calculateScore(game),
                      },
            );
            sessionSlice.dispatch({
                type: ISessionAction.SET_USER,
                payload: data,
            });
            // Card analytics must not prevent an already saved answer from completing.
            await axiosInstance
                .put('/api/cardStats', {
                    cardId: card.id,
                    type: skip ? CardStatsType.SKIPPED : CardStatsType.CORRECT,
                })
                .catch(() => undefined);
            skip ? playSkip() : playSuccess();
            if (!mounted.current) return;
            gameSlice.dispatch({
                type: IGameActions.CHANGE_PAGE,
                payload: {
                    page: skip ? ICurrentPage.FAILURE : ICurrentPage.SUCCESS,
                },
            });
        } catch {
            if (mounted.current)
                setFeedback(
                    'Não foi possível salvar a jogada. Sua resposta continua aqui. Tente novamente.',
                );
        } finally {
            busy.current = false;
            if (mounted.current) setSaving(false);
        }
    };
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (busy.current || !answer.trim()) return;
        if (
            stringSimilarity.compareTwoStrings(
                answer.trim().toLowerCase(),
                card.answer.toLowerCase(),
            ) > MINIMUN_SIMILARITY
        ) {
            finish(false);
        } else {
            playWrong();
            setFeedback('Ainda não! Conecte mais uma pista e tente de novo.');
            gameSlice.dispatch({
                type: IGameActions.HANDLE_QUESTION_ANSWERED_WRONG,
            });
        }
    };
    return (
        <div className="guess-section">
            <form onSubmit={submit} autoComplete="off">
                <label className="input-label" htmlFor="answer">
                    Já sabe o que é?
                </label>
                <input
                    id="answer"
                    className={`text-input answer-input ${
                        feedback ? 'has-feedback' : ''
                    }`}
                    name="answer"
                    value={answer}
                    onChange={event => {
                        setAnswer(event.target.value);
                        setFeedback('');
                    }}
                    placeholder="Digite seu palpite..."
                    autoComplete="off"
                    disabled={saving}
                    aria-describedby={feedback ? 'guess-feedback' : undefined}
                    required
                />
                <div className="guess-feedback" aria-live="polite">
                    {feedback && <p id="guess-feedback">{feedback}</p>}
                </div>
                <CustomButton
                    type="submit"
                    className="button button-primary answer-button"
                    disabled={saving || !answer.trim() || !user.id}
                >
                    {saving ? 'Salvando...' : 'É esse o meu palpite'}
                    <Icon name="arrow" width="20" />
                </CustomButton>
            </form>
            <div className="guess-footer">
                <span>
                    {game.wrongAnswers === 0
                        ? 'Confie na sua intuição.'
                        : `${game.wrongAnswers} palpite${
                              game.wrongAnswers > 1 ? 's' : ''
                          } errado${game.wrongAnswers > 1 ? 's' : ''} · −${
                              game.wrongAnswers * 2
                          } pts`}
                </span>
                <CustomButton
                    className="text-button muted-button skip-button"
                    disabled={saving || !user.id}
                    onClick={() => finish(true)}
                >
                    Pular carta <Icon name="skip" width="15" />
                </CustomButton>
            </div>
        </div>
    );
}
