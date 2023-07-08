import React, { FC, PropsWithChildren } from 'react';
import cx from 'classnames';

// Note: use this component for every page section component as a wrapper to have a consistent horizontal padding in a page, also for larger screens we limit the width to 1500px

interface SectionContainerProps {
  className?: string;
}

export const SectionContainer: FC<PropsWithChildren<SectionContainerProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cx(
        'break1200:px-20 break1000:px-10 break450:px-10 px-5 max-w-[1500px] m-auto mb-[50px]',
        className
      )}
    >
      {children}
    </div>
  );
};
