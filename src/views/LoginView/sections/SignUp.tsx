import {
  Body,
  Button,
  CommonDialog,
  ErrorText,
  FieldInput,
  Headline,
  LoadingDialog,
} from '@/components';
import { signUpSchema } from '@/schemas';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { AuthFormType } from '..';
import { Button as MuiButton } from '@mui/material';

const initialValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  passwordConfirmation: '',
};

type FormData = typeof initialValues;

interface SignUpProps {
  setView: (v: AuthFormType) => void;
}

export const SignUp: FC<SignUpProps> = ({ setView }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabaseClient = useSupabaseClient();
  const [openSuccessModal, setSuccessModal] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const authRes = await supabaseClient.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (authRes.error) {
      console.log('authRes.error', authRes.error);
      setLoading(false);

      return setError(authRes.error.message);
    }

    const userRes = await supabaseClient.from('users').insert({
      uid: authRes.data.user?.id,
      email: authRes.data.user?.email,
      first_name: data.firstName,
      last_name: data.lastName,
    });

    if (userRes.error) {
      console.log('userRes.error', userRes.error);
      setLoading(false);

      return setError(userRes.error.message);
    }

    setSuccessModal(true);
    setLoading(false);
  };

  return (
    <div className="py-4">
      <Headline className=" text-center my-4 text-darkPurple !font-light">Create Account</Headline>
      <div className="mb-4">
        <Formik initialValues={initialValues} validationSchema={signUpSchema} onSubmit={onSubmit}>
          {() => {
            return (
              <Form>
                <FieldInput fullWidth label="First Name" name="firstName" className="mb-4" />
                <FieldInput fullWidth label="Last Name" name="lastName" className="mb-4" />
                <FieldInput fullWidth label="Email" type="email" name="email" className="mb-4" />
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
                  <MuiButton className="p-0 ml-auto" onClick={() => setView('SignIn')}>
                    <Body>Have an account ?</Body>
                  </MuiButton>
                </div>
                <div className="mt-10 flex justify-center">
                  <Button type="submit" className="w-30">
                    <Body>Sign Up</Body>
                  </Button>
                </div>
                {loading && <LoadingDialog />}
              </Form>
            );
          }}
        </Formik>
      </div>
      <CommonDialog
        closeButton
        open={openSuccessModal}
        onClose={() => {
          setSuccessModal(false);
          setView('SignIn');
        }}
      >
        <Body>
          You are signed up successfuly. To complete the process, please confirm your mail.
        </Body>
      </CommonDialog>
    </div>
  );
};
