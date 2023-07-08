import {
  Body,
  Button,
  ErrorText,
  FieldInput,
  Headline,
  LoadingDialog,
  SectionContainer,
} from '@/components';
import { resetPasswordSchema } from '@/schemas';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Button as MuiButton } from '@mui/material';
import { useRouter } from 'next/router';

const initialValues = {
  password: '',
  passwordConfirmation: '',
};

type FormData = typeof initialValues;

export const UpdatePasswordView: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  // const accessToken = router.query.access_token as string;

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');
    const res = await supabaseClient.auth.updateUser({
      password: data.password,
    });
    setLoading(false);
    if (res.error) {
      return setError(res.error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <SectionContainer>
      <div className="max-w-[500px] m-auto py-4">
        <Headline className=" text-center my-4 text-darkPurple !font-light">
          Update Password
        </Headline>
        <div className="mb-4">
          <Formik
            initialValues={initialValues}
            validationSchema={resetPasswordSchema}
            onSubmit={onSubmit}
          >
            {() => {
              return (
                <Form onChange={() => setError('')}>
                  <FieldInput
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    className="mb-4"
                  />
                  <FieldInput
                    fullWidth
                    label="Password Confirmation"
                    type="password"
                    name="passwordConfirmation"
                    className="mb-4"
                  />

                  <div className="flex justify-between items-center">
                    <ErrorText error={error} />
                    <MuiButton className="p-0 ml-auto" onClick={() => {}}>
                      <Body>Have an account ?</Body>
                    </MuiButton>
                  </div>

                  <div className="mt-10 flex justify-center">
                    <Button type="submit" className="w-50">
                      <Body>Update Password</Body>
                    </Button>
                  </div>
                  {loading && <LoadingDialog />}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </SectionContainer>
  );
};
