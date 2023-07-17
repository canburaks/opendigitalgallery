import { CartView } from '@/views';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@/../next-i18next.config';
import { LocaleType } from '@/types';
import { InstaprintLandingPageView } from '@/views';
import { useTranslation } from 'next-i18next';
import { TRX } from '@/constants';

// import { I18N, LOCALES_LIST } from '@/constants';
// import { getProductDetailByHandle } from '@/data/hooks/useProductDetailByHandle';
// import { getProductOptions } from '@/data/hooks/useProductOptions';
// import { getFrames } from '@/data/hooks';

export default function InstaPrintPage() {
    const { t } = useTranslation("common");

    return (
        <>
            <Head>
                <title>{t(TRX.INSTAPRINT.META_TITLE)}</title>
                <meta name="description" content={t(TRX.INSTAPRINT.META_DESCRIPTION)!}/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />


            </Head>
            <main>
                <InstaprintLandingPageView />
            </main>
        </>
    );
}

export const getStaticProps = async ({ locale }: { locale: LocaleType }) => {

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
        },
    };
};
