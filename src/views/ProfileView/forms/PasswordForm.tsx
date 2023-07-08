import { Body, Button, ErrorText, FieldInput, LoadingDialog } from '@/components';
import { passwordChangeSchema } from '@/schemas';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

interface EmailFormProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  setSuccessFeedback: React.Dispatch<boolean>;
}

const initialValue = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
};

export const PasswordForm: FC<EmailFormProps> = ({ setOpen }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter();

  const onSubmit = async (values: typeof initialValue) => {
    setLoading(true);
    setError('');

    const res = await supabase.rpc('change_user_password', {
      current_plain_password: values.currentPassword,
      new_plain_password: values.newPassword,
    });

    if (res.error) {
      setError(res.error.message);
    } else {
      setOpen(false);

      setTimeout(() => {
        supabase.auth.signOut().then(() => {
          router.push('/login');
        }),
          1500;
      });
    }

    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={passwordChangeSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {() => {
        return (
          <Form className="sm:min-w-[400px]">
            <FieldInput
              fullWidth
              label="Current Password"
              name="currentPassword"
              className="mb-4"
            />
            <FieldInput fullWidth label="New Password" name="newPassword" className="mb-4" />
            <FieldInput
              fullWidth
              label="New Password Confirmation"
              name="newPasswordConfirmation"
              className="mb-4"
            />

            <ErrorText error={error} />
            <div className="mt-10 flex justify-center gap-4">
              <Button type="submit" className="w-30">
                <Body>Save</Body>
              </Button>
              <Button onClick={() => setOpen(false)} type="button" className="w-30">
                <Body>Close</Body>
              </Button>
            </div>
            {loading && <LoadingDialog />}
          </Form>
        );
      }}
    </Formik>
  );
};
