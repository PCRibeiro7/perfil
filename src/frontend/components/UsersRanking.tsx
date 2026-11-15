import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import axiosInstance from '../client';
import { sessionSlice } from '../slices/session';
import AppDialog from './AppDialog';
import CustomButton from './CustomButton';
import Icon from './Icon';

export default function UsersRanking() {
    const session = sessionSlice.use();
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [retry, setRetry] = useState(0);
    useEffect(() => {
        if (!open) return;
        let active = true;
        setLoading(true);
        setError(false);
        axiosInstance
            .get<User[]>('/api/users')
            .then(({ data }) => {
                if (active)
                    setUsers([...data].sort((a, b) => b.score - a.score));
            })
            .catch(() => {
                if (active) setError(true);
            })
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, [open, retry]);
    return (
        <>
            <CustomButton className="nav-button" onClick={() => setOpen(true)}>
                <Icon name="trophy" width="19" /> <span>Ranking</span>
            </CustomButton>
            <AppDialog
                open={open}
                onClose={() => setOpen(false)}
                title="Mentes curiosas vão longe."
                description="Cada descoberta vale pontos. Veja quem está conectando mais pistas."
                icon="trophy"
            >
                {loading ? (
                    <p className="empty-state" role="status">
                        Buscando os jogadores...
                    </p>
                ) : error ? (
                    <div className="empty-state">
                        <p role="alert">Não foi possível carregar o ranking.</p>
                        <button
                            className="text-button"
                            onClick={() => setRetry(value => value + 1)}
                        >
                            Tentar novamente
                        </button>
                    </div>
                ) : users.length === 0 ? (
                    <p className="empty-state">
                        O ranking está esperando o primeiro acerto. Que tal o
                        seu?
                    </p>
                ) : (
                    <div className="ranking-list">
                        <table className="ranking-table">
                            <thead>
                                <tr>
                                    <th scope="col">Posição</th>
                                    <th scope="col">Jogador</th>
                                    <th scope="col">Acertos</th>
                                    <th scope="col">Pontos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        className={
                                            user.id === session.user.id
                                                ? 'current-player'
                                                : ''
                                        }
                                        key={user.id}
                                    >
                                        <td>
                                            <span
                                                className={`rank-number rank-${
                                                    index + 1
                                                }`}
                                            >
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>
                                        </td>
                                        <td className="ranking-name">
                                            {user.name}
                                            {user.id === session.user.id && (
                                                <small>Você</small>
                                            )}
                                        </td>
                                        <td>{user.correctCardIds.length}</td>
                                        <td className="ranking-score">
                                            {user.score.toLocaleString('pt-BR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </AppDialog>
        </>
    );
}
