import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectProps } from '@mui/material';
import { useField } from 'formik';
import cx from 'classnames';
import { SelectInterface } from '@/types';

type InputProps = {
  options: string[] | SelectInterface[];
  disabledValue?: string;
  label?: string;
  errorView?: boolean;
} & SelectProps;

export const FieldSelect: React.FC<InputProps & { name: string }> = ({
  name,
  options,
  disabledValue,
  label,
  disabled,
  errorView,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const showError = !disabled ? meta.touched && !!meta.error : false;

  if (disabledValue && disabled) {
    field.value = disabledValue;
  }

  return (
    <div className={cx(rest.className)}>
      <FormControl fullWidth>
        {label && (
          <InputLabel
            className={cx('bg-white ', {
              'text-muiError': errorView,
            })}
            id={name}
          >
            {label}
          </InputLabel>
        )}
        <Select
          id={name}
          disabled={disabled}
          {...field}
          {...rest}
          error={showError || errorView}
          className={cx('swiper-no-swiping', {
            'text-muiError': errorView,
          })}
        >
          {options.map((option) => {
            if (typeof option === 'string') {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
            } else {
              return (
                <MenuItem key={option.key} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            }
          })}
        </Select>
        <FormHelperText className="text-muiError">{showError ? meta.error : ''}</FormHelperText>
      </FormControl>
    </div>
  );
};
