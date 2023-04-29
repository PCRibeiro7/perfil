import { createSlice } from 'react-slice';
import { sessionReducer } from './reducer';
import ISessionState from '@/models/session/ISessionState';

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
    },
};

export const sessionSlice = createSlice({
    reducer: sessionReducer,
    initialState: initialSessionState,
    debugName: 'Session',
});
