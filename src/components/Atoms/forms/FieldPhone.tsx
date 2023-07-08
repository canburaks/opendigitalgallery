import React, { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { FormControl } from '@mui/material';
import { useField } from 'formik';
import cx from 'classnames';
import { ErrorText } from './ErrorText';

interface Props {
  name: string;
  defaultVal?: string;
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  errorView?: boolean;
}

export function FieldPhone({
  defaultVal,
  label,
  disabled,
  fullWidth = true,
  name,
  errorView,
}: Props) {
  const id = useMemo(() => uuidv4(), []);
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && !!meta.error;
  // eslint-disable-next-line
  const { onChange, ...rest } = field;

  useEffect(() => {
    if (defaultVal) {
      helpers.setValue(defaultVal);
    }
  }, [defaultVal, helpers]);

  return (
    <div>
      <FormControl
        fullWidth={fullWidth}
        variant="outlined"
        margin="normal"
        key={id}
        focused={true}
        className={cx(
          '!flex !flex-wrap bg-transparent !border-[1px] !border-gray-300 !m-0 !border-solid !py-[15px] !px-[28px] !rounded-[4px] !box-border',
          {
            '!border-muiError': showError || errorView,
          }
        )}
      >
        <PhoneInput
          international
          disabled={disabled}
          id={id}
          key={id}
          defaultCountry="GB"
          placeholder={label}
          className={cx('', {
            '!text-muiError': errorView,
          })}
          onChange={(e) => {
            helpers.setValue(e);
          }} // return undefined when empty causes error on formik.
          {...rest}
        />
      </FormControl>
      <ErrorText error={(meta.touched && meta.error) || ''} />
    </div>
  );
}
