import { ISessionAction } from '@/front/models/session/ISessionAction';
import ISessionState from '@/front/models/session/ISessionState';

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
