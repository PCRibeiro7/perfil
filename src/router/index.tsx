import Home from '../views/Home';
import Game from '../views/Game';
import ICurrentPage from '@/models/game/ICurrentPage';

import { gameSlice } from '@/slices/game';
import Result from '@/views/Result';

export default function Router(): JSX.Element {
    const state = gameSlice.use();
    switch (state.currentPage) {
        case ICurrentPage.HOME:
            return <Home />;
        case ICurrentPage.GAME:
            return <Game />;
        case ICurrentPage.SUCCESS:
            return <Result title="Parabéns!!" subtitle="Resposta:" />;
        case ICurrentPage.FAILURE:
            return <Result title="Oops!" subtitle="A resposta era:" />;
    }
}
