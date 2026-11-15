import axiosInstance from '@/frontend/client';
import AppDialog from '@/frontend/components/AppDialog';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { gameSlice } from '@/frontend/slices/game';
import { CardStats as CardStatsData } from '@prisma/client';
import { useEffect, useState } from 'react';

export function CardStats({ cardId }: { cardId: string }) {
    const [stats, setStats] = useState<CardStatsData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [retry, setRetry] = useState(0);
    const game = gameSlice.use();
    useEffect(() => {
        if (!game.showCardStats) return;
        let active = true;
        setStats(null);
        setLoading(true);
        setError(false);
        axiosInstance
            .get('/api/cardStats', { params: { cardId } })
            .then(({ data }) => {
                if (active) setStats(data);
            })
            .catch(() => {
                if (active) setError(true);
            })
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, [cardId, game.showCardStats, retry]);
    return (
        <AppDialog
            open={game.showCardStats}
            onClose={() =>
                gameSlice.dispatch({
                    type: IGameActions.SET_SHOW_CARD_STATS,
                    payload: false,
                })
            }
            title="Esta carta já deu o que pensar."
            description="Veja como outras mentes curiosas se saíram neste desafio."
            icon="chart"
        >
            {loading ? (
                <p className="empty-state" role="status">
                    Buscando estatísticas...
                </p>
            ) : error ? (
                <div className="empty-state">
                    <p role="alert">
                        Não foi possível carregar as estatísticas.
                    </p>
                    <button
                        className="text-button"
                        onClick={() => setRetry(value => value + 1)}
                    >
                        Tentar novamente
                    </button>
                </div>
            ) : !stats ? (
                <p className="empty-state">
                    Você está entre as primeiras pessoas a descobrir esta carta!
                </p>
            ) : (
                <div className="card-stats-grid">
                    <div>
                        <strong>{stats.seenCount}</strong>
                        <span>visualizações</span>
                    </div>
                    <div>
                        <strong>{stats.correctCount}</strong>
                        <span>acertos</span>
                    </div>
                    <div>
                        <strong>{stats.skippedCount}</strong>
                        <span>pularam</span>
                    </div>
                </div>
            )}
        </AppDialog>
    );
}
