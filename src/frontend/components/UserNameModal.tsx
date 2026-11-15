import { FormEvent, useState } from 'react';
import { mutateUser } from '../client/userMutations';
import { sessionSlice } from '../slices/session';
import { ISessionAction } from '../models/session/ISessionAction';
import AppDialog from './AppDialog';
import CustomButton from './CustomButton';
import Icon from './Icon';

export default function UserNameModal({
    compact = false,
}: {
    compact?: boolean;
}) {
    const session = sessionSlice.use();
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const save = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = String(
            new FormData(event.currentTarget).get('userName') || '',
        ).trim();
        if (saving) return;
        if (name.length < 2) {
            setError('Use pelo menos 2 caracteres para o seu nome.');
            return;
        }
        setSaving(true);
        setError('');
        try {
            const { data } = await mutateUser(session.user.id, {
                name,
                userCreated: true,
            });
            sessionSlice.dispatch({
                type: ISessionAction.SET_USER,
                payload: data,
            });
            setOpen(false);
        } catch {
            setError('Não foi possível salvar seu nome. Tente novamente.');
        } finally {
            setSaving(false);
        }
    };
    return (
        <>
            <CustomButton
                className={compact ? 'avatar-button' : 'text-button'}
                aria-label={compact ? 'Editar seu perfil' : undefined}
                title={compact ? session.user.name : undefined}
                onClick={() => {
                    setError('');
                    setOpen(true);
                }}
            >
                {compact ? (
                    <Icon name="user" width="20" />
                ) : (
                    <>
                        Editar nome <Icon name="arrow" width="15" />
                    </>
                )}
            </CustomButton>
            <AppDialog
                open={open}
                onClose={() => !saving && setOpen(false)}
                title="Como podemos te chamar?"
                description="Seu nome aparece no ranking. Escolha um que combine com você."
                icon="user"
            >
                <form onSubmit={save}>
                    <label className="input-label" htmlFor="user-name">
                        Seu nome
                    </label>
                    <input
                        className="text-input"
                        id="user-name"
                        name="userName"
                        defaultValue={
                            session.user.userCreated ? session.user.name : ''
                        }
                        placeholder="Seu nome ou apelido"
                        required
                        minLength={2}
                        maxLength={40}
                        autoComplete="nickname"
                        autoFocus
                        disabled={saving}
                    />
                    {error && (
                        <p className="field-error" role="alert">
                            {error}
                        </p>
                    )}
                    <CustomButton
                        type="submit"
                        className="button button-primary dialog-action"
                        disabled={saving || !session.user.id}
                    >
                        {saving ? 'Salvando...' : 'Salvar meu nome'}{' '}
                        <Icon name="check" width="18" />
                    </CustomButton>
                </form>
            </AppDialog>
        </>
    );
}
