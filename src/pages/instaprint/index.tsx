// import { CartView } from '@/views';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@/../next-i18next.config';
import { LocaleType } from '@/types';
import { InstaprintLandingPageView } from '@/views';
import { useTranslation } from 'next-i18next';
import { TRX } from '@/constants';
import { Instagram } from '@/data/instagramClient';
// import { I18N, LOCALES_LIST } from '@/constants';
// import { getProductDetailByHandle } from '@/data/hooks/useProductDetailByHandle';
// import { getProductOptions } from '@/data/hooks/useProductOptions';
// import { getFrames } from '@/data/hooks';

export default function InstaPrintPage(props: any) {
    const { t } = useTranslation("common");
    const instagramClient = new Instagram(props.instaprintAppId, props.instaprintRedirectUri);
    return (
        <>
            <Head>
                <title>{t(TRX.INSTAPRINT.META_TITLE)}</title>
                <meta name="description" content={t(TRX.INSTAPRINT.META_DESCRIPTION)!}/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />


            </Head>
            <main>
                <InstaprintLandingPageView instaprintClient={instagramClient} />
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
