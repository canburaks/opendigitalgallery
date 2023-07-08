import React, { FC } from 'react';
import cx from 'classnames';

interface DividerProps {
  direction: 'vertical' | 'horizontal';
  className?: string;
}

export const Divider: FC<DividerProps> = ({ direction, className }) => {
  return (
    <div
      className={cx(
        {
          'h-[1.4px] bg-black opacity-1 w-full': direction === 'horizontal',
          'bg-black opacity-1 w-[1.4px] self-stretch': direction === 'vertical',
        },
        className
      )}
    />
  );
};
