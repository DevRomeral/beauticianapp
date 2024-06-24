'use client';

import { SignIn } from '@/services/api/ApiUserService';
import { LoginFormProps } from '@/types/props/screens/user/welcome/login-form.props';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import FormErrorCard from '@/components/cards/FormErrorCard';
import Button from '@/components/inputs/Button';
import TextField from '@/components/inputs/TextField';

const LoginForm: React.FC<LoginFormProps> = ({ formId, emailId }) => {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  async function handleSubmit() {
    // event.preventDefault();
    setErrorMessages([]);
    const errors = [];

    const form = document.getElementById(formId) as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get(emailId)?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    // console.log({
    //   email,
    //   password,
    // });

    if (password.length == 0) {
      errors.push('Debe introducir una contraseña');
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    const response = await SignIn(email, password);
    console.log(response);
    if (!response.ok) {
      setErrorMessages(['Usuario o contraseña no válidos']);
      return;
    }

    alert('Logado con éxito: ' + response.access_token);

    // const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/profile';

    // const responseNextAuth = await signIn('credentials', {
    //   email,
    //   password,
    //   // redirectTo: callbackUrl,
    //   redirect: false,
    // });

    // if (responseNextAuth?.error) {
    //   setErrorMessages((responseNextAuth?.error || '').split(','));
    //   return;
    // }

    // router.push(callbackUrl);
  }

  return (
    <>
      <TextField
        id="password"
        name="password"
        label="Contraseña"
        placeholder="**********"
        required={true}
        type="password"
      />

      <FormErrorCard errors={errorMessages} />

      <Button style="primary" text="Iniciar Sesión" type="button" onClick={handleSubmit} />
    </>
  );
};

export default LoginForm;
