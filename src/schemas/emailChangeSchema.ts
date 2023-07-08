import * as yup from 'yup';

export const emailChangeSchema = yup.object({
  email: yup.string().email().required().label('Email'),
});
