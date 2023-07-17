import React from 'react';
import {
    Body2X,
    BodyX,
    Body,
    BodyL,
    BodyS,
    Button,
    CartProductList,
    HeadlineX,
    SectionContainer,
} from '@/components';
import { motion } from 'framer-motion';
import { FeatureSection} from "./sections";
import { useTranslation } from 'next-i18next';
import { instagramClient } from '@/data/instagramClient';
import { TRX } from '@/constants';
import Image from 'next/image';
import heroPic1 from "../../../public/images/instaprint-hero.webp"
import heroPic2 from "../../../public/images/instaprint-hero-wide.webp"

export const InstaprintLandingPageView = () => {
    const { t } = useTranslation("common");

    return (
        <SectionContainer>
            <div className="bg-white">

                <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-12 lg:py-24 min-h-[700px]">
                    <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
                        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                            <div>
                                <HeadlineX className="font-bold !text-gray-900">{t(TRX.INSTAPRINT.HERO_TITLE)}</HeadlineX>
                                <BodyX className="font-medium !text-gray-700 mt-8">{t(TRX.INSTAPRINT.HERO_DESCRIPTION)}</BodyX>
                                <motion.a
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2, ease: "linear" }}
                                    href={instagramClient.authUrl}
                                    title=""
                                    className="inline-flex intense-shadow items-center bg-[#721cff] px-6 !py-2 mt-8 font-semibold !text-white bg-primary rounded-lg lg:mt-16 overflow-hidden" role="button">
                                    {t(TRX.INSTAPRINT.HERO_CTA)}
                                    <svg className="w-12 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </motion.a>

                            </div>

                            <div>
                                <Image 
                                    width={500}
                                    src={heroPic1} alt="Print your Instagram photos"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <div className='min-h-[900px]'>
                    <FeatureSection
                        title={t(TRX.INSTAPRINT.SECTION1_TITLE)}
                        subtitle={t(TRX.COMMON.BRAND)}
                        description={t(TRX.INSTAPRINT.SECTION1_DESCRIPTION)}
                        authUrl={instagramClient.authUrl}
                        image={heroPic2}
                    />
                </div>
            </div>
        </SectionContainer>
    );
};
