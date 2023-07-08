import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Form, Formik, FormikProps } from 'formik';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { ContactFormTypes, contactSchema } from '@/schemas';
import {
  SectionContainer,
  BodyX,
  FieldInput,
  RecaptchaField,
  ErrorText,
  LoadingDialog,
  CommonDialog,
  Body,
  Headline,
  Button,
  HeadlineXS,
} from '@/components';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Molecules/Map'), {
  ssr: false,
});

const initialValues = {
  name: '',
  email: '',
  message: '',
  recaptcha: '',
};

export const ContactView = () => {
  const recaptchaRef = useRef<ReCAPTCHA & HTMLDivElement>(null);
  const formikRef = useRef<FormikProps<ContactFormTypes>>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  const sendMutation = useMutation({
    mutationFn: (values: ContactFormTypes) => {
      return axios.post('/api/sendContactForm', values);
    },
    onError: () => {
      setErrorMsg('Error');
    },
    onSuccess: () => {
      setShowSuccessCard(true);
      recaptchaRef?.current?.reset();
      formikRef.current?.resetForm();
    },
  });

  return (
    <SectionContainer className="min-h-[calc(100vh-260px)]">
      <div className="flex gap-10 max-w-[1000px]  m-auto pt-10">
        {/* Left: Form */}
        <div className="flex-1">
          <div className="flex flex-col gap-2 py-4">
            <Headline className="text-darkPurple text-left">Contact Us</Headline>
            <BodyX>Please get in touch with us </BodyX>
          </div>
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={contactSchema}
            onSubmit={(v) => sendMutation.mutate(v)}
          >
            {(props) => {
              return (
                <Form className="flex flex-col gap-3">
                  <FieldInput name="name" label="Name" />
                  <FieldInput name="email" label="Email" />
                  <FieldInput name="message" label="Message" rows={4} multiline />
                  <div className="flex justify-center py-4">
                    <RecaptchaField<ContactFormTypes>
                      formikProps={props}
                      id="contactUs"
                      ref={recaptchaRef}
                      className="w-[320px]"
                    />
                  </div>
                  <ErrorText error={errorMsg} />

                  <Button text="Send Message" />

                  {sendMutation.isLoading && <LoadingDialog />}
                </Form>
              );
            }}
          </Formik>
        </div>
        {/* Rigth: Map & Info Boxes */}
        <div className="flex-1 ">
          <Map lat={51.505} lon={-0.09} />
        </div>
      </div>
      {/* Bottom: Info Cards */}
      <div className="grid grid-cols-3 gap-4 max-w-[1000px] m-auto py-10">
        <div className="bg-gray-100 p-6">
          <HeadlineXS className="py-1">Email</HeadlineXS>
          <Body>info@opendigitalgallery.com</Body>
        </div>
        <div className="bg-gray-100 p-6">
          <HeadlineXS className="py-1">Tel</HeadlineXS>
          <Body>+90 543 407 37 6</Body>
        </div>
        <div className="bg-gray-100 p-6">
          <HeadlineXS className="py-1">Address</HeadlineXS>
          <Body>Balkiraz, Esenler Sk. No:3, 06620 Mamak/Ankara</Body>
        </div>
        <div></div>
        <div></div>
      </div>

      <CommonDialog closeIcon open={showSuccessCard} onClose={() => setShowSuccessCard(false)}>
        <Body>Your message is successfully received. We will be in contact soon.</Body>
      </CommonDialog>
    </SectionContainer>
  );
};
