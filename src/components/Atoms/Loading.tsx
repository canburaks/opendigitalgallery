import { CircularProgress, CircularProgressProps } from '@mui/material';
import React, { FC } from 'react';
import cx from 'classnames';

type LoadingProps = CircularProgressProps & {
  className?: string;
};

export const Loading: FC<LoadingProps> = ({ className, ...rest }) => {
  return (
    <div className={cx('flex justify-center p-10', className)}>
      <CircularProgress {...rest} />
    </div>
  );
};
