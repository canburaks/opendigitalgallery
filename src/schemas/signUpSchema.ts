import * as yup from 'yup';

export const signUpSchema = yup.object({
  firstName: yup.string().required().label('First name'),
  lastName: yup.string().required().label('Last name'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().min(6).label('Password'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required()
    .min(6)
    .label('Password'),
});
