import axios from 'axios';
import { gameSlice } from '../slices/game';
import { IGameActions } from '../models/game/IGameActions';

const axiosInstance = axios.create({ timeout: 15000 });
let pendingRequests = 0;
const finishRequest = () => {
    pendingRequests = Math.max(0, pendingRequests - 1);
    gameSlice.dispatch({
        type: IGameActions.SET_LOADING,
        payload: pendingRequests > 0,
    });
};
axiosInstance.interceptors.request.use(
    config => {
        pendingRequests += 1;
        gameSlice.dispatch({ type: IGameActions.SET_LOADING, payload: true });
        return config;
    },
    error => {
        finishRequest();
        return Promise.reject(error);
    },
);
axiosInstance.interceptors.response.use(
    response => {
        finishRequest();
        return response;
    },
    error => {
        finishRequest();
        return Promise.reject(error);
    },
);

export default axiosInstance;
