import axiosInstance from '@/frontend/client';
import { mutateUser } from '@/frontend/client/userMutations';
import AppShell from '@/frontend/components/AppShell';
import AppDialog from '@/frontend/components/AppDialog';
import CustomButton from '@/frontend/components/CustomButton';
import Icon from '@/frontend/components/Icon';
import { ISessionAction } from '@/frontend/models/session/ISessionAction';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import ICurrentPage from '@/frontend/models/game/ICurrentPage';
import { gameSlice } from '@/frontend/slices/game';
import { sessionSlice } from '@/frontend/slices/session';
import { useEffect, useState } from 'react';
import GuessComponent from './components/BottomCard/GuessComponent';
import GuessOptions from './components/BottomCard/GuessOptions';
import TipPanel from './components/TopCard/TipPanel';
import TipTypePanel from './components/TopCard/TipTypePanel';
import { CardStatsType } from '@/shared/models/CardStatsType';
import { CardStats } from './components/CardStats';
import calculateScore from '@/utils/calculateScore';

const pendingSeenCards = new Set<string>();

export default function Game(): JSX.Element {
    const game = gameSlice.use();
    const { user } = sessionSlice.use();
    const [exitOpen, setExitOpen] = useState(false);
    const currentCard = game.cards[game.currentCardIndex];
    useEffect(() => {
        if (!currentCard || !user.id) return;
        const key = `${user.id}:${currentCard.id}`;
        if (pendingSeenCards.has(key)) return;
        pendingSeenCards.add(key);
        const record = async () => {
            try {
                const { data } = await mutateUser(user.id, {
                    seenCardIds: [currentCard.id],
                });
                sessionSlice.dispatch({
                    type: ISessionAction.SET_USER,
                    payload: data,
                });
                await axiosInstance.put('/api/cardStats', {
                    cardId: currentCard.id,
                    type: CardStatsType.SEEN,
                });
            } catch {
                // A statistics outage must not prevent playing the card.
            } finally {
                pendingSeenCards.delete(key);
            }
        };
        record();
    }, [currentCard, user.id]);
    const goHome = () =>
        gameSlice.dispatch({
            type: IGameActions.CHANGE_PAGE,
            payload: { page: ICurrentPage.HOME },
        });
    if (!currentCard)
        return (
            <AppShell>
                <main id="main-content" className="page-width empty-game">
                    <h1>Nenhuma carta por aqui.</h1>
                    <p>Escolha suas categorias e comece uma nova partida.</p>
                    <CustomButton
                        className="button button-primary"
                        onClick={goHome}
                    >
                        Voltar ao início
                    </CustomButton>
                </main>
            </AppShell>
        );
    return (
        <AppShell
            navigation={
                <button
                    className="nav-button"
                    disabled={game.loading}
                    onClick={() => setExitOpen(true)}
                >
                    <Icon name="back" width="18" /> Voltar ao início
                </button>
            }
        >
            <main id="main-content" className="page-width game-main">
                <div className="game-topline">
                    <div>
                        <span className="section-kicker">
                            CONECTE AS PISTAS
                        </span>
                        <h1>Qual é o perfil?</h1>
                    </div>
                    <div className="game-progress">
                        <span>
                            Carta{' '}
                            <strong>
                                {String(game.currentCardIndex + 1).padStart(
                                    2,
                                    '0',
                                )}
                            </strong>{' '}
                            de {game.cards.length}
                        </span>
                        <div className="progress-track">
                            <span
                                style={{
                                    width: `${
                                        ((game.currentCardIndex + 1) /
                                            game.cards.length) *
                                        100
                                    }%`,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="game-layout">
                    <section
                        className="clue-card"
                        aria-label="Carta e dica atual"
                    >
                        <TipTypePanel />
                        <TipPanel />
                        <div className="clue-card-footer">
                            <span>perfil.</span>
                            <span>Uma pista de cada vez.</span>
                            <Icon name="sparkles" />
                        </div>
                    </section>
                    <section
                        className="play-panel"
                        aria-label="Dicas e palpite"
                    >
                        <GuessOptions />
                        <GuessComponent key={currentCard.id} />
                    </section>
                </div>
                <div className="game-bottomline">
                    <span>
                        <Icon name="bulb" width="17" /> A primeira dica é
                        grátis. Cada nova dica custa 5 pontos.
                    </span>
                    <span>
                        Esta carta vale até{' '}
                        <strong>{calculateScore(game)} pontos</strong>
                    </span>
                </div>
                <CardStats cardId={currentCard.id} />
            </main>
            <AppDialog
                open={exitOpen}
                onClose={() => setExitOpen(false)}
                title="Fazer uma pausa?"
                description="Seus pontos conquistados continuam salvos. Ao voltar, você poderá começar uma nova partida."
                icon="back"
            >
                <div className="dialog-actions">
                    <CustomButton
                        className="button button-outline"
                        onClick={() => setExitOpen(false)}
                    >
                        Continuar jogando
                    </CustomButton>
                    <CustomButton
                        className="button button-primary"
                        onClick={goHome}
                    >
                        Voltar ao início
                    </CustomButton>
                </div>
            </AppDialog>
        </AppShell>
    );
}
