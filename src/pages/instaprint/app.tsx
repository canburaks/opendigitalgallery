import { useEffect } from 'react';
// import { CartView } from '@/views';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@/../next-i18next.config';
import { LocaleType } from '@/types';
// import { PAGES } from '@/constants';
import { InstaprintAppView } from '@/views';
// import { useRouter } from 'next/router';
import { Instagram } from "@/data/instagramClient";
import { useTranslation } from 'next-i18next';
import { TRX, IG_USER_ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/constants';
import { UseInstaprintStore } from '@/data/stores';

export default function InstaPrintAppPage(props:any) {
    const { t } = useTranslation("common");
    const instagramClient = new Instagram(props.instaprintAppId, props.instaprintRedirectUri);

    // const router = useRouter();
    // const [page, setPage] = useState<number>(1);
    const setMedia = UseInstaprintStore(state => state.setMedia);

    useEffect(() => {
        // Verify that user has media
        if (instagramClient.media.length === 0) {
            // if the user not authorized the app, check if token was set in local storage
            if (!instagramClient.accessToken) {
                // if no access token in local storage, redirect to auth page
                if (!localStorage.getItem(IG_USER_ACCESS_TOKEN_LOCAL_STORAGE_KEY)) {
                    const instaAuthUrl = instagramClient.getUrl()
                    if (instaAuthUrl) {
                        window.location.href = instaAuthUrl
                    }
                }
            } else {
                instagramClient.getMedia(instagramClient.accessToken, setMedia)
            }
        }
    }, [instagramClient.accessToken])

    return (
        <>
            <Head>
                <title>{t(TRX.INSTAPRINT.META_TITLE)}</title>
                <meta name="description" content={t(TRX.INSTAPRINT.META_DESCRIPTION)!} />
                <meta name="robots" content="noindex" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='min-h-[80vh]'>
                <InstaprintAppView instagramClient={instagramClient}  />
            </main>
        </>
    );
}

export const getStaticProps = async ({ locale }: { locale: LocaleType }) => {
    const appId = process.env.INSTAGRAM_APP_ID!;
    const redirectUri = process.env.INSTAGRAM_APP_REDIRECT_URI!;
    return {
        props: {
            instaprintAppId: appId,
            instaprintRedirectUri: redirectUri,
            ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
        },
    };
};
