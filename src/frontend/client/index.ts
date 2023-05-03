import axios from 'axios';
import { gameSlice } from '../slices/game';
import { IGameActions } from '../models/game/IGameActions';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    config => {
        gameSlice.dispatch({ type: IGameActions.SET_LOADING, payload: true });
        return config;
    },
    error => {
        gameSlice.dispatch({ type: IGameActions.SET_LOADING, payload: false });
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    config => {
        gameSlice.dispatch({ type: IGameActions.SET_LOADING, payload: false });
        return config;
    },
    error => {
        gameSlice.dispatch({ type: IGameActions.SET_LOADING, payload: false });
        return Promise.reject(error);
    },
);

export default axiosInstance;
