import { ISessionAction } from '@/frontend/models/session/ISessionAction';
import ISessionState from '@/frontend/models/session/ISessionState';

export interface ISessionReducerActions {
    type: ISessionAction;
    payload?: any;
}

export function sessionReducer(
    state: ISessionState,
    { type, payload }: ISessionReducerActions,
): ISessionState {
    switch (type) {
        case ISessionAction.SET_USER:
            return {
                ...state,
                user: payload,
            };
        default:
            throw new Error(`Invalid action type: ${type}`);
    }
}
