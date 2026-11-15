import { useState } from 'react';
import { gameSlice } from '../slices/game';
import { ICardCategories } from '../models/game/ICardCategories';
import { IGameActions } from '../models/game/IGameActions';
import CustomButton from './CustomButton';
import AppDialog from './AppDialog';
import Icon from './Icon';

export default function CategoryModal() {
    const game = gameSlice.use();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(game.selectedCategories);
    const categories = Object.keys(ICardCategories) as ICardCategories[];
    const apply = () => {
        gameSlice.dispatch({
            type: IGameActions.SET_SELECTED_CATEGORIES,
            payload: selected,
        });
        setOpen(false);
    };
    return (
        <>
            <CustomButton
                className="button button-outline button-small"
                onClick={() => {
                    setSelected(game.selectedCategories);
                    setOpen(true);
                }}
            >
                Escolher categorias <Icon name="arrow" width="17" />
            </CustomButton>
            <AppDialog
                open={open}
                onClose={() => setOpen(false)}
                title="Siga sua curiosidade."
                description="Escolha os assuntos da sua próxima partida. Você pode combinar quantos quiser."
                icon="grid"
            >
                <div className="selection-summary">
                    <span>
                        {selected.length} de {categories.length} selecionadas
                    </span>
                    <button
                        className="text-button"
                        onClick={() =>
                            setSelected(
                                selected.length === categories.length
                                    ? []
                                    : categories,
                            )
                        }
                    >
                        {selected.length === categories.length
                            ? 'Limpar seleção'
                            : 'Selecionar todas'}
                    </button>
                </div>
                <div className="category-grid">
                    {categories.map(category => (
                        <label
                            className={`category-option ${
                                selected.includes(category) ? 'selected' : ''
                            }`}
                            key={category}
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(category)}
                                onChange={event =>
                                    setSelected(
                                        event.target.checked
                                            ? [...selected, category]
                                            : selected.filter(
                                                  item => item !== category,
                                              ),
                                    )
                                }
                            />
                            <span>
                                {
                                    ICardCategories[
                                        category as keyof typeof ICardCategories
                                    ]
                                }
                            </span>
                        </label>
                    ))}
                </div>
                {selected.length === 0 && (
                    <p className="field-error" role="status">
                        Selecione pelo menos uma categoria para jogar.
                    </p>
                )}
                <CustomButton
                    className="button button-primary dialog-action"
                    disabled={selected.length === 0}
                    onClick={apply}
                >
                    Tudo pronto <Icon name="check" width="18" />
                </CustomButton>
            </AppDialog>
        </>
    );
}
