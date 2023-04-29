import Home from '../views/Home';
import Game from '../views/Game';
import Success from '../views/Success';
import Failure from '@/views/Failure';
import ICurrentPage from '@/models/game/ICurrentPage';

import { gameSlice } from '@/slices/game';

export default function Router(): JSX.Element {
    const state = gameSlice.use();
    switch (state.currentPage) {
        case ICurrentPage.HOME:
            return <Home />;
        case ICurrentPage.GAME:
            return <Game />;
        case ICurrentPage.SUCCESS:
            return <Success />;
        case ICurrentPage.FAILURE:
            return <Failure />;
    }
}
