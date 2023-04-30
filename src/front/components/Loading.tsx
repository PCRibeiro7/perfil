import { CircularProgress, Modal } from '@mui/material';
import { gameSlice } from '../slices/game';

export default function Loading() {
    const game = gameSlice.use();

    return (
        <Modal open={game.loading}>
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="flex bg-white p-6 rounded-lg ">
                    <CircularProgress />
                </div>
            </div>
        </Modal>
    );
}
