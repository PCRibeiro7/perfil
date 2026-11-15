import CustomButton from '@/frontend/components/CustomButton';
import Icon from '@/frontend/components/Icon';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { gameSlice } from '@/frontend/slices/game';

export default function TipPanel() {
    const game = gameSlice.use();
    const card = game.cards[game.currentCardIndex];
    const position = game.askedQuestions.indexOf(game.currentQuestionIndex);
    const changeTip = (offset: number) =>
        gameSlice.dispatch({
            type: IGameActions.CHANGE_ACTIVE_TIP,
            payload: { newAskedQuestionsIndex: position + offset },
        });
    return (
        <div className="active-clue">
            <div className="clue-label">
                <span className="clue-badge">
                    <Icon name="bulb" width="17" /> DICA{' '}
                    {String(game.currentQuestionIndex + 1).padStart(2, '0')}
                </span>
                <div className="clue-navigation">
                    <CustomButton
                        className="icon-button"
                        onClick={() => changeTip(-1)}
                        disabled={position <= 0}
                        aria-label="Dica anterior"
                    >
                        <Icon name="left" width="19" />
                    </CustomButton>
                    <CustomButton
                        className="icon-button"
                        onClick={() => changeTip(1)}
                        disabled={position >= game.askedQuestions.length - 1}
                        aria-label="Próxima dica revelada"
                    >
                        <Icon name="right" width="19" />
                    </CustomButton>
                </div>
            </div>
            <p
                className="clue-text"
                key={game.currentQuestionIndex}
                aria-live="polite"
            >
                {card.tips[game.currentQuestionIndex]}
            </p>
            <div className="clue-count">
                {game.usedTips} de {card.tips.length} dicas reveladas
            </div>
        </div>
    );
}
