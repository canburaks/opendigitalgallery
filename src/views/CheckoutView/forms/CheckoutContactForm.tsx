import { FieldInput } from '@/components';
import { usePublicUser, useUser } from '@/data/hooks';
import { checkoutContactSchema } from '@/schemas/checkoutContactSchema';
import { Form, Formik, FormikProps } from 'formik';
import React, { forwardRef } from 'react';

export type CheckoutContactFormType = {
  firstName: string;
  lastName: string;
  email?: string;
};

type RefType = FormikProps<CheckoutContactFormType>;

export const CheckoutContactForm = forwardRef<RefType>((props, ref) => {
  const { user } = useUser();
  const { data: userData } = usePublicUser(user ? user.id : '', Boolean(user?.id));

  const initialValues = {
    firstName: userData && userData.first_name ? userData.first_name : '',
    lastName: userData && userData.last_name ? userData.last_name : '',
    email: user ? user.email : '',
  };

  return (
    <Formik
      innerRef={ref}
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={checkoutContactSchema}
      enableReinitialize
    >
      <Form className="flex flex-col gap-4 w-full mt-2">
        <FieldInput fullWidth name="firstName" label="First Name" />
        <FieldInput fullWidth name="lastName" label="Last Name" />
        <FieldInput fullWidth name="email" label="Email" />
      </Form>
    </Formik>
  );
});

CheckoutContactForm.displayName = 'CheckoutContactForm';
