import { SectionContainer } from '@/components';
import React, { FC, useState } from 'react';
import { SignUp, SignIn } from './sections';
import { ForgetPassword } from './sections/ForgetPassword';

export type AuthFormType = 'SignIn' | 'SignUp' | 'ResetPassword';

export const LoginView: FC = () => {
  const [view, setView] = useState<AuthFormType>('SignIn');

  return (
    <SectionContainer>
      <div className="max-w-[500px] m-auto min-h-[calc(100vh-260px)]">
        {view === 'SignUp' && <SignUp setView={setView} />}
        {view === 'SignIn' && <SignIn setView={setView} />}
        {view === 'ResetPassword' && <ForgetPassword setView={setView} />}
      </div>
    </SectionContainer>
  );
};
