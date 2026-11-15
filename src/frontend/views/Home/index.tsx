import { useState } from 'react';
import AppShell from '@/frontend/components/AppShell';
import CategoryModal from '@/frontend/components/CategoryModal';
import CustomButton from '@/frontend/components/CustomButton';
import Icon from '@/frontend/components/Icon';
import ResetProgress from '@/frontend/components/ResetProgress';
import UserNameModal from '@/frontend/components/UserNameModal';
import UsersRanking from '@/frontend/components/UsersRanking';
import ICurrentPage from '@/frontend/models/game/ICurrentPage';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { gameSlice } from '@/frontend/slices/game';
import { sessionSlice } from '@/frontend/slices/session';
import { filterCardsForUser } from '@/utils/filterCardsForUser';
import { shuffleArray } from '@/utils/shuffleArray';
import allCards from '@/frontend/assets/cards.json';
import { ICardCategories } from '@/frontend/models/game/ICardCategories';

const subjects = [
    { icon: 'user', name: 'Pessoas' },
    { icon: 'globe', name: 'Lugares' },
    { icon: 'cube', name: 'Coisas' },
    { icon: 'calendar', name: 'Anos' },
];

export default function Home(): JSX.Element {
    const game = gameSlice.use();
    const { user } = sessionSlice.use();
    const [error, setError] = useState('');
    const startGame = () => {
        const cards = filterCardsForUser(
            shuffleArray([...allCards]),
            user,
            game.selectedCategories,
        );
        if (!cards.length) {
            setError(
                'Você já descobriu todas as cartas dessas categorias! Escolha outros assuntos ou reinicie seu progresso.',
            );
            return;
        }
        gameSlice.dispatch({ type: IGameActions.FILTER_CARDS, payload: cards });
        gameSlice.dispatch({
            type: IGameActions.CHANGE_PAGE,
            payload: { page: ICurrentPage.GAME },
        });
    };
    return (
        <AppShell
            navigation={
                <>
                    <a className="nav-link" href="#como-jogar">
                        Como jogar
                    </a>
                    <UsersRanking />
                    <UserNameModal compact />
                </>
            }
        >
            <main id="main-content" className="page-width home-main">
                <section className="hero">
                    <div className="hero-copy">
                        <div className="eyebrow">
                            <span className="tiny-star">✳</span> UM JOGO PARA
                            MENTES CURIOSAS
                        </div>
                        <h1>
                            Uma dica.
                            <br />
                            Mil{' '}
                            <span className="word-highlight">
                                possibilidades
                                <svg
                                    viewBox="0 0 480 15"
                                    preserveAspectRatio="none"
                                    aria-hidden="true"
                                >
                                    <path d="M3 9Q210-2 477 7M36 13Q232 4 445 11" />
                                </svg>
                            </span>
                            .
                        </h1>
                        <p className="hero-description">
                            Uma pessoa, um lugar, uma coisa ou um ano.
                            <br className="desktop-break" /> Conecte as pistas e
                            descubra o que está por trás de cada carta.
                        </p>
                        <div className="hero-actions">
                            <CustomButton
                                className="button button-primary play-button"
                                onClick={startGame}
                                disabled={
                                    !user.id ||
                                    game.selectedCategories.length === 0
                                }
                            >
                                Vamos jogar <Icon name="arrow" />
                            </CustomButton>
                            <span className="play-note">
                                <span /> Grátis. Sem pressa. No seu ritmo.
                            </span>
                        </div>
                        {error && (
                            <p className="field-error start-error" role="alert">
                                {error}
                            </p>
                        )}
                        {game.selectedCategories.length === 0 && (
                            <p className="field-error" role="status">
                                Escolha pelo menos uma categoria abaixo para
                                começar.
                            </p>
                        )}
                        <div className="hero-subjects">
                            {subjects.map(subject => (
                                <span key={subject.name}>
                                    <Icon name={subject.icon} width="17" />
                                    {subject.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="hero-art" aria-hidden="true">
                        <span className="orbit orbit-one" />
                        <span className="orbit orbit-two" />
                        <span className="art-star art-star-one">✳</span>
                        <span className="art-star art-star-two">✦</span>
                        <div className="deck-card deck-card-back">
                            <span>perfil.</span>
                        </div>
                        <div className="deck-card deck-card-middle" />
                        <div className="deck-card deck-card-front">
                            <div className="mystery-card-top">
                                <span>QUEM SOU EU?</span>
                                <Icon name="sparkles" width="20" />
                            </div>
                            <div className="mystery-mark">
                                ?<span className="mark-star">✧</span>
                            </div>
                            <div className="mystery-card-bottom">
                                <span>
                                    Uma carta.
                                    <br />
                                    Uma descoberta.
                                </span>
                                <span className="card-brand">p.</span>
                            </div>
                        </div>
                        <div className="floating-clue">
                            <span className="clue-icon">
                                <Icon name="bulb" width="22" />
                            </span>
                            <div>
                                <strong>Confie na sua curiosidade.</strong>
                                <span>A próxima pista pode ser a sua!</span>
                            </div>
                        </div>
                        <span className="art-caption">
                            UM POUCO DE INTUIÇÃO. MUITA DIVERSÃO.
                        </span>
                    </div>
                </section>
                <section
                    className="how-section"
                    id="como-jogar"
                    aria-labelledby="how-title"
                >
                    <div className="how-heading">
                        <span className="section-kicker">COMO JOGAR</span>
                        <h2 id="how-title">
                            Simples de jogar. <br />
                            Difícil de largar.
                        </h2>
                    </div>
                    <div className="how-step">
                        <span className="step-number">01</span>
                        <div>
                            <h3>Leia a primeira dica</h3>
                            <p>
                                Cada carta esconde uma resposta. <br />A
                                primeira pista é por nossa conta.
                            </p>
                        </div>
                    </div>
                    <div className="how-step">
                        <span className="step-number">02</span>
                        <div>
                            <h3>Conecte as ideias</h3>
                            <p>
                                Precisa de uma ajudinha? <br />
                                Revele novas dicas quando quiser.
                            </p>
                        </div>
                    </div>
                    <div className="how-step">
                        <span className="step-number">03</span>
                        <div>
                            <h3>Dê o seu palpite</h3>
                            <p>
                                Quanto menos dicas e erros, <br />
                                mais pontos para você.
                            </p>
                        </div>
                    </div>
                </section>
                <section
                    className="home-panels"
                    aria-label="Personalize sua partida"
                >
                    <div className="setup-panel">
                        <div className="panel-heading">
                            <span className="icon-tile">
                                <Icon name="grid" />
                            </span>
                            <span className="section-kicker">
                                SEU JOGO, SEU JEITO
                            </span>
                        </div>
                        <h2>O que desperta sua curiosidade?</h2>
                        <p>
                            Misture seus assuntos favoritos e deixe a surpresa
                            acontecer.
                        </p>
                        <div className="category-preview">
                            {game.selectedCategories
                                .slice(0, 3)
                                .map(category => (
                                    <span key={category}>
                                        {
                                            ICardCategories[
                                                category as keyof typeof ICardCategories
                                            ]
                                        }
                                    </span>
                                ))}
                            <span className="category-count">
                                {game.selectedCategories.length} selecionadas
                            </span>
                        </div>
                        <CategoryModal />
                    </div>
                    <div className="player-panel">
                        <div className="player-heading">
                            <span className="icon-tile peach">
                                <Icon name="user" />
                            </span>
                            <div>
                                <span className="section-kicker">
                                    BOM TER VOCÊ POR AQUI
                                </span>
                                <h2>
                                    {user.userCreated
                                        ? `Olá, ${user.name}!`
                                        : 'Olá, mente curiosa!'}
                                </h2>
                            </div>
                            <UserNameModal />
                        </div>
                        <div className="player-stats">
                            <div>
                                <strong>
                                    {user.score.toLocaleString('pt-BR')}
                                </strong>
                                <span>pontos conquistados</span>
                            </div>
                            <span className="stats-divider" />
                            <div>
                                <strong>
                                    {user.correctCardIds.length.toLocaleString(
                                        'pt-BR',
                                    )}
                                    <Icon name="sparkles" width="22" />
                                </strong>
                                <span>cartas descobertas</span>
                            </div>
                        </div>
                        <div className="player-bottom">
                            <span>Cada descoberta conta.</span>
                            <ResetProgress />
                        </div>
                    </div>
                </section>
            </main>
        </AppShell>
    );
}
