import React, { FC, PropsWithChildren } from 'react';
import cx from 'classnames';
import { Body } from './Typographies';
import Link, { LinkProps } from 'next/link';

interface MyLinkProps extends LinkProps {
  variant?: 'dark' | 'light';
  text?: string;
  className?: string;
}

export const MyLink: FC<PropsWithChildren<MyLinkProps>> = ({
  children,
  text,
  className,
  variant = 'dark',
  ...rest
}) => {
  const defaultClass =
    'bg-black px-6 py-2 min-h-12 font-light outline-none border-none hover:scale-105 duration-150 no-underline flex justify-center items-center';

  if (text) {
    return (
      <Link
        {...rest}
        className={cx(
          defaultClass,
          {
            'bg-black': variant === 'dark',
            'bg-white': variant === 'light',
          },
          className
        )}
      >
        <Body
          className={cx({
            'text-black': variant === 'light',
            'text-white': variant === 'dark',
          })}
        >
          {text}
        </Body>
      </Link>
    );
  } else {
    return (
      <Link
        {...rest}
        className={cx(
          defaultClass,
          {
            'bg-black': variant === 'dark',
            'bg-white': variant === 'light',
            'text-black': variant === 'light',
            'text-white': variant === 'dark',
          },
          className
        )}
      >
        {children}
      </Link>
    );
  }
};
