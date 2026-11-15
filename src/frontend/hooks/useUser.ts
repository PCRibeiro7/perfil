import { ISessionAction } from '@/frontend/models/session/ISessionAction';
import { sessionSlice } from '@/frontend/slices/session';
import { User } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../client';

let setupRequest: Promise<User> | undefined;

async function loadUser(): Promise<User> {
    const stored = localStorage.getItem('userId');
    if (stored) {
        try {
            const { data } = await axiosInstance.get<User | null>(
                `/api/users/${stored}`,
            );
            if (data?.id) return data;
        } catch {
            // Keep the saved identity so a temporary outage cannot erase progress.
            throw new Error('connection');
        }
    }
    const { data } = await axiosInstance.post<User>('/api/users');
    if (!data?.id) throw new Error('connection');
    return data;
}

export function useUser() {
    const [error, setError] = useState(false);
    const setUpUser = useCallback(async () => {
        setError(false);
        try {
            if (!setupRequest)
                setupRequest = loadUser().finally(() => {
                    setupRequest = undefined;
                });
            const user = await setupRequest;
            sessionSlice.dispatch({
                type: ISessionAction.SET_USER,
                payload: user,
            });
            localStorage.setItem('userId', user.id);
        } catch {
            setError(true);
        }
    }, []);
    useEffect(() => {
        setUpUser();
    }, [setUpUser]);
    return { error, retry: setUpUser };
}
