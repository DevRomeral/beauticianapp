'use client';

import { useSession } from '@/contexts/SessionContext';
import { SignIn } from '@/services/api/ApiUserService';
import { redirectAfterLoginSuccess } from '@/utils/RouterNavigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import FormErrorCard from '@/components/cards/FormErrorCard';
import DebugInfo from '@/components/DebugInfo';
import Button from '@/components/inputs/Button';
import TextField from '@/components/inputs/TextField';

export interface LoginFormProps {
  formId: string;
  emailId: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ formId, emailId }) => {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const idInputPassword = 'password';
  const idBtnLogin = 'btnLogin';

  const { updateToken } = useSession();

  async function handleSubmit() {
    setErrorMessages([]);
    const errors = [];

    const form = document.getElementById(formId) as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get(emailId)?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    // TODO: Comprobaciones lado cliente de inputs
    if (password.length == 0) {
      errors.push('Debe introducir una contraseña');
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    const response = await SignIn(email, password);
    // TODO: hacer el token secure = true y pasarle aquí al session context únicamente el usuario al que se parsea
    updateToken(response.access_token);

    // TODO: manejar errores en login
    // console.log(response);
    if (!response.ok) {
      setErrorMessages(['Usuario o contraseña no válidos']);
      return;
    }

    // TODO: si viene del redirectTo, hay que pulsarle dos veces.
    redirectAfterLoginSuccess(router);
  }

  return (
    <>
      <DebugInfo>
        <p>
          Si en la contraseña se incluye la palabra <strong>error</strong> te dará un error y no permitirá iniciar
          sesión
        </p>
      </DebugInfo>
      <TextField
        id={idInputPassword}
        name={idInputPassword}
        label="Contraseña"
        placeholder="**********"
        required={true}
        type="password"
      />

      <FormErrorCard errors={errorMessages} />

      <Button id={idBtnLogin} style="primary" text="Iniciar Sesión" type="button" onClick={handleSubmit} />
    </>
  );
};

export default LoginForm;
