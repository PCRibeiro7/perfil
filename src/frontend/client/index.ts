import axios from 'axios';
import { gameSlice } from '../slices/game';
import { IGameActions } from '../models/game/IGameActions';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    config => {
        console.log('req-conf', config);
        gameSlice.dispatch({ type: IGameActions.SET_LOADING, payload: true });
        return config;
    },
    error => {
        console.log('req-error', error);
        gameSlice.dispatch({ type: IGameActions.SET_LOADING, payload: false });
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    config => {
        console.log('res-conf', config);
        gameSlice.dispatch({ type: IGameActions.SET_LOADING, payload: false });
        return config;
    },
    error => {
        console.log('res-error', error);
        gameSlice.dispatch({ type: IGameActions.SET_LOADING, payload: false });
        return Promise.reject(error);
    },
);

export default axiosInstance;
