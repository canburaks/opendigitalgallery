import { motion } from 'framer-motion';
import {
  BodyX,
  Headline
} from '@/components';
import Image, { StaticImageData } from 'next/image';

export const FeatureSection = ({ title, description, authUrl, image }: { title: string, subtitle: string, description: string, authUrl: string, image: StaticImageData }) => (
  <section className="py-12 bg-white sm:py-16 lg:py-20">
    <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
      <div className="grid items-center max-w-8xl grid-cols-1 mx-auto gap-y-12 lg:grid-cols-1 gap-x-16 xl:gap-x-24">


        <div className="max-w-8xl mx-auto text-center lg:mx-auto lg:text-left flex flex-col items-center">
          <div className="flex flex-col items-center relative overflow-x-hidden">
            <Image
              className="relative transform-gpu h-auto drop-shadow-md hover:drop-shadow-2xl"
              src={image}
              height={400}
              alt="Print your Instagram photos"
            />
          </div>
          <Headline className="mt-12 font-bold !text-gray-900 text-center tracking-tight">{title}</Headline>
          <BodyX className="mt-6 font-medium !text-gray-700 text-center font-normal tracking-tight">{description}</BodyX>
          <div className="mt-4">
            <motion.a
              href={authUrl}
              title=""
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: "linear" }}
              style={{ width: 225, height: 63 }}
              className="inline-flex intense-shadow items-center justify-between uppercase bg-[#000] px-6 !py-2 mt-8 font-semibold !text-white bg-primary rounded-lg lg:mt-16 overflow-hidden" role="button">

              <div className="absolute inset-y-0 left-0 flex items-center pl-4">

              </div>
              Get started
              <svg className="w-10 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  </section>

)