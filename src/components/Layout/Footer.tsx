import React, { useMemo } from 'react';
import { BodyS, Divider, HeadlineXS } from '../Atoms';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import { socialMedia } from '@/constants/externalLinks';
import { useCollections } from '@/data/hooks';

export const Footer = () => {
  const { data: collections } = useCollections();

  const collectionLinks = useMemo(() => {
    const links: Record<string, string> = {};
    collections?.data?.forEach((collection) => {
      if (collection.description && collection.handle) {
        links[collection.description] = `/collections/${collection.handle}`;
      }
    });
    return links;
  }, [collections]);

  const links = {
    'Open Digital Gallery': {
      'Home Page': '/',
      About: '/about',
      Contact: '/contact',
    },
    Products: {
      'Art prints': '/art-prints',
      Frames: '/frames',
      Collections: '/collections',
    },
    Collections: collectionLinks,
    Information: {
      Blog: '/posts',
      'F.A.Q.': '/frequently-asked-questions',
      'Shipping Policy': '/',
      'Privacy Policy': '/',
      'Terms of Service': '/',
      'Refund Policy': '/',
      Glossary: '/glossary',
    },
  };

  return (
    <footer className="bg-myBlack-200 text-white ">
      {/* Links */}
      <div className="grid grid-cols-1 gap-10 break500:grid-cols-2 break850:grid-cols-4  py-16 break1000:ml-20 ml-12">
        {Object.entries(links).map(([key, value]) => {
          return (
            <div key={key}>
              <HeadlineXS className="font-light mb-4 ">{key}</HeadlineXS>
              <div>
                <ul className="list-none">
                  {Object.entries(value).map(([key, value]) => {
                    return (
                      <li key={key}>
                        <Link
                          className="no-underline text-white hover:underline hover:opacity-10 opacity-6 font-light"
                          href={value}
                        >
                          <BodyS className="py-2"> {key}</BodyS>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Media */}
      <div className="flex gap-8  justify-center w-full">
        <Link href={socialMedia.twitter} target="_blank">
          <TwitterIcon className="text-white hover:scale-110" />
        </Link>
        <Link href={socialMedia.facebook} target="_blank">
          <FacebookIcon className="text-white hover:scale-110" />
        </Link>
        <Link href={socialMedia.pinterest} target="_blank">
          <PinterestIcon className="text-white hover:scale-110" />
        </Link>
        <Link href={socialMedia.instagram} target="_blank">
          <InstagramIcon className="text-white hover:scale-110" />
        </Link>
        <Link href={socialMedia.telegram} target="_blank">
          <TelegramIcon className="text-white hover:scale-110" />
        </Link>
      </div>

      <Divider direction="horizontal" className="my-10" />

      {/* Copyright */}
      <div className="pb-10 text-center">
        <BodyS className="text-white opacity-6">© 2023, Open Digital Gallery</BodyS>
      </div>
    </footer>
  );
};
