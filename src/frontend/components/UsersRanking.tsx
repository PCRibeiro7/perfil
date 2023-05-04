import { Modal } from '@mui/material';
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import axiosInstance from '../client';

interface UsersRanking extends User {
    rank: number;
}

export default function UsersRanking({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [users, setUsers] = useState<UsersRanking[]>([]);

    useEffect(() => {
        async function getUsers() {
            const { data: users } = await axiosInstance.get('/api/users');

            const sortedUsers = users.sort(
                (a: User, b: User) => b.score - a.score,
            );

            const userWithRanking: UsersRanking[] = sortedUsers.map(
                (user: User, index: number) => ({
                    ...user,
                    rank: index + 1,
                }),
            );
            setUsers(userWithRanking);
        }
        getUsers();
    }, [isOpen]);

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col p-6 rounded-lg border-b-2 border-slate-200 w-[30rem] max-w-[90%]">
                <h1 className="text-xl text-slate-600 mb-6">
                    Ranking de Jogadores:
                </h1>
                <DataGrid
                    sx={{ fontFamily: 'DM Sans', maxHeight: '70vh' }}
                    rows={users}
                    columns={[
                        {
                            field: 'rank',
                            headerName: 'Rank',
                            flex: 1,
                            valueGetter: (params: GridValueGetterParams) =>
                                params.row.rank,
                        },
                        { field: 'name', headerName: 'Nome', flex: 1 },
                        {
                            field: 'correctCardIds',
                            headerName: 'Cartas Corretas',
                            flex: 1,
                            valueGetter: (params: GridValueGetterParams) =>
                                params.row.correctCardIds.length,
                            align: 'right',
                            headerAlign: 'right',
                        },
                        {
                            field: 'score',
                            headerName: 'Score',
                            flex: 1,
                            align: 'right',
                            headerAlign: 'right',
                        },
                    ]}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'rank', sort: 'asc' }],
                        },
                    }}
                    autoHeight
                />
            </div>
        </Modal>
    );
}
