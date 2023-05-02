import useSound from 'use-sound';
import { gameSlice } from '../slices/game';

export default function CustomButton({
    onClick,
    children,
    ...props
}: {
    onClick?: (e?: any) => void;
    children?: JSX.Element;
    props?: any;
    [key: string]: any;
}) {
    const game = gameSlice.use();

    const [playHover] = useSound('/sounds/hover.mp3', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });

    const [playClickSound] = useSound('/sounds/tip.wav', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });

    return (
        <button
            onClick={() => {
                playClickSound();
                if (onClick) onClick();
            }}
            onMouseEnter={() => playHover()}
            {...props}
        >
            {children}
        </button>
    );
}
