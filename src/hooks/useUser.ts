import { ISessionAction } from '@/models/session/ISessionAction';
import { sessionSlice } from '@/slices/session';
import { User } from '@prisma/client';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect } from 'react';

export function useUser() {
    const setUpUser = useCallback(async () => {
        let stored = localStorage.getItem('userId');
        let response: AxiosResponse<User>;
        if (!stored) {
            response = await axios.post('/api/users');
        } else {
            response = await axios.get('/api/users/' + stored);
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
