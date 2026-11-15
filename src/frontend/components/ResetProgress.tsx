import { useState } from 'react';
import { mutateUser } from '../client/userMutations';
import { sessionSlice } from '../slices/session';
import { ISessionAction } from '../models/session/ISessionAction';
import AppDialog from './AppDialog';
import CustomButton from './CustomButton';
import Icon from './Icon';

export default function ResetProgress() {
    const session = sessionSlice.use();
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const reset = async () => {
        if (saving) return;
        setSaving(true);
        setError('');
        try {
            const { data } = await mutateUser(
                session.user.id,
                undefined,
                'delete',
            );
            sessionSlice.dispatch({
                type: ISessionAction.SET_USER,
                payload: data,
            });
            setOpen(false);
        } catch {
            setError(
                'Não foi possível reiniciar seu progresso. Tente novamente.',
            );
        } finally {
            setSaving(false);
        }
    };
    return (
        <>
            <CustomButton
                className="text-button muted-button"
                onClick={() => {
                    setError('');
                    setOpen(true);
                }}
            >
                <Icon name="reset" width="15" /> Reiniciar progresso
            </CustomButton>
            <AppDialog
                open={open}
                onClose={() => !saving && setOpen(false)}
                title="Um novo começo?"
                description="Sua pontuação e seu histórico de cartas serão apagados. Seu nome continua o mesmo. Esta ação não pode ser desfeita."
                icon="reset"
            >
                {error && (
                    <p className="field-error" role="alert">
                        {error}
                    </p>
                )}
                <div className="dialog-actions">
                    <CustomButton
                        className="button button-outline"
                        disabled={saving}
                        onClick={() => setOpen(false)}
                    >
                        Manter progresso
                    </CustomButton>
                    <CustomButton
                        className="button button-danger"
                        disabled={saving || !session.user.id}
                        onClick={reset}
                    >
                        {saving ? 'Reiniciando...' : 'Sim, reiniciar'}
                    </CustomButton>
                </div>
            </AppDialog>
        </>
    );
}
