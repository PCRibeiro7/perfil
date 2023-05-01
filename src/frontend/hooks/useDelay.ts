import { useEffect, useState } from 'react';

export function useDelay(timeInSeconds: number, shouldStartTimer = true) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!shouldStartTimer) return;
        setTimeout(() => {
            setIsReady(true);
        }, timeInSeconds);
    }, [timeInSeconds, shouldStartTimer]);

    return isReady;
}
