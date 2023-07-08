import { Body, Button, ErrorText, FieldInput, Headline, LoadingDialog } from '@/components';
import { signInSchema } from '@/schemas';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { AuthFormType } from '..';
import { Button as MuiButton } from '@mui/material';
import { useRouter } from 'next/router';

const initialValues = {
  email: '',
  password: '',
};

type FormData = typeof initialValues;

interface SignInProps {
  setView: (v: AuthFormType) => void;
}

export const SignIn: FC<SignInProps> = ({ setView }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');
    const res = await supabaseClient.auth.signInWithPassword({
      ...data,
    });
    setLoading(false);
    if (res.error) {
      return setError(res.error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <div className=" py-4">
      <Headline className=" text-center my-4 text-darkPurple !font-light">Sign In</Headline>
      <div className="mb-4">
        <Formik initialValues={initialValues} validationSchema={signInSchema} onSubmit={onSubmit}>
          {() => {
            return (
              <Form>
                <FieldInput fullWidth label="Email" type="email" name="email" className="mb-4" />
                <FieldInput
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  className="mb-4"
                />

                <div className="flex justify-between items-center">
                  <MuiButton className="p-0" onClick={() => setView('ResetPassword')}>
                    <Body>Forgot password ?</Body>
                  </MuiButton>
                  <MuiButton className="p-0" onClick={() => setView('SignUp')}>
                    <Body>Create an account</Body>
                  </MuiButton>
                </div>
                <ErrorText error={error} />

                <div className="mt-10 flex justify-center">
                  <Button type="submit" className="w-30">
                    <Body>Sign In</Body>
                  </Button>
                </div>
                {loading && <LoadingDialog />}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
