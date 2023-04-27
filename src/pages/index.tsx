import Home from '../views/Home';
import Card from '../views/Card';
import Success from '../views/Success';
import Failure from '@/views/Failure';
import { gameSlice } from '@/slices/game';

export default function Main(): JSX.Element {
    const state = gameSlice.use();

    if (!state.gameStarted) {
        return <Home />;
    }

    if (state.showSuccessPage) {
        return <Success />;
    }

    if (state.showFailurePage) {
        return <Failure />;
    }

    return <Card />;
}
