import CustomButton from '@/frontend/components/CustomButton';
import CustomZoom from '@/frontend/components/CustomZoom';
import { useDelay } from '@/frontend/hooks/useDelay';
import ICurrentPage from '@/frontend/models/game/ICurrentPage';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { gameSlice } from '@/frontend/slices/game';
import { sessionSlice } from '@/frontend/slices/session';
import calculateScore from '@/utils/calculateScore';

export default function End(): JSX.Element {
    const game = gameSlice.use();
    const session = sessionSlice.use();
    const secondCardIsReady = useDelay(2000);
    const buttonIsReady = useDelay(2000, secondCardIsReady);

    const currentCard = game.cards[game.currentCardIndex];

    return (
        <div className="h-screen flex flex-col justify-evenly items-center bg-slate-200">
            <CustomZoom shouldStart={true} timeout={1000}>
                <div className="bg-white p-6 rounded-xl w-96 min-w-[25%] max-w-[90%]">
                    <h1 className="text-xl text-slate-400 mb-1">Parabéns!</h1>
                    <h1 className="text-2xl mb-4">Você acabou com as cartas</h1>
                    <h1 className="text-3xl">
                        Score Final: {session.user.score}
                    </h1>
                </div>
            </CustomZoom>
            <CustomZoom shouldStart={secondCardIsReady} timeout={1000}>
                <div className="bg-white p-6 rounded-xl w-96 min-w-[25%] max-w-[90%]">
                    <div className="flex justify-between mb-4">
                        <h1 className="text-xl text-slate-400">
                            Pontuação na rodada:
                        </h1>
                        <h1 className="text-xl">
                            {calculateScore(game)} pontos
                        </h1>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-base text-slate-400">
                            Pontuação Máxima:
                        </h1>
                        <h1 className="text-base">100 pontos</h1>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-base text-slate-400">
                            Dicas Usadas{`(${game.usedTips - 1})`}:
                        </h1>
                        <h1 className="text-base">
                            -5x{game.usedTips - 1} = -{5 * (game.usedTips - 1)}{' '}
                            pontos
                        </h1>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-base text-slate-400">
                            Palpites Errados:{`(${game.wrongAnswers})`}
                        </h1>
                        <h1 className="text-base">
                            -2x{game.wrongAnswers} = -{2 * game.wrongAnswers}{' '}
                            pontos
                        </h1>
                    </div>
                </div>
            </CustomZoom>
            <CustomZoom shouldStart={buttonIsReady} timeout={1000}>
                <div>
                    <CustomButton
                        onClick={() => {
                            gameSlice.dispatch({
                                type: IGameActions.CHANGE_PAGE,
                                payload: { page: ICurrentPage.HOME },
                            });
                        }}
                        className="bg-black p-2 rounded-xl w-40 hover:bg-slate-600"
                    >
                        <h1 className="text-2xl text-white ">
                            Voltar para Home
                        </h1>
                    </CustomButton>
                </div>
            </CustomZoom>
        </div>
    );
}
