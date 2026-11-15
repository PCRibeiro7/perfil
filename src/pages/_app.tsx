import '@/frontend/styles/globals.css';
import { useUser } from '@/frontend/hooks/useUser';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Loading from '@/frontend/components/Loading';

export default function App({ Component, pageProps }: AppProps) {
    const { error, retry } = useUser();
    return (
        <>
            <Head>
                <title>Perfil Online — Uma dica. Mil possibilidades.</title>
                <meta
                    name="description"
                    content="Conecte as pistas e descubra pessoas, lugares, coisas e anos. Um jogo de conhecimento e intuição para mentes curiosas."
                />
                <meta name="theme-color" content="#f8f8f2" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            {error && (
                <div className="connection-banner" role="alert">
                    <span>
                        Não conseguimos carregar seu perfil. Seu progresso
                        continua salvo.
                    </span>
                    <button onClick={retry}>Tentar novamente</button>
                </div>
            )}
            <Component {...pageProps} />
            <Loading />
        </>
    );
}
