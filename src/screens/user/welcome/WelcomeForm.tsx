'use client';

import LoginForm from '@/screens/user/welcome/LoginForm';
import RegisterForm from '@/screens/user/welcome/RegisterForm';
import { VerifyUser } from '@/services/api/ApiUserService';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import DebugInfo from '@/components/DebugInfo';
import TextField from '@/components/inputs/TextField';

export interface IWelcomeFormConfig {
  formId: string;
  emailId: string;
}

export const WelcomeFormConfig: IWelcomeFormConfig = {
  formId: 'welcome-form',
  emailId: 'email',
};

export default function WelcomeForm() {
  const t = useTranslations('Welcome');
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  const onChangeEmailHandler = async (event: React.FocusEvent<HTMLInputElement>) => {
    try {
      // const email = (document.getElementById(emailId) as HTMLInputElement).value;
      const email = event.target.value;
      const verified = await VerifyUser(email);

      setShowLoginForm(verified);
      setShowRegisterForm(!verified);
    } catch (err) {
      setShowLoginForm(false);
      setShowRegisterForm(false);
      console.error('Error when verifying user');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 id="screen-title" className="text-2xl">
        {t('title')}
      </h1>
      <form id={WelcomeFormConfig.formId}>
        <DebugInfo>
          <p>
            Si el correo incluye la palabra <strong>error</strong>, te indicará que no estás registrado
          </p>
        </DebugInfo>
        <TextField
          id={WelcomeFormConfig.emailId}
          name={WelcomeFormConfig.emailId}
          label={t('form.email.label')}
          placeholder={t('form.email.placeholder')}
          required={true}
          type="email"
          onBlurHandler={onChangeEmailHandler}
        />
        {showLoginForm && <LoginForm formId={WelcomeFormConfig.formId} emailId={WelcomeFormConfig.emailId} />}
        {showRegisterForm && <RegisterForm formId={WelcomeFormConfig.formId} emailId={WelcomeFormConfig.emailId} />}
      </form>
    </div>
  );
}
