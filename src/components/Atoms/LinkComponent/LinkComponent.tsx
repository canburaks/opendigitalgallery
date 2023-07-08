import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DEFAULT_LOCALE } from '@/constants';
import { Url } from 'url';
import cx from 'classnames';

interface Props {
  children?: React.ReactNode;
  className?: string;
  skipLocaleHandling?: boolean;
  href?: string | URL;
  locale?: string;
  id?: string;
}

export const LinkComponent = (props: Props) => {
  const router = useRouter();
  const locale = props.locale ? props.locale : router.query.locale;
  if (locale === DEFAULT_LOCALE) props.skipLocaleHandling = true;

  let href = (props?.href || router?.asPath) as string | Url;
  if (href && href.toString().indexOf('http') === 0) props.skipLocaleHandling = true;

  // Localized href
  if (locale && !props?.skipLocaleHandling) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace('[locale]', props?.locale as string);
  }

  return (
    <>
      <Link {...props} href={href} className={cx('no-underline text-black', props.className)}>
        {props.children}
      </Link>
    </>
  );
};

export default LinkComponent;
