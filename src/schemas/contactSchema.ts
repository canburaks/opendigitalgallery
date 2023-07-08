import * as yup from 'yup';

export const contactSchema = yup.object({
  name: yup.string().required().label('Name'),
  email: yup.string().email().required().label('Email'),
  message: yup.string().required().label('Message'),
  recaptcha: yup.string().required().label('Recaptcha').typeError('Recaptcha is a required field'),
});

export type ContactFormTypes = yup.InferType<typeof contactSchema>;
