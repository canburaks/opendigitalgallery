import React, { PropsWithChildren } from 'react';
import cx from 'classnames';

const fontSizes = {
  HeadlineX: 'sm:text-5xl text-4xl sm:leading-[55px] font-light ',
  Headline: 'sm:text-4xl text-3xl font-light',
  HeadlineS: 'sm:text-3xl text-2xl font-light',
  HeadlineXS: 'sm:text-2xl text-xl font-light',
  Headline2XS: 'sm:text-xl text-lg font-light',

  Body2X: 'sm:text-2xl text-xl font-light',
  BodyX: 'sm:text-xl text-lg font-light',
  BodyL: 'sm:text-lg text-base font-light',
  Body: 'text-base font-light',
  BodyS: 'text-sm font-light',
  BodyXS: 'text-xs font-light',

};

interface TypeProps {
  className?: string;
}

export const HeadlineX: React.FC<PropsWithChildren<TypeProps>> = ({ children, className }) => {
  return <h1 className={cx(fontSizes.HeadlineX, className)}>{children}</h1>;
};

export const Headline: React.FC<PropsWithChildren<TypeProps>> = ({ children, className }) => {
  return <h2 className={cx(fontSizes.Headline, className)}>{children}</h2>;
};

export const HeadlineS: React.FC<PropsWithChildren<TypeProps>> = ({ children, className }) => {
  return <h3 className={cx(fontSizes.HeadlineS, className)}>{children}</h3>;
};

export const HeadlineXS: React.FC<PropsWithChildren<TypeProps>> = ({ children, className }) => {
  return <h3 className={cx(fontSizes.HeadlineXS, className)}>{children}</h3>;
};
export const Headline2XS: React.FC<PropsWithChildren<TypeProps>> = ({ children, className }) => {
  return <h4 className={cx(fontSizes.Headline2XS, className)}>{children}</h4>;
};

export const Body2X: React.FC<PropsWithChildren<TypeProps>> = ({ children, className }) => {
  return <p className={cx(fontSizes.Body2X, className)}>{children}</p>;
};

export const BodyX: React.FC<PropsWithChildren<TypeProps>> = ({ children, className }) => {
  return <p className={cx(fontSizes.BodyX, className)}>{children}</p>;
};

export const Body: React.FC<PropsWithChildren<TypeProps>> = ({ children, className }) => {
  return <p className={cx(fontSizes.Body, className)}>{children}</p>;
};
export const BodyL: React.FC<PropsWithChildren<TypeProps>> = ({ children, className }) => {
  return <p className={cx(fontSizes.BodyL, className)}>{children}</p>;
};

export const BodyS: React.FC<PropsWithChildren<TypeProps>> = ({ children, className }) => {
  return <p className={cx(fontSizes.BodyS, className)}>{children}</p>;
};
export const BodyXS: React.FC<PropsWithChildren<TypeProps>> = ({ children, className }) => {
  return <p className={cx(fontSizes.BodyXS, className)}>{children}</p>;
};