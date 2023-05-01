import { ISessionAction } from '@/frontend/models/session/ISessionAction';
import { sessionSlice } from '@/frontend/slices/session';
import { User } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect } from 'react';
import axiosInstance from '../client';

export function useUser() {
    const setUpUser = useCallback(async () => {
        let stored = localStorage.getItem('userId');
        let response: AxiosResponse<User>;
        if (!stored) {
            response = await axiosInstance.post('/api/users');
        } else {
            response = await axiosInstance.get('/api/users/' + stored);
        }
        const user = response.data;
        sessionSlice.dispatch({
            type: ISessionAction.SET_USER,
            payload: user,
        });
        localStorage.setItem('userId', user.id);
    }, []);

    useEffect(() => {
        setUpUser();
    }, [setUpUser]);
}
