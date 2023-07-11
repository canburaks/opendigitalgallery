import * as yup from 'yup';

export const addressSchema = yup.object({
  address_title: yup.string().label('Address Title'),
  country_id: yup.string().required().label('Country'),
  zip: yup.number().required().label('Zip'),
  city: yup.string().required().label('City'),
  address_detail: yup.string().required().label('Address Detail'),
});
