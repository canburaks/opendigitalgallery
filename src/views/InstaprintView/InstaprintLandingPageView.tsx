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
import { FeatureSection } from "./sections";
import { useTranslation } from 'next-i18next';
import { instagramClient } from '@/data/instagramClient';
import { TRX } from '@/constants';
import Image from 'next/image';
import heroPic1 from "../../../public/images/instaprint/instaprint-hero.webp"
import heroPic2 from "../../../public/images/instaprint/instaprint-hero-wide.webp"


const iconVariants = {
    hidden: {
        pathLength: 0,
        // transition: {
        //     repeat: Infinity,
        //     repeatType: "loop",
        //     reverse: true,
        //     duration: 2,
        //     ease: "easeInOut"
        // }
    },
    visible: {
        pathLength: 1,
        transition: {
            pathLength: { type: "spring", duration: 5, bounce: 0 }
        }
    }
}

export const InstaprintLandingPageView = () => {
    const { t } = useTranslation("common");

    return (
        <SectionContainer>
            <div className="bg-white">

                <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-12 lg:py-24 min-h-[700px] rounded-[42px]">
                    <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
                        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                            <div>
                                <HeadlineX className="font-bold !text-gray-900 tracking-tighter">{t(TRX.INSTAPRINT.HERO_TITLE)}</HeadlineX>
                                <BodyX className="!text-gray-700 mt-8 font-normal tracking-tight">{t(TRX.INSTAPRINT.HERO_DESCRIPTION)}</BodyX>
                                <motion.a
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2, ease: "linear" }}
                                    href={instagramClient.authUrl}
                                    style={{ width: 225, height: 63 }}
                                    title=""
                                    className="inline-flex intense-shadow uppercase justify-between items-center bg-black px-6 !py-2 mt-8 font-semibold !text-white bg-primary rounded-lg lg:mt-16 overflow-hidden" role="button">
                                    {t(TRX.INSTAPRINT.HERO_CTA)}
                                    <svg className="w-10 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </motion.a>

                                <motion.svg
                                    className="w-36 h-36"
                                    viewBox="0 0 162 119"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    transition={{
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        reverse: true,
                                        duration: 6,
                                        ease: "easeInOut"
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                    }}
                                    initial={{
                                        x: 250, y: -125, rotateZ: -155
                                    }}
                                >
                                    <motion.path variants={iconVariants}
                                        initial="hidden"
                                        animate={"visible"}
                                        d="M0.913757 114.53C13.9807 116.216 32.3056 122.378 43.7012 113.083C51.0025 107.128 57.0714 99.6064 62.6869 92.0921C73.647 77.4257 81.4769 57.0014 83.9262 38.9656C86.7749 17.9886 65.2558 22.4197 58.3958 36.6239C48.6178 56.8698 53.4826 94.2165 79.0133 100.444C108.309 107.591 123.562 71.7844 130.096 49.9154C134.773 34.2631 153.849 -9.9389 143.644 2.81731C137.309 10.736 128.12 15.6577 122.008 23.6058C118.81 27.7641 121.911 27.9558 125.382 25.0963C131.067 20.4118 136.477 14.6482 140.667 8.60318C141.379 7.57589 145.275 0.763508 146.837 3.12604C151.902 10.7886 153.525 20.5514 158.568 28.4832" stroke="currentColor" stroke-width="2" stroke-linecap="round"></motion.path>
                                    <motion.path variants={iconVariants}
                                        initial="hidden"
                                        animate={"visible"}
                                        d="M132.848 24.4348C141.945 26.8851 150.961 28.4036 160.05 30.4235C162.841 31.0437 159.046 30.7305 158.171 30.7851"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"></motion.path>
                                </motion.svg>

                            </div>

                            <div>
                                <Image
                                    width={500}
                                    className='rounded-3xl'
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
