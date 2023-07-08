import * as yup from 'yup';

export const resetPasswordSchema = yup.object({
  password: yup.string().required().min(6).label('Password'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required()
    .min(6)
    .label('Password'),
});
