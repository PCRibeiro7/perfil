import AppShell from '@/frontend/components/AppShell';
import CustomButton from '@/frontend/components/CustomButton';
import Icon from '@/frontend/components/Icon';
import UsersRanking from '@/frontend/components/UsersRanking';
import ICurrentPage from '@/frontend/models/game/ICurrentPage';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { gameSlice } from '@/frontend/slices/game';
import { sessionSlice } from '@/frontend/slices/session';

export default function End(): JSX.Element {
    const game = gameSlice.use();
    const { user } = sessionSlice.use();
    const ids = game.cards.map(card => card.id);
    const correct = ids.filter(id => user.correctCardIds.includes(id)).length;
    return (
        <AppShell navigation={<UsersRanking />}>
            <main id="main-content" className="result-main end-main page-width">
                <div className="result-symbol">
                    <Icon name="trophy" width="38" height="38" />
                </div>
                <span className="section-kicker">
                    UMA PARTIDA, MUITAS DESCOBERTAS
                </span>
                <h1>Sua curiosidade foi longe.</h1>
                <p className="result-subtitle">
                    Você chegou ao fim das cartas selecionadas.
                    <br />
                    Sempre há novos assuntos para explorar.
                </p>
                <section className="completion-card">
                    <span className="section-kicker">SUA PONTUAÇÃO TOTAL</span>
                    <strong className="final-score">
                        {user.score.toLocaleString('pt-BR')}
                        <small>pontos</small>
                    </strong>
                    <div className="completion-stats">
                        <div>
                            <strong>{game.cards.length}</strong>
                            <span>cartas exploradas</span>
                        </div>
                        <div>
                            <strong>{correct}</strong>
                            <span>perfis descobertos</span>
                        </div>
                        <div>
                            <strong>{game.cards.length - correct}</strong>
                            <span>cartas puladas</span>
                        </div>
                    </div>
                </section>
                <CustomButton
                    className="button button-primary next-button"
                    onClick={() =>
                        gameSlice.dispatch({
                            type: IGameActions.CHANGE_PAGE,
                            payload: { page: ICurrentPage.HOME },
                        })
                    }
                >
                    Explorar mais categorias <Icon name="arrow" />
                </CustomButton>
            </main>
        </AppShell>
    );
}
