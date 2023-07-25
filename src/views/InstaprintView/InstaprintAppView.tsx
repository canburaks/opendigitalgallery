import React from 'react';
import {SectionContainer,} from '@/components';
// import { useProductPricesByIDs } from '@/data/hooks';
// import { PRODUCT_IMAGE_PLACEHOLDER, TRX, PAGES, ProductType } from '@/constants';
import { motion, AnimatePresence } from "framer-motion"
// import useDimensions from "react-cool-dimensions";
// import { useProductsByIDs } from '@/data/hooks/useProductsByIDs';
// import { useMediaQuery } from '@mui/material';
// import { FeatureSection } from "./sections";
// import { useTranslation } from 'next-i18next';
// import { useCartStore } from '@/data/stores';
// import { instagramClient } from '@/data/instagramClient';
// import { IGMedia, CartProduct } from '@/types';
// import { CheckCircle as TickIcon, ArrowCircleLeft as ArrowLeftIcon, ArrowCircleRight as ArrowRightIcon } from '@mui/icons-material';
import { InstaFeed, NextButton, PrevButton, InstaSelection } from './sections';
import { Instagram } from '@/data/instagramClient';

export const InstaprintAppView = ({instagramClient}:{instagramClient: Instagram}) => {

    return (
        <SectionContainer>
            <div style={{ position: "relative", width: "100%", height: "auto", maxHeight: "80vh" }}
                className="min-h-120 p-4 rounded-sm md:rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden mb-12"
            >
                <div className='flex flex-col justify-start'>
                    <div className="w-full flex flex-col flex-grow">
                        <motion.div className="w-full flex flex-col  overflow-x-hidden overflow-y-scroll h-auto min-h-[300px] max-h-[70vh]">
                            <AnimatePresence>
                                <InstaFeed />
                                <InstaSelection />
                                {/* 
                                {page === 1 && 
                                }
                                {page === 2 && <InstaSelection />}
                                {page === 3 && <InstaCartPreview />} */}

                            </AnimatePresence>
                        </motion.div>
                    </div>

                    <div className="flex w-full justify-between p-0 mb-8 bg-white mt-6">
                        <PrevButton />
                        <NextButton />
                    </div>
                </div>
            </div >
        </SectionContainer>
    );
};
