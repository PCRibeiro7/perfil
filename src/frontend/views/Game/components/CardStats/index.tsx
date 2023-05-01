import axiosInstance from '@/frontend/client';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { gameSlice } from '@/frontend/slices/game';
import { Modal } from '@mui/material';
import { CardStats } from '@prisma/client';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useEffect, useState } from 'react';

export function CardStats({ cardId }: { cardId: string }) {
    const [cardStats, setCardStats] = useState(
        undefined as CardStats | undefined,
    );
    const game = gameSlice.use();

    const getCardStats = async (cardId: string) => {
        const { data: cardStats } = await axiosInstance.get(`/api/cardStats`, {
            params: { cardId },
        });
        if (!cardStats) return;
        setCardStats(cardStats);
    };

    useEffect(() => {
        getCardStats(cardId);
    }, [cardId]);

    const closeModal = () => {
        gameSlice.dispatch({
            type: IGameActions.SET_SHOW_CARD_STATS,
            payload: false,
        });
    };

    return (
        <Modal open={game.showCardStats} onClose={closeModal}>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white flex flex-col p-6 rounded-lg border-b-2 border-slate-200 w-[30rem] max-w-[90%  ] sm:p-2">
                <div className="bg-white p-6 rounded-xl">
                    {cardStats === undefined ? (
                        <>
                            <h1 className="text-xl text-slate-600">
                                Caraca! Não temos estatísticas!
                            </h1>
                            <h1 className="text-2xl ">
                                Você é a primeira pessoa a ver essa carta!
                            </h1>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl text-slate-600 mb-4 flex items-center">
                                <BarChartIcon className="mr-1" />
                                Estatísticas da carta:
                            </h1>
                            <div className="flex justify-between">
                                <h1 className="text-2xl text-slate-400">
                                    Já viram:
                                </h1>
                                <div>
                                    <h1 className="text-2xl inline-block mr-2">
                                        {cardStats.seenCount}
                                    </h1>
                                    <h1 className="text-2xl text-slate-400 inline-block">
                                        pessoas
                                    </h1>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <h1 className="text-2xl text-slate-400">
                                    Pularam:
                                </h1>
                                <div>
                                    <h1 className="text-2xl inline-block mr-2">
                                        {cardStats.skippedCount}
                                    </h1>
                                    <h1 className="text-2xl text-slate-400 inline-block">
                                        pessoas
                                    </h1>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <h1 className="text-2xl text-slate-400">
                                    Acertaram:
                                </h1>
                                <div>
                                    <h1 className="text-2xl inline-block mr-2">
                                        {cardStats.correctCount}
                                    </h1>
                                    <h1 className="text-2xl text-slate-400 inline-block">
                                        pessoas
                                    </h1>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
}
