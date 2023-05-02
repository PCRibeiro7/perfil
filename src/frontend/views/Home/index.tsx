import axiosInstance from '@/frontend/client';
import CustomButton from '@/frontend/components/CustomButton';
import CustomZoom from '@/frontend/components/CustomZoom';
import UsersRanking from '@/frontend/components/UsersRanking';
import { useDelay } from '@/frontend/hooks/useDelay';
import ICurrentPage from '@/frontend/models/game/ICurrentPage';
import { IGameActions } from '@/frontend/models/game/IGameActions';
import { ISessionAction } from '@/frontend/models/session/ISessionAction';
import { gameSlice } from '@/frontend/slices/game';
import { sessionSlice } from '@/frontend/slices/session';
import { filterCardsForUser } from '@/utils/filterCardsForUser';
import { shuffleArray } from '@/utils/shuffleArray';
import { Modal } from '@mui/material';
import { useState } from 'react';
import Typewriter from 'typewriter-effect';

const instructions = shuffleArray([
    'Descubra a palavra secreta',
    'Pode ser uma coisa, pessoa, lugar ou ano',
    'Use suas dicas com sabedoria',
    'Use o mínimo de dicas e palpites errados para ganhar mais pontos',
]);

export default function Home(): JSX.Element {
    const game = gameSlice.use();
    const session = sessionSlice.use();
    const startButtonIsReady = useDelay(4000);
    const instructionsIsReady = useDelay(1000);
    const [createUserModalIsOpen, setCreateUserModalIsOpen] = useState(false);
    const [rankingModalIsOpen, setRankingModalIsOpen] = useState(false);

    const startGame = () => {
        gameSlice.dispatch({
            type: IGameActions.FILTER_CARDS,
            payload: filterCardsForUser(game.cards, session.user),
        });
        gameSlice.dispatch({
            type: IGameActions.CHANGE_PAGE,
            payload: { page: ICurrentPage.GAME },
        });
    };

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
        <main className="flex flex-col justify-evenly items-center h-screen bg-slate-200 center">
            <CustomZoom shouldStart={true} timeout={1000}>
                <div className="bg-white p-6 rounded-xl max-w-xs">
                    <h1 className="text-6xl">Perfil Online</h1>
                </div>
            </CustomZoom>
            <div className="max-w-xs h-56">
                {instructionsIsReady && (
                    <div className="bg-white p-6 rounded-xl">
                        <Typewriter
                            options={{
                                strings: [
                                    `Olá, ${session.user.name}`,
                                    ...instructions,
                                    'Boa sorte!',
                                ],
                                autoStart: true,
                                loop: true,
                                wrapperClassName: 'text-3xl',
                                deleteSpeed: 5,
                            }}
                        />
                    </div>
                )}
            </div>
            <CustomZoom shouldStart={startButtonIsReady} timeout={1000}>
                <div>
                    <CustomButton
                        onClick={startGame}
                        className="bg-black p-2 rounded-xl w-60  hover:bg-slate-600"
                    >
                        <h1 className="text-3xl text-white">Jogar</h1>
                    </CustomButton>
                </div>
            </CustomZoom>
            <CustomZoom
                shouldStart={startButtonIsReady}
                timeout={1000}
                style={{
                    transitionDelay: startButtonIsReady ? `1500ms` : '0ms',
                }}
            >
                <div className="flex flex-col">
                    <CustomButton
                        onClick={() => {
                            setCreateUserModalIsOpen(true);
                        }}
                        className="bg-black rounded-xl hover:bg-slate-600 mt-4 w-52"
                    >
                        <h1 className="text-xl text-white">
                            {session.user.userCreated ? 'Alterar' : 'Cadastrar'}{' '}
                            nome
                        </h1>
                    </CustomButton>
                    <CustomButton
                        onClick={() => {
                            setRankingModalIsOpen(true);
                        }}
                        className="bg-black rounded-xl hover:bg-slate-600 mt-4 w-52"
                    >
                        <h1 className="text-xl text-white">Ranking</h1>
                    </CustomButton>
                </div>
            </CustomZoom>
            <UsersRanking
                isOpen={rankingModalIsOpen}
                onClose={() => setRankingModalIsOpen(false)}
            />
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
        </main>
    );
}
