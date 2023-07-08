import * as yup from 'yup';

export const forgetPasswordSchema = yup.object({
  email: yup.string().email().required().label('Email'),
});
