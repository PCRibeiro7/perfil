import { IGameState } from '@/frontend/models/game/IGameState';

export default function calculateScore(game: IGameState): number {
    const baseScore = 100;

    const extraTips = game.usedTips - 1;
    const incorrectGuesses = game.wrongAnswers;

    const score = baseScore - extraTips * 5 - incorrectGuesses * 2;

    if (score < 0) {
        return 0;
    }
    return score;
}
