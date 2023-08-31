import { Body, Button, ErrorText, FieldInput, FieldPhone, LoadingDialog } from '@/components';
import { queryKeys } from '@/constants';
import { usePublicUser } from '@/data/hooks';
import { personalEditSchema } from '@/schemas';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';

interface PersonalInformationFormProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  setSuccessFeedback: React.Dispatch<boolean>;
}

export const PersonalInformationForm: FC<PersonalInformationFormProps> = ({
  setOpen,
  setSuccessFeedback,
}) => {
  const queryClient = useQueryClient();
  const user = useUser();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient();

  const { data: userData, isLoading } = usePublicUser(user ? user.id : '', Boolean(user?.id));

  const initialPersonalValues = {
    firstName: userData?.first_name || '',
    lastName: userData?.last_name || '',
    phone: userData?.phone_number || '',
  };

  const onSubmit = async (personalValues: typeof initialPersonalValues) => {
    // intial settings
    setError('');
    setLoading(true);

    // Check: any change
    if (
      userData?.first_name === personalValues.firstName &&
      userData?.last_name === personalValues.lastName &&
      userData?.phone_number === personalValues.phone
    ) {
      setLoading(false);
      setOpen(false);
      return;
    }

    // Perform: CRUD
    const { error } = await supabase.from('users').upsert({
      first_name: personalValues.firstName,
      last_name: personalValues.lastName,
      phone_number: personalValues.phone,
      uid: userData?.uid,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccessFeedback(true);
      queryClient.invalidateQueries([queryKeys.users, user?.id]);
    }

    setOpen(false);
    setLoading(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialPersonalValues}
        validationSchema={personalEditSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {() => {
          return (
            <Form>
              <FieldInput fullWidth label="First Name" name="firstName" className="mb-4" />
              <FieldInput fullWidth label="Last Name" name="lastName" className="mb-4" />
              <FieldPhone name="phone" label="Phone Number" />
              <ErrorText error={error} />
              <div className="mt-10 flex justify-center gap-4">
                <Button type="submit" className="w-30">
                  <Body>Save</Body>
                </Button>
                <Button onClick={() => setOpen(false)} type="button" className="w-30">
                  <Body>Close</Body>
                </Button>
              </div>
              {(isLoading || loading) && <LoadingDialog />}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
