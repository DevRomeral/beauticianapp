'use client';

import LoginForm from '@/screens/user/welcome/LoginForm';
import RegisterForm from '@/screens/user/welcome/RegisterForm';
import { VerifyUser } from '@/services/api/ApiUserService';
import { useState } from 'react';

import TextField from '@/components/inputs/TextField';

export default function WelcomeForm() {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  const formId = 'welcome-form';
  const emailId = 'email';

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
        Identifícate
      </h1>
      <form id={formId}>
        <TextField
          id={emailId}
          name={emailId}
          label="Nombre de Usuario"
          placeholder="micorreo@mail.com"
          required={true}
          type="email"
          onBlurHandler={onChangeEmailHandler}
        />
        {showLoginForm && <LoginForm formId={formId} emailId={emailId} />}
        {showRegisterForm && <RegisterForm formId={formId} emailId={emailId} />}
      </form>
    </div>
  );
}
