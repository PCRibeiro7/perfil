import Home from '../components/Home/Home';
import Card from '../components/Card';
import Success from '../components/Success/Success';
import Failure from '@/components/Failure';
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
