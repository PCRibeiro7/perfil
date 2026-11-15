import { ReactNode } from 'react';
import { gameSlice } from '../slices/game';
import { IGameActions } from '../models/game/IGameActions';
import ICurrentPage from '../models/game/ICurrentPage';
import SoundController from './SoundController';

export function Brand() {
    return (
        <span className="brand-wordmark">
            perfil<span className="brand-dot">.</span>
            <span className="brand-label">ONLINE</span>
        </span>
    );
}

export default function AppShell({
    children,
    navigation,
}: {
    children: ReactNode;
    navigation?: ReactNode;
}) {
    const game = gameSlice.use();
    return (
        <div className="app-shell">
            <a className="skip-link" href="#main-content">
                Pular para o conteúdo
            </a>
            <header className="site-header page-width">
                <button
                    className="brand-button"
                    aria-label="Perfil Online — início"
                    disabled={game.loading}
                    onClick={() =>
                        gameSlice.dispatch({
                            type: IGameActions.CHANGE_PAGE,
                            payload: { page: ICurrentPage.HOME },
                        })
                    }
                >
                    <Brand />
                </button>
                <nav
                    className="header-navigation"
                    aria-label="Navegação principal"
                >
                    {navigation}
                    <SoundController />
                </nav>
            </header>
            {children}
            <footer className="site-footer page-width">
                <span>Uma pista de cada vez. Uma descoberta a mais.</span>
                <span className="footer-note">
                    <span /> Feito para mentes curiosas
                </span>
            </footer>
        </div>
    );
}
