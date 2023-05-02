import { Modal } from '@mui/material';
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import axiosInstance from '../client';

export default function UsersRanking({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function getUsers() {
            const { data: users } = await axiosInstance.get('/api/users');
            setUsers(users);
        }
        getUsers();
    }, []);

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col p-6 rounded-lg border-b-2 border-slate-200 w-[30rem] max-w-[90%]">
                <h1 className="text-xl text-slate-600 mb-6">
                    Ranking de Jogadores:
                </h1>
                <DataGrid
                    rows={users}
                    columns={[
                        { field: 'name', headerName: 'Nome', flex: 70 },
                        {
                            field: 'correctCardIds',
                            headerName: 'Cartas Corretas',
                            flex: 70,
                            valueGetter: (params: GridValueGetterParams) =>
                                params.row.correctCardIds.length,
                        },
                        {
                            field: 'score',
                            headerName: 'Score',
                            flex: 70,
                        },
                    ]}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'score', sort: 'desc' }],
                        },
                    }}
                    paginationModel={{ page: 0, pageSize: 10 }}
                />
            </div>
        </Modal>
    );
}
