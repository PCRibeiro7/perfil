import '@/frontend/styles/globals.css';
import { useUser } from '@/frontend/hooks/useUser';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Loading from '@/frontend/components/Loading';

export default function App({ Component, pageProps }: AppProps) {
    useUser();
    return (
        <>
            <Head>
                <title>Perfil Online</title>
            </Head>
            <Component {...pageProps} />
            <Loading />
        </>
    );
}
