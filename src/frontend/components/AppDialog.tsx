import { Dialog } from '@mui/material';
import { ReactNode, useId } from 'react';
import Icon from './Icon';

export default function AppDialog({
    open,
    onClose,
    title,
    description,
    icon = 'sparkles',
    children,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    icon?: string;
    children: ReactNode;
}) {
    const id = useId();
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby={`${id}-title`}
            aria-describedby={description ? `${id}-description` : undefined}
            fullWidth
            maxWidth="sm"
            PaperProps={{ className: 'dialog-paper' }}
        >
            <div className="dialog-heading">
                <span className="icon-tile">
                    <Icon name={icon} />
                </span>
                <button
                    type="button"
                    className="icon-button"
                    onClick={onClose}
                    aria-label="Fechar janela"
                >
                    <Icon name="close" />
                </button>
            </div>
            <h2 id={`${id}-title`} className="dialog-title">
                {title}
            </h2>
            {description && (
                <p id={`${id}-description`} className="dialog-description">
                    {description}
                </p>
            )}
            {children}
        </Dialog>
    );
}
