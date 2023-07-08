import * as yup from 'yup';

export const checkoutContactSchema = yup.object({
  firstName: yup.string().required().label('First name'),
  lastName: yup.string().required().label('Last name'),
  email: yup.string().email().required().label('Email'),
});
