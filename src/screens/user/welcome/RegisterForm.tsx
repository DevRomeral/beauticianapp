'use client';

import { useSession } from '@/contexts/SessionContext';
import { SignUp } from '@/services/api/ApiUserService';
import { redirectAfterLoginSuccess } from '@/utils/RouterNavigation';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import FormErrorCard from '@/components/cards/FormErrorCard';
import DebugInfo from '@/components/DebugInfo';
import Button from '@/components/inputs/Button';
import TextField from '@/components/inputs/TextField';

export interface IRegisterFormConfig {
  idPassword1: string;
  idPassword2: string;
  idBtnRegister: string;
}

export const RegisterFormConfig: IRegisterFormConfig = {
  idPassword1: 'password1',
  idPassword2: 'password2',
  idBtnRegister: 'btnRegister',
};

export interface RegisterFormProps {
  formId: string;
  emailId: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ formId, emailId }) => {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const t = useTranslations('Welcome.Register');
  const { updateToken } = useSession();

  async function handleSubmit() {
    setErrorMessages([]);
    const errors = [];

    const form = document.getElementById(formId) as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get(emailId)?.toString() || '';
    const password1 = formData.get(RegisterFormConfig.idPassword1)?.toString() || '';
    const password2 = formData.get(RegisterFormConfig.idPassword2)?.toString() || '';

    // TODO: comprobaciones lado cliente de los inputs
    if (password1.length == 0) {
      errors.push(t('errors.not-valid-password'));
    }
    if (password1 !== password2) {
      errors.push(t('errors.missmatch-password'));
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    const response = await SignUp(email, password1);

    // TODO: manejar errores
    // console.log(response);
    if (!response.ok) {
      setErrorMessages([t('errors.unknown')]);
      return;
    }

    updateToken(response.access_token);

    redirectAfterLoginSuccess(router);
  }

  return (
    <>
      <DebugInfo>
        <p>
          Si las contraseñas incluyen la palabra <strong>error</strong>, te dará un error y no permitirá registrarte
        </p>
      </DebugInfo>

      <TextField
        id={RegisterFormConfig.idPassword1}
        name={RegisterFormConfig.idPassword1}
        label={t('form.password1.label')}
        placeholder={t('form.password1.placeholder')}
        required={true}
        type="password"
      />
      <TextField
        id={RegisterFormConfig.idPassword2}
        name={RegisterFormConfig.idPassword2}
        label={t('form.password2.label')}
        placeholder={t('form.password2.placeholder')}
        required={true}
        type="password"
      />

      <FormErrorCard errors={errorMessages} />

      <Button
        id={RegisterFormConfig.idBtnRegister}
        style="primary"
        text={t('form.submit.title')}
        type="button"
        onClick={handleSubmit}
      />
    </>
  );
};

export default RegisterForm;
