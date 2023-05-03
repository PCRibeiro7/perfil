import { Modal } from '@mui/material';
import { useState } from 'react';
import { gameSlice } from '../slices/game';
import { ICardCategories } from '../models/game/ICardCategories';
import { IGameActions } from '../models/game/IGameActions';

export default function CategoryModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const game = gameSlice.use();
    const allCategories = Object.keys(ICardCategories).sort();
    const [selectAll, setSelectAll] = useState(true);

    const handleChange = (e: any, category: ICardCategories) => {
        const checked = e.target.checked;
        let categories = [...game.selectedCategories];
        if (checked) {
            categories.push(category as ICardCategories);
        } else {
            categories = categories.filter(
                c => c !== (category as ICardCategories),
            );
        }
        gameSlice.dispatch({
            type: IGameActions.SET_SELECTED_CATEGORIES,
            payload: categories,
        });
    };

    const toggleSelectAll = (e: any) => {
        const checked = e.target.checked;
        setSelectAll(checked);
        if (checked) {
            gameSlice.dispatch({
                type: IGameActions.SET_SELECTED_CATEGORIES,
                payload: allCategories as ICardCategories[],
            });
        } else {
            gameSlice.dispatch({
                type: IGameActions.SET_SELECTED_CATEGORIES,
                payload: [] as ICardCategories[],
            });
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col p-6 rounded-lg border-b-2 border-slate-200 w-[30rem] max-w-[90%]">
                <h1 className="text-xl text-slate-600 mb-6">Categorias:</h1>
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                    />
                    <h1 className="text-base text-slate-600 ">
                        Selcionar Todas:
                    </h1>
                </div>

                <div className="grid grid-cols-3">
                    {allCategories.map(category => (
                        <div
                            className="flex flex-row items-center"
                            key={category}
                        >
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={game.selectedCategories.includes(
                                    category as ICardCategories,
                                )}
                                onChange={e =>
                                    handleChange(e, category as ICardCategories)
                                }
                            />
                            <h1 className="text-base text-slate-600">
                                {category}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
}
