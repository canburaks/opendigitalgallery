import { Body, Button, CommonDialog, ErrorText, FieldInput, LoadingDialog } from '@/components';
import { FieldSelect } from '@/components/Atoms/forms/FieldSelect';
import { queryKeys } from '@/constants';
import { useAddresses, useCountries } from '@/data/hooks';
import { addressSchema } from '@/schemas';
import { SelectInterface } from '@/types';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import React, { FC, useMemo, useState } from 'react';
import { Button as MuiButon } from '@mui/material';

interface AddressFormProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  setSuccessFeedback: React.Dispatch<boolean>;
  selectedAddressID?: number | null;
}

export const AddressForm: FC<AddressFormProps> = ({
  setOpen,
  setSuccessFeedback,
  selectedAddressID,
}) => {
  const [openSure, setOpenSure] = useState(false);
  const user = useUser();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
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

  const { data: addressData, isLoading } = useAddresses(user?.id || '', Boolean(user?.id));
  const address =
    addressData &&
    addressData.data &&
    addressData?.data.find((item) => item.address_id === selectedAddressID);

  if (isLoading) {
    return <LoadingDialog />;
  }

  const initialAddress = {
    street: address?.street || '',
    city: address?.city || '',
    zip: address?.zip || '',
    country_id: address?.country_id.toString() || '',
    address_title: address?.address_title || '',
  };

  const onSubmit = async (values: typeof initialAddress) => {
    setLoading(true);
    setError('');
    if (selectedAddressID) {
      const { error } = await supabase
        .from('addresses')
        .update({
          ...values,
          country_id: parseInt(values.country_id),
          uid: user?.id,
        })
        .eq('address_id', selectedAddressID);

      if (error) {
        setError(error.message);
      } else {
        setSuccessFeedback(true);
        setOpen(false);
        queryClient.invalidateQueries([queryKeys.addresses, user?.id]);
      }
    } else {
      const { error } = await supabase
        .from('addresses')
        .insert({
          ...values,
          country_id: parseInt(values.country_id),
          uid: user?.id,
        })
        .eq('address_id', selectedAddressID);

      if (error) {
        setError(error.message);
      } else {
        setSuccessFeedback(true);
        setOpen(false);
        queryClient.invalidateQueries([queryKeys.addresses, user?.id]);
      }
    }

    setLoading(false);
  };

  const onDelete = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.from('addresses').delete().eq('address_id', selectedAddressID);

    if (error) {
      setError(error.message);
    } else {
      setSuccessFeedback(true);
      setOpen(false);
      queryClient.invalidateQueries([queryKeys.addresses, user?.id]);
    }
  };
  return (
    <>
      <Formik
        initialValues={initialAddress}
        validationSchema={addressSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {() => {
          return (
            <Form>
              <FieldInput fullWidth label="Address Title" name="address_title" className="mb-4" />
              <FieldSelect
                options={countriesSelect}
                name="country_id"
                className="mb-4"
                label="Country"
              />
              <FieldInput fullWidth label="City" name="city" className="mb-4" />
              <FieldInput fullWidth label="Zip Code" name="zip" className="mb-4" />
              <FieldInput fullWidth label="Street" name="street" className="mb-4" />

              <ErrorText error={error} />
              <div className="mt-10 flex justify-center gap-4">
                <Button type="submit" className="w-30">
                  <Body>Save</Body>
                </Button>
                {selectedAddressID && (
                  <MuiButon
                    color="error"
                    type="button"
                    variant="outlined"
                    className="w-30 rounded-none "
                    onClick={() => setOpenSure(true)}
                  >
                    <Body>Delete</Body>
                  </MuiButon>
                )}
                <Button onClick={() => setOpen(false)} type="button" className="w-30">
                  <Body>Close</Body>
                </Button>
              </div>
              {(isLoading || loading) && <LoadingDialog />}
            </Form>
          );
        }}
      </Formik>
      <CommonDialog open={openSure} onClose={() => setOpenSure(false)} title="Delete Address">
        <Body>Are you sure you want to delete this address?</Body>
        <div className="flex w-full justify-end pt-8 gap-4 ">
          <MuiButon
            color="error"
            type="button"
            variant="outlined"
            className="w-30 rounded-none "
            onClick={onDelete}
          >
            <Body>Delete</Body>
          </MuiButon>
          <Button>Close</Button>
        </div>
      </CommonDialog>
    </>
  );
};
