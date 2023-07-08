import React, { useRef, useState } from 'react';
import { useModalStore } from '@/data/stores';
import { Body, Divider, HeadlineXS, LinkComponent } from '@/components';
import { useUser } from '@/data/hooks';
import { Button } from '@mui/material';
import { CheckoutContactForm, CheckoutContactFormType } from '../forms/CheckoutContactForm';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CheckoutAddressForm, CheckoutAddressFormType } from '../forms/CheckoutAddressForm';
import { FormikProps } from 'formik';
import { CheckoutDeliveryForm } from '../forms/CheckoutDeliveryForm';
import { CheckoutPaymentForm } from '../forms/CheckoutPaymentForm';
import { BreadcumbsUI } from '../components/BreadcumbsUI';
import { Button as MyButton } from '@/components';
import { usePaymentRequestData } from '@/data/hooks';
import { PaymentModal } from '../components/PaymentModal';

export type CheckoutFormValues = Partial<CheckoutContactFormType & CheckoutAddressFormType>;

export const CheckoutSection = () => {
  const contactFormRef = useRef<FormikProps<CheckoutContactFormType>>(null);
  const addressFormRef = useRef<FormikProps<CheckoutAddressFormType>>(null);
  const swiperRef = useRef<any>(null); // no type support
  const openModal = useModalStore((state) => state.openPaymentModal);
  const { user } = useUser();
  const [continueWithoutAuth, setContinueWithoutAuth] = useState(false);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [formValues, setFormValues] = useState<CheckoutFormValues | null>(null);

  // This function prevents data loss during form transitions
  const formSetter = (newFormValues: CheckoutFormValues | null) => {
    const recentData = { ...formValues, ...newFormValues };
    setFormValues(recentData);
  };

  // This hook is responsible for preparing the data for the payment request API
  usePaymentRequestData({ formValues });

  const onNext = () => {
    // Contact Form Submit
    if (activeIndex === 0 && contactFormRef.current) {
      contactFormRef.current.submitForm().then(() => {
        if (contactFormRef.current?.isValid) {
          formSetter(contactFormRef.current.values);
          swiperRef.current.slideNext();
        }
      });
    }

    // Address Form Submit
    if (activeIndex === 1 && addressFormRef.current) {
      addressFormRef.current.submitForm().then(() => {
        if (addressFormRef.current?.isValid) {
          formSetter(addressFormRef.current.values);
          swiperRef.current.slideNext();
        }
      });
    }

    // Delivery Form Submit
    if (activeIndex === 2) {
      swiperRef.current.slideNext();
    }

    // Payment Form Submit
    if (activeIndex === 3) {
      openModal();
    }
  };
  console.log('formValues', formValues);

  const onPrev = () => {
    if (activeIndex === 0) {
      setContinueWithoutAuth(false);
    }
    swiperRef.current.slidePrev();
  };
  console.log('activeIndex', activeIndex);

  return (
    <div>
      <HeadlineXS className="pb-2">Order Information</HeadlineXS>
      <Divider direction="horizontal" />
      <BreadcumbsUI activeIndex={activeIndex} />

      {/* Step 1: Check auth */}
      {!user && !continueWithoutAuth && (
        <div className="flex flex-col max-w-[300px] m-auto gap-4 py-10">
          <LinkComponent href="/login">
            <Button fullWidth className="border-1 border-black border-solid">
              Giriş Yap / Üye Ol
            </Button>
          </LinkComponent>
          <Button
            className="border-1 border-black border-solid"
            onClick={() => {
              setContinueWithoutAuth(true);
              setActiveIndex(0);
            }}
          >
            Üye Olmadan Devam Et
          </Button>
        </div>
      )}

      {/* Step 2: Start Forms */}
      {(continueWithoutAuth || user) && (
        <div>
          <div className="mt-4">
            <Swiper
              style={{ minHeight: 300 }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
              slidesPerView={1}
              onInit={() => {
                setActiveIndex(0);
              }}
            >
              <SwiperSlide>
                <CheckoutContactForm ref={contactFormRef} />
              </SwiperSlide>
              <SwiperSlide>
                <CheckoutAddressForm ref={addressFormRef} />
              </SwiperSlide>
              <SwiperSlide>
                <CheckoutDeliveryForm />
              </SwiperSlide>
              <SwiperSlide>
                <CheckoutPaymentForm />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <MyButton type="submit" onClick={onPrev} className="w-30">
              <Body>Previous</Body>
            </MyButton>
            <MyButton onClick={onNext} type="button" className="w-30">
              <Body>{activeIndex === 3 ? 'Pay Now' : 'Next'}</Body>
            </MyButton>
          </div>
        </div>
      )}
      {activeIndex === 3 && <PaymentModal />}
    </div>
  );
};
