import AppShell from '@/frontend/components/AppShell';
import CustomButton from '@/frontend/components/CustomButton';
import Icon from '@/frontend/components/Icon';
import ICurrentPage from '@/frontend/models/game/ICurrentPage';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { gameSlice } from '@/frontend/slices/game';
import { sessionSlice } from '@/frontend/slices/session';
import calculateScore from '@/utils/calculateScore';

export default function Result({
    type,
}: {
    title: string;
    subtitle: string;
    type: ICurrentPage.SUCCESS | ICurrentPage.FAILURE;
}): JSX.Element {
    const game = gameSlice.use();
    const { user } = sessionSlice.use();
    const card = game.cards[game.currentCardIndex];
    const success = type === ICurrentPage.SUCCESS;
    const last = game.currentCardIndex === game.cards.length - 1;
    const next = () => {
        if (!last)
            gameSlice.dispatch({
                type: IGameActions.SETUP_NEXT_CARD,
                payload: { currentCard: card },
            });
        gameSlice.dispatch({
            type: IGameActions.CHANGE_PAGE,
            payload: { page: last ? ICurrentPage.END : ICurrentPage.GAME },
        });
    };
    return (
        <AppShell>
            <main id="main-content" className="result-main page-width">
                <div
                    className={`result-symbol ${
                        success ? '' : 'result-skipped'
                    }`}
                >
                    <Icon
                        name={success ? 'sparkles' : 'bulb'}
                        width="36"
                        height="36"
                    />
                </div>
                <span className="section-kicker">
                    {success ? 'PISTAS CONECTADAS!' : 'MAIS UMA DESCOBERTA'}
                </span>
                <h1>
                    {success
                        ? 'A curiosidade te levou lá.'
                        : 'Essa fica para a próxima.'}
                </h1>
                <p className="result-subtitle">
                    {success
                        ? 'Você descobriu o perfil. Mandou bem!'
                        : 'Nem todo mistério se resolve de primeira. Continue curioso.'}
                </p>
                <section className="result-card">
                    <div className="answer-reveal">
                        <span className="section-kicker">
                            {success ? 'O PERFIL É' : 'A RESPOSTA ERA'}
                        </span>
                        <h2>{card.answer}</h2>
                        <span className="answer-type">{card.type}</span>
                    </div>
                    <div className="score-breakdown">
                        <div className="round-score">
                            <span>Pontos nesta carta</span>
                            <strong>
                                +{success ? calculateScore(game) : 0}
                                <small>pts</small>
                            </strong>
                        </div>
                        {success ? (
                            <>
                                <div>
                                    <span>Pontuação inicial</span>
                                    <span>100</span>
                                </div>
                                <div>
                                    <span>
                                        Dicas extras ({game.usedTips - 1})
                                    </span>
                                    <span>−{(game.usedTips - 1) * 5}</span>
                                </div>
                                <div>
                                    <span>
                                        Palpites errados ({game.wrongAnswers})
                                    </span>
                                    <span>−{game.wrongAnswers * 2}</span>
                                </div>
                            </>
                        ) : (
                            <p className="skip-explanation">
                                Cartas puladas não somam pontos. A próxima pode
                                ser a sua!
                            </p>
                        )}
                    </div>
                </section>
                <div className="result-totals">
                    <span>
                        <strong>{user.score.toLocaleString('pt-BR')}</strong>{' '}
                        pontos no total
                    </span>
                    <span>
                        <strong>{user.correctCardIds.length}</strong> cartas
                        descobertas
                    </span>
                    <span>
                        <strong>
                            {Math.max(
                                0,
                                game.cards.length - game.currentCardIndex - 1,
                            )}
                        </strong>{' '}
                        cartas pela frente
                    </span>
                </div>
                <CustomButton
                    className="button button-primary next-button"
                    onClick={next}
                >
                    {last ? 'Ver meu resultado' : 'Próxima carta'}
                    <Icon name="arrow" />
                </CustomButton>
            </main>
        </AppShell>
    );
}
