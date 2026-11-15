import { gameSlice } from '@/frontend/slices/game';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import CustomButton from '@/frontend/components/CustomButton';

export default function GuessOptions() {
    const game = gameSlice.use();
    const card = game.cards[game.currentCardIndex];
    return (
        <div className="tip-options">
            <div className="tip-options-heading">
                <h2>Mais uma pista?</h2>
                <span>{card.tips.length - game.usedTips} disponíveis</span>
            </div>
            <p>Escolha um número para revelar uma dica.</p>
            <div className="tip-grid">
                {card.tips.map((_, index) => {
                    const opened = game.askedQuestions.includes(index);
                    return (
                        <CustomButton
                            key={index}
                            disabled={game.loading}
                            className={`tip-button ${opened ? 'opened' : ''} ${
                                game.currentQuestionIndex === index
                                    ? 'active'
                                    : ''
                            }`}
                            aria-label={`Dica ${index + 1}${
                                opened
                                    ? ', já revelada'
                                    : ', revelar por 5 pontos'
                            }`}
                            aria-pressed={game.currentQuestionIndex === index}
                            onClick={() =>
                                gameSlice.dispatch(
                                    opened
                                        ? {
                                              type: IGameActions.CHANGE_ACTIVE_TIP,
                                              payload: {
                                                  newAskedQuestionsIndex:
                                                      game.askedQuestions.indexOf(
                                                          index,
                                                      ),
                                              },
                                          }
                                        : {
                                              type: IGameActions.HANDLE_CLICK_ON_TIP_OPTION,
                                              payload: { index },
                                          },
                                )
                            }
                        >
                            {String(index + 1).padStart(2, '0')}
                        </CustomButton>
                    );
                })}
            </div>
            <div className="tip-legend">
                <span>
                    <i className="legend-current" /> Dica atual
                </span>
                <span>
                    <i className="legend-opened" /> Já revelada
                </span>
                <span>Rever dicas é grátis</span>
            </div>
        </div>
    );
}
