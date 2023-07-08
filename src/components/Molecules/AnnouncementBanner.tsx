import React, { FC, PropsWithChildren } from 'react';
import cx from 'classnames';
import { BodyS } from '@/components';
import EastSharpIcon from '@mui/icons-material/EastSharp';

interface AnnouncementBannerProps {
  className?: string;
}

export const AnnouncementBanner: FC<PropsWithChildren<AnnouncementBannerProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cx(
        'h-[44px] py-3 flex justify-center items-center text-white bg-black w-full',
        className
      )}>
      {children ? (
        children
      ) : (
        <>
          <BodyS className="uppercase tracking-wider mr-4">Pay 2 get 3 & free shipping</BodyS>
          <EastSharpIcon fontSize="small" className="w-5" />
        </>
      )}
    </div>
  );
};
