import { Alert, Snackbar } from '@mui/material';
import { IState } from '../pages';

interface IFeedbackSnackbarProps {
    snackbar: Partial<IState['snackbar']>;
    handleSnackBar: (snackbarData: Partial<IState['snackbar']>) => void;
}
export default function FeedbackSnackbar({
    snackbar,
    handleSnackBar,
}: IFeedbackSnackbarProps): JSX.Element {
    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={1000}
            onClose={() => handleSnackBar({ open: false })}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
                onClose={() => handleSnackBar({ open: false })}
                severity={snackbar.type}
                sx={{ width: '100%' }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
}
