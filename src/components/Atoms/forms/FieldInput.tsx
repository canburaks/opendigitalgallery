import React from 'react';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { useField } from 'formik';

// eslint-disable-next-line
type InputProps = {} & TextFieldProps;

export const Input: React.FC<InputProps> = ({ ...rest }) => {
  return <TextField variant="standard" {...rest} />;
};
export const FieldInput: React.FC<InputProps & { name: string }> = ({ name, ...rest }) => {
  const [field, meta] = useField(name);
  const showError = meta.touched && !!meta.error;
  return (
    <TextField
      variant="outlined"
      {...rest}
      {...field}
      error={showError}
      helperText={showError ? meta.error : ''}
    />
  );
};
