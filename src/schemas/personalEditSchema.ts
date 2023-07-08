import * as yup from 'yup';

export const personalEditSchema = yup.object({
  firstName: yup.string().required().label('First name'),
  lastName: yup.string().required().label('Last name'),
  phone: yup.string().label('Phone'),
});
