import '@/styles/globals.css';
import { useUser } from '@/hooks/useUser';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    useUser();
    return (
        <>
            <Head>
                <title>Perfil Online</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}
