import { gameSlice } from '../slices/game';

export default function Loading() {
    const game = gameSlice.use();
    if (!game.loading) return null;
    return (
        <div className="loading-indicator" role="status">
            <span className="loading-dot" aria-hidden="true" />
            Só um instante...
        </div>
    );
}
