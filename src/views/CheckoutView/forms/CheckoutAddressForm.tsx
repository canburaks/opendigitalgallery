import { FieldInput } from '@/components';
import { FieldSelect } from '@/components/Atoms/forms/FieldSelect';
import { useAddresses, useCountries, useUser } from '@/data/hooks';
import { addressSchema } from '@/schemas';
import { SelectInterface } from '@/types';
import { Form, Formik, FormikProps } from 'formik';
import React, { forwardRef, useMemo } from 'react';

export interface CheckoutAddressFormType {
  address_detail: string;
  city: string;
  zip: string;
  country_id: string;
}

type RefType = FormikProps<CheckoutAddressFormType>;

export const CheckoutAddressForm = forwardRef<RefType>((props, ref) => {
  const { user } = useUser();
  const { data: addressData } = useAddresses(user?.id || '', Boolean(user?.id));
  const { data: countriesData } = useCountries({
    select: ['name', 'country_id'],
  });

  const countriesSelect = useMemo(() => {
    const countriesSelectVal: SelectInterface[] = [{ value: '', label: '', key: '' }];

    if (countriesData && countriesData.data && countriesData.data.length > 0) {
      countriesData.data.forEach((country) => {
        if (country.name) {
          countriesSelectVal.push({
            value: country.country_id.toString(),
            label: country.name,
            key: country.country_id.toString(),
          });
        }
      });
    }

    return countriesSelectVal;
  }, [countriesData]);

  const address = addressData && addressData.data && addressData?.data[0];

  const initialAddress = {
    address_detail: address?.address_detail || '',
    city: address?.city || '',
    zip: address?.zip || '',
    country_id: address?.country_id.toString() || '',
  };

  return (
    <Formik
      innerRef={ref}
      initialValues={initialAddress}
      validationSchema={addressSchema}
      onSubmit={() => {}}
      enableReinitialize
    >
      {() => {
        return (
          <Form className="flex flex-col gap-4 w-full mt-2">
            <FieldSelect options={countriesSelect} name="country_id" label="Country" />
            <FieldInput fullWidth label="City" name="city" />
            <FieldInput fullWidth label="Zip Code" name="zip" />
            <FieldInput multiline rows={2} fullWidth label="Address Detail" name="address_detail" />
          </Form>
        );
      }}
    </Formik>
  );
});

CheckoutAddressForm.displayName = 'CheckoutAddressForm';
