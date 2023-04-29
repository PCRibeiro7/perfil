import { useEffect, useState } from 'react';

export function useDelay(time: number, after = true) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!after) return;
        setTimeout(() => {
            setIsReady(true);
        }, time);
    }, [time, after]);

    return isReady;
}
