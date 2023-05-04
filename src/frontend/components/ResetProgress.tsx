import { Modal } from '@mui/material';
import { gameSlice } from '../slices/game';
import { ICardCategories } from '../models/game/ICardCategories';
import { IGameActions } from '../models/game/IGameActions';
import axiosInstance from '../client';
import { sessionSlice } from '../slices/session';
import { ISessionAction } from '../models/session/ISessionAction';
import CustomButton from './CustomButton';
import { useState } from 'react';

export default function ResetProgress() {
    const session = sessionSlice.use();
    const [resetProgressModalIsOpen, setResetProgessModalIsOpen] =
        useState(false);

    const handleReset = async () => {
        const resetUser = await axiosInstance.delete(
            `api/users/${session.user.id}`,
        );
        sessionSlice.dispatch({
            type: ISessionAction.SET_USER,
            payload: resetUser,
        });
        setResetProgessModalIsOpen(false);
    };

    return (
        <>
            <CustomButton
                onClick={() => {
                    setResetProgessModalIsOpen(true);
                }}
                className="bg-black rounded-xl hover:bg-slate-600 mt-4 w-52"
            >
                <h1 className="text-xl text-white">Resetar Progresso</h1>
            </CustomButton>
            <Modal
                open={resetProgressModalIsOpen}
                onClose={() => setResetProgessModalIsOpen(false)}
                sx={{
                    accentColor: 'rgb(71 85 105)',
                    fontFamily: 'DM Sans',
                    top: '10%',
                }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col p-6 rounded-lg border-b-2 border-slate-200 w-[30rem] max-w-[90%]">
                    <h1 className="text-xl text-slate-600 mb-2">
                        Resetar Progresso:
                    </h1>
                    <h1 className="text-base text-slate-600 mb-4">
                        Tem certeza que deseja resetar seu score, cartas
                        visualizadas, respondidas e puladas?
                    </h1>

                    <div className="flex flex-col items-center">
                        <button
                            onClick={handleReset}
                            className="bg-black rounded-xl hover:bg-slate-600 mt-4 w-52"
                        >
                            <h1 className="text-xl text-white">Resetar</h1>
                        </button>
                        <button
                            onClick={() => setResetProgessModalIsOpen(false)}
                            className="bg-black rounded-xl hover:bg-slate-600 mt-4 w-52"
                        >
                            <h1 className="text-xl text-white">Cancelar</h1>
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
