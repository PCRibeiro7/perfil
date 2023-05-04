import { Modal } from '@mui/material';
import CustomButton from './CustomButton';
import { useState } from 'react';
import axiosInstance from '../client';
import { sessionSlice } from '../slices/session';
import { ISessionAction } from '../models/session/ISessionAction';

export default function UserNameModal() {
    const [createUserModalIsOpen, setCreateUserModalIsOpen] = useState(false);
    const session = sessionSlice.use();

    const createUserName = async (event: any) => {
        event.preventDefault();
        const userName: string = event.target.userName.value || '';

        const { data: updatedUser } = await axiosInstance.put(
            `/api/users/${session.user.id}`,
            {
                ...session.user,
                name: userName,
                userCreated: true,
            },
        );

        sessionSlice.dispatch({
            type: ISessionAction.SET_USER,
            payload: updatedUser,
        });
        setCreateUserModalIsOpen(false);
    };

    return (
        <>
            <CustomButton
                onClick={() => {
                    setCreateUserModalIsOpen(true);
                }}
                className="bg-black rounded-xl hover:bg-slate-600 mt-4 w-52"
            >
                <h1 className="text-xl text-white">
                    {session.user.userCreated ? 'Alterar' : 'Cadastrar'} nome
                </h1>
            </CustomButton>
            <Modal
                open={createUserModalIsOpen}
                onClose={() => {
                    setCreateUserModalIsOpen(false);
                }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col p-6 rounded-lg border-b-2 border-slate-200 w-[30rem] max-w-[90%]">
                    <form
                        onSubmit={createUserName}
                        className="w-full"
                        autoComplete="off"
                    >
                        <label>
                            <h1 className="text-base text-slate-600 mb-6">
                                Olá, {session.user.name}! <br />
                                <br /> Escolha o nome que te identificará no
                                ranking:
                            </h1>
                        </label>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Senhor Waldemar"
                            className="text-center w-full h-10 text-xl border-2 border-slate-200 rounded-xl mb-2 placeholder:text-slate-400"
                            defaultValue={session.user.name}
                        />
                        <div>
                            <CustomButton
                                className={`w-full h-10 bg-slate-950 rounded-xl hover:bg-slate-600`}
                            >
                                <h1 className="text-xl text-white">
                                    {session.user.userCreated
                                        ? 'Alterar'
                                        : 'Cadastrar'}
                                </h1>
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
