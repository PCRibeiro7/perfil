import { Fab } from '@mui/material';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { gameSlice } from '../slices/game';
import { IGameActions } from '../models/game/IGameActions';
import useSound from 'use-sound';
export default function SoundController() {
    const game = gameSlice.use();

    const [playHover] = useSound('/sounds/hover.mp3', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });
    const [playClickSound] = useSound('/sounds/tip.wav', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });

    const toggleMute = () => {
        playClickSound();
        gameSlice.dispatch({
            type: IGameActions.SET_SOUND_DATA,
            payload: {
                ...game.sound,
                isMuted: !game.sound.isMuted,
            },
        });
    };

    return (
        <Fab
            onClick={toggleMute}
            sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                color: 'black',
                backgroundColor: 'white',
            }}
            onMouseEnter={() => playHover()}
        >
            {game.sound.isMuted ? <VolumeOffIcon /> : <VolumeMuteIcon />}
        </Fab>
    );
}
