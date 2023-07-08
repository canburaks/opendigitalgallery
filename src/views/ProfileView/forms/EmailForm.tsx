import { Body, Button, ErrorText, FieldInput, LoadingDialog } from '@/components';
import { emailChangeSchema } from '@/schemas';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';

interface EmailFormProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  setSuccessFeedback: React.Dispatch<boolean>;
}

export const EmailForm: FC<EmailFormProps> = ({ setOpen }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient();
  const [message, setMessage] = useState('');

  const initialValue = {
    email: '',
  };

  const onSubmit = async (values: typeof initialValue) => {
    setLoading(true);
    setError('');
    const res = await supabase.auth.updateUser({
      email: values.email,
    });

    if (res.error) {
      setError(res.error.message);
    } else {
      setMessage(
        'Confirmation emails are sent to your new and old email addresses. Please check your emails and click the both links to confirm your new email address.'
      );
    }

    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={emailChangeSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {() => {
        return (
          <Form className="sm:min-w-[400px]">
            <FieldInput fullWidth label="New Email" name="email" className="mb-4" />

            <ErrorText error={error} />
            {message}
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
