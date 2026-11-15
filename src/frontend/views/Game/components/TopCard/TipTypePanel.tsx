import Icon from '@/frontend/components/Icon';
import { gameSlice } from '@/frontend/slices/game';
import { IGameActions } from '@/frontend/models/game/IGameActions';

export default function TipTypePanel() {
    const game = gameSlice.use();
    const card = game.cards[game.currentCardIndex];
    return (
        <div className="clue-card-header">
            <div>
                <span className="section-kicker">SOU UM(A)...</span>
                <h2>{card.type}</h2>
            </div>
            <button
                className="icon-button"
                aria-label="Ver estatísticas desta carta"
                title="Estatísticas da carta"
                onClick={() =>
                    gameSlice.dispatch({
                        type: IGameActions.SET_SHOW_CARD_STATS,
                        payload: true,
                    })
                }
            >
                <Icon name="chart" />
            </button>
        </div>
    );
}
