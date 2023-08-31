import React, { useEffect } from 'react';
import { SectionContainer } from '@/components';
import { motion } from 'framer-motion';
import { InstaFeed, NextButton, PrevButton, InstaSelection, InstaCartPreview } from './sections';
import { useInstaprintProducts } from '@/data/hooks';
import { UseInstaprintStore } from '@/data/stores';

export const InstaprintAppView = () => {
  const instaprintDbProducts = useInstaprintProducts();
  const setInstaprintProducts = UseInstaprintStore((state) => state.setInstaprintProducts);

  useEffect(() => {
    if (instaprintDbProducts?.instaprintProduct && instaprintDbProducts?.frames) {
      setInstaprintProducts({
        instaprint: instaprintDbProducts?.instaprintProduct,
        frames: instaprintDbProducts?.frames,
      });
    }
  }, [instaprintDbProducts]);

  return (
    <SectionContainer>
      <div
        style={{ position: 'relative', width: '100%', height: 'auto', maxHeight: '80vh' }}
        className="min-h-120 p-4 rounded-sm md:rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden mb-12"
      >
        <div className="flex flex-col justify-start">
          <div className="w-full flex flex-col flex-grow">
            <motion.div className="w-full flex flex-col  overflow-x-hidden overflow-y-scroll h-auto min-h-[300px] max-h-[70vh]">
              <InstaFeed key="instafeed" />
              <InstaSelection key="instaselection" />
              <InstaCartPreview key="instacartpreview" />
            </motion.div>
          </div>

          <div className="flex w-full justify-between p-0 mb-8 bg-white mt-6">
            <PrevButton />
            <NextButton />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
