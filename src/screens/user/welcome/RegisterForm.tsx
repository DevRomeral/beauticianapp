'use client';

import { SignUp } from '@/services/api/ApiUserService';
import { RegisterFormProps } from '@/types/props/screens/user/welcome/register-form.props';
import { useState } from 'react';

import FormErrorCard from '@/components/cards/FormErrorCard';
import Button from '@/components/inputs/Button';
import TextField from '@/components/inputs/TextField';

const RegisterForm: React.FC<RegisterFormProps> = ({ formId, emailId }) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const idPassword1 = 'password1';
  const idPassword2 = 'password2';

  async function handleSubmit() {
    // event.preventDefault();
    setErrorMessages([]);
    const errors = [];

    const form = document.getElementById(formId) as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get(emailId)?.toString() || '';
    const password1 = formData.get(idPassword1)?.toString() || '';
    const password2 = formData.get(idPassword2)?.toString() || '';

    if (password1.length == 0) {
      errors.push('Debe introducir una contraseña válida');
    }
    if (password1 !== password2) {
      errors.push('Las contraseñas no coinciden');
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    const response = await SignUp(email, password1);
    console.log(response);
    if (!response.ok) {
      setErrorMessages(['Error al registrar al usuario']);
      return;
    }

    alert('Registrado con éxito: ' + response.access_token);

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
        id={idPassword1}
        name={idPassword1}
        label="Contraseña"
        placeholder="**********"
        required={true}
        type="password"
      />
      <TextField
        id={idPassword2}
        name={idPassword2}
        label="Confirme su Constraseña"
        placeholder="**********"
        required={true}
        type="password"
      />

      <FormErrorCard errors={errorMessages} />

      <Button style="primary" text="Registrarse" type="button" onClick={handleSubmit} />
    </>
  );
};

export default RegisterForm;
