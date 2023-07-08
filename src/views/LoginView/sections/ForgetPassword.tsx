import { Body, Button, ErrorText, FieldInput, Headline, LoadingDialog } from '@/components';
import { forgetPasswordSchema } from '@/schemas';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { AuthFormType } from '..';
import { Button as MuiButton } from '@mui/material';
import { useRouter } from 'next/router';

const initialValues = {
  email: '',
};

type FormData = typeof initialValues;

interface ForgetPasswordProps {
  setView: (v: AuthFormType) => void;
}

export const ForgetPassword: FC<ForgetPasswordProps> = ({ setView }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');
    const res = await supabaseClient.auth.resetPasswordForEmail(data.email, {
      redirectTo: 'http://localhost:3000/updatePassword',
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
      <Headline className=" text-center my-4 text-darkPurple !font-light">Reset Password</Headline>
      <div className="mb-4">
        <Formik
          initialValues={initialValues}
          validationSchema={forgetPasswordSchema}
          onSubmit={onSubmit}
        >
          {() => {
            return (
              <Form>
                <FieldInput fullWidth label="Email" type="email" name="email" className="mb-4" />

                <div className="flex justify-between items-center">
                  <ErrorText error={error} />
                  <MuiButton className="p-0 ml-auto" onClick={() => setView('SignIn')}>
                    <Body>Have an account ?</Body>
                  </MuiButton>
                </div>

                <div className="mt-10 flex justify-center">
                  <Button type="submit" className="w-40">
                    <Body>Send Email</Body>
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
