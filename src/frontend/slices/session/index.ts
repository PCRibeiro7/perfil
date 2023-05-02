import { createSlice } from 'react-slice';
import { sessionReducer } from './reducer';
import ISessionState from '@/frontend/models/session/ISessionState';

const initialSessionState: ISessionState = {
    user: {
        id: '',
        createdAt: new Date(),
        correctCardIds: [],
        email: '',
        name: 'Usuário anônimo',
        seenCardIds: [],
        skippedCardIds: [],
        userCreated: false,
        score: 0,
    },
};

export const sessionSlice = createSlice({
    reducer: sessionReducer,
    initialState: initialSessionState,
    debugName: 'Session',
});
