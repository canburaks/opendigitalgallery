import * as yup from 'yup';

export const passwordChangeSchema = yup.object({
  currentPassword: yup.string().required().min(6).label('Current Password'),
  newPassword: yup.string().required().min(6).label('Password'),
  newPasswordConfirmation: yup
    .string()
    .required()
    .label('New Password Confirmation')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});
