import { Body, BodyS, CommonDialog, Divider, Headline2XS, LoadingDialog } from '@/components';
import { useAddresses, usePublicUser } from '@/data/hooks';
import { useUser } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';
import { PersonalInformationForm } from '../forms/PersonalInformationForm';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { AddressForm } from '../forms/AddressForm';
import { EmailForm } from '../forms/EmailForm';
import { PasswordForm } from '../forms/PasswordForm';
import EditIcon from '@mui/icons-material/Edit';
import { printAddress } from '@/utils';
import AddIcon from '@mui/icons-material/Add';

export const Profile = () => {
  const [openPersonalModal, setPersonalModal] = useState(false);
  const [openAddressModal, setAddressModal] = useState(false);
  const [openEmailModal, setEmailModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const user = useUser();
  const [showSuccessSnack, setShowSuccessSnack] = useState(false);
  const [selectedAddressID, setSelectedAddressID] = useState<number | null>(null);

  const { data: userData, isLoading } = usePublicUser(user ? user.id : '', Boolean(user?.id));

  const { data: addressData } = useAddresses(user?.id || '', Boolean(user?.id));

  return (
    <div className="flex flex-col gap-8">
      {isLoading && <LoadingDialog />}
      {/* Personal Information */}
      <div>
        <div className="flex justify-between items-center">
          <Headline2XS>Personal Information</Headline2XS>
          <IconButton onClick={() => setPersonalModal(true)}>
            <EditIcon />
          </IconButton>
        </div>
        <div className="grid grid-cols-2 gap-6 grid-row-3 mt-4">
          <div>
            <BodyS className="text-gray-700">First Name</BodyS>
            <Body className="capitalize">{userData?.first_name || '-'}</Body>
          </div>
          <div>
            <BodyS className="text-gray-700">Last Name</BodyS>
            <Body className="capitalize">{userData?.last_name || '-'}</Body>
          </div>
          <div>
            <BodyS className="text-gray-700">Phone</BodyS>
            <Body className="capitalize">{userData?.phone_number || '-'}</Body>
          </div>
        </div>
      </div>
      <Divider direction="horizontal" />

      {/* Address  */}
      <div>
        <div className="flex justify-between items-center">
          <Headline2XS className="flex items-center">Addresses</Headline2XS>
          <IconButton onClick={() => setAddressModal(true)}>
            <AddIcon />
          </IconButton>
        </div>
        <div className="flex flex-col gap-2 mt-4 w-full">
          {addressData &&
            addressData.data &&
            addressData.data.map((address) => {
              return (
                <div
                  key={address.address_id}
                  className="grid  break450:grid-cols-3 grid-cols-2 w-full"
                >
                  <Body>{address.address_title || '-'}</Body>
                  <BodyS className="text-center text-gray-700 hidden break450:block">
                    {printAddress(address)}
                  </BodyS>
                  <div className="flex justify-end gap-3">
                    <IconButton
                      onClick={() => {
                        if (address.address_id) {
                          setSelectedAddressID(address.address_id);
                          setAddressModal(true);
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Divider direction="horizontal" />

      {/* Email  */}
      <div>
        <div className="flex justify-between items-center">
          <Headline2XS>Email & Password</Headline2XS>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Body>{user?.email}</Body>
          <IconButton onClick={() => setEmailModal(true)}>
            <EditIcon />
          </IconButton>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Body>********</Body>
          <IconButton onClick={() => setOpenPasswordModal(true)}>
            <EditIcon />
          </IconButton>
        </div>
      </div>

      {/* Edit Personal Information Dialog */}
      <div>
        <CommonDialog
          open={openPersonalModal}
          onClose={() => setPersonalModal(false)}
          title="Personal Information"
        >
          <PersonalInformationForm
            open={openPersonalModal}
            setOpen={setPersonalModal}
            setSuccessFeedback={setShowSuccessSnack}
          />
        </CommonDialog>
      </div>

      {/* Edit Address Dialog */}
      <div>
        <CommonDialog
          open={openAddressModal}
          onClose={() => setAddressModal(false)}
          title="Address Information"
        >
          <AddressForm
            selectedAddressID={selectedAddressID}
            open={openAddressModal}
            setOpen={setAddressModal}
            setSuccessFeedback={setShowSuccessSnack}
          />
        </CommonDialog>
      </div>

      {/* Edit Email Dialog */}
      <div>
        <CommonDialog
          open={openEmailModal}
          onClose={() => setEmailModal(false)}
          title="Email Change"
        >
          <EmailForm
            open={openEmailModal}
            setOpen={setEmailModal}
            setSuccessFeedback={setShowSuccessSnack}
          />
        </CommonDialog>
      </div>

      {/* Edit Password Dialog */}
      <div>
        <CommonDialog
          open={openPasswordModal}
          onClose={() => setOpenPasswordModal(false)}
          title="Password Change"
        >
          <PasswordForm
            open={openPasswordModal}
            setOpen={setOpenPasswordModal}
            setSuccessFeedback={setShowSuccessSnack}
          />
        </CommonDialog>
      </div>

      {/* Feedback: Success */}
      <Snackbar
        open={showSuccessSnack}
        autoHideDuration={2000}
        onClose={() => setShowSuccessSnack(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ width: '100%' }} variant="filled">
          Successfuly Saved
        </Alert>
      </Snackbar>
    </div>
  );
};
