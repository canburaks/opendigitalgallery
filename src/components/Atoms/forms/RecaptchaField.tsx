import { FormikProps } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import cx from 'classnames';
import { ErrorText } from './ErrorText';
interface RecaptchaFieldType {
  recaptcha: string;
}

interface RecaptchaFieldProps<T> {
  id: string;
  formikProps: FormikProps<T & RecaptchaFieldType>;
  className?: string;
}

export const RecaptchaComp = function <T>(
  props: RecaptchaFieldProps<T>,
  ref: React.ForwardedRef<ReCAPTCHA & HTMLDivElement>
) {
  const { id, formikProps, className } = props;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const rescaleCaptcha = () => {
      const RECAPTCHA_DEFAULT_UNCHANGABLE_WIDTH = 302;
      const parent: HTMLDivElement = document.querySelector(`#${id}`)!;
      const width = parent?.clientWidth;
      const scale = width / RECAPTCHA_DEFAULT_UNCHANGABLE_WIDTH;
      parent && (parent.style.transform = `scale(${scale})`);
      parent && (parent.style.transformOrigin = '0 0');
    };
    rescaleCaptcha();
    window.addEventListener('resize', rescaleCaptcha);

    return () => window.removeEventListener('resize', rescaleCaptcha);
  }, [id]);

  return (
    <div id={id} className={cx(className)}>
      <ReCAPTCHA
        ref={ref}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
        hl="en"
        onChange={(value) => {
          formikProps.setFieldValue('recaptcha', value, true);
        }}
      />
      {formikProps.errors.recaptcha && formikProps.touched.recaptcha && (
        <ErrorText error={formikProps.errors.recaptcha.toString()} />
      )}
    </div>
  );
};

export const RecaptchaField = React.forwardRef(RecaptchaComp) as <T>(
  props: RecaptchaFieldProps<T> & {
    ref?: React.ForwardedRef<ReCAPTCHA & HTMLDivElement>;
  }
) => ReturnType<typeof RecaptchaComp>;
