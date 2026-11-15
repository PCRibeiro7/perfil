import { gameSlice } from '../slices/game';
import { IGameActions } from '../models/game/IGameActions';
import Icon from './Icon';

export default function SoundController() {
    const game = gameSlice.use();
    const label = game.sound.isMuted ? 'Ativar som' : 'Silenciar som';
    return (
        <button
            type="button"
            className="icon-button sound-button"
            aria-label={label}
            title={label}
            aria-pressed={!game.sound.isMuted}
            onClick={() =>
                gameSlice.dispatch({
                    type: IGameActions.SET_SOUND_DATA,
                    payload: { ...game.sound, isMuted: !game.sound.isMuted },
                })
            }
        >
            <Icon name={game.sound.isMuted ? 'muted' : 'volume'} />
        </button>
    );
}
