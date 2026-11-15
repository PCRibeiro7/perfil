import { ButtonHTMLAttributes } from 'react';
import useSound from 'use-sound';
import { gameSlice } from '../slices/game';

export default function CustomButton({
    onClick,
    children,
    type = 'button',
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    const game = gameSlice.use();
    const [playClick] = useSound('/sounds/tip.wav', {
        volume: game.sound.masterVolume * 0.2,
        soundEnabled: !game.sound.isMuted,
    });
    return (
        <button
            {...props}
            type={type}
            onClick={event => {
                playClick();
                onClick?.(event);
            }}
        >
            {children}
        </button>
    );
}
