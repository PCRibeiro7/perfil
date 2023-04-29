import { Zoom } from '@mui/material';

export default function CustomZoom({
    children,
    shouldStart,
    ...props
}: {
    children: JSX.Element;
    shouldStart: boolean;
    [key: string]: any;
}) {
    return (
        <Zoom in={shouldStart} timeout={1000} {...props}>
            {children}
        </Zoom>
    );
}
