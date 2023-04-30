import '@/styles/globals.css';
import { useUser } from '@/front/hooks/useUser';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Loading from '@/front/components/Loading';

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
