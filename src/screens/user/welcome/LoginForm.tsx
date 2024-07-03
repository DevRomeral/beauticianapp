'use client';

import { useSession } from '@/contexts/SessionContext';
import { SignIn } from '@/services/api/ApiUserService';
import { redirectAfterLoginSuccess } from '@/utils/RouterNavigation';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import FormErrorCard from '@/components/cards/FormErrorCard';
import DebugInfo from '@/components/DebugInfo';
import Button from '@/components/inputs/Button';
import TextField from '@/components/inputs/TextField';

export interface ILoginFormConfig {
  idInputPassword: string;
  idBtnLogin: string;
}

export const LoginFormConfig: ILoginFormConfig = {
  idInputPassword: 'tfPassword',
  idBtnLogin: 'btnLogin',
};

export interface LoginFormProps {
  formId: string;
  emailId: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ formId, emailId }) => {
  const router = useRouter();
  const t = useTranslations('Welcome.Login');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const { updateToken } = useSession();

  async function handleSubmit() {
    setErrorMessages([]);
    const errors = [];

    const form = document.getElementById(formId) as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get(emailId)?.toString() || '';
    const password = formData.get(LoginFormConfig.idInputPassword)?.toString() || '';

    // TODO: Comprobaciones lado cliente de inputs
    if (password.length == 0) {
      errors.push(t('errors.empty-password'));
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
      setErrorMessages([t('errors.unknown')]);
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
        id={LoginFormConfig.idInputPassword}
        name={LoginFormConfig.idInputPassword}
        label={t('form.password.label')}
        placeholder={t('form.password.placeholder')}
        required={true}
        value="--"
        type="password"
      />

      <FormErrorCard errors={errorMessages} />

      <Button
        id={LoginFormConfig.idBtnLogin}
        style="primary"
        text={t('form.submit.title')}
        type="button"
        onClick={handleSubmit}
      />
    </>
  );
};

export default LoginForm;
