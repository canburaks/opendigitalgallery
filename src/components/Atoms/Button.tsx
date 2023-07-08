import React, { FC, PropsWithChildren, ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
import { Body } from './Typographies';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'dark' | 'light';
  text?: string;
  className?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  text,
  className,
  variant = 'dark',
  ...rest
}) => {
  const defaultClass =
    'bg-black px-6 py-2 min-h-12 outline-none border-none hover:scale-105 duration-150 cursor-pointer font-[unset]';

  if (text) {
    return (
      <button
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
      </button>
    );
  } else {
    return (
      <button
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
      </button>
    );
  }
};
