'use client';

import { useSession } from '@/contexts/SessionContext';
import { SignUp } from '@/services/api/ApiUserService';
import { RegisterFormProps } from '@/types/props/screens/user/welcome/register-form.props';
import { redirectAfterLoginSuccess } from '@/utils/RouterNavigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import FormErrorCard from '@/components/cards/FormErrorCard';
import DebugInfo from '@/components/DebugInfo';
import Button from '@/components/inputs/Button';
import TextField from '@/components/inputs/TextField';

const RegisterForm: React.FC<RegisterFormProps> = ({ formId, emailId }) => {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { updateToken } = useSession();

  const idPassword1 = 'password1';
  const idPassword2 = 'password2';

  async function handleSubmit() {
    setErrorMessages([]);
    const errors = [];

    const form = document.getElementById(formId) as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get(emailId)?.toString() || '';
    const password1 = formData.get(idPassword1)?.toString() || '';
    const password2 = formData.get(idPassword2)?.toString() || '';

    // TODO: comprobaciones lado cliente de los inputs
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

    // TODO: manejar errores
    // console.log(response);
    if (!response.ok) {
      setErrorMessages(['Error al registrar al usuario']);
      return;
    }

    // TODO: quitar esta aberración de alert
    alert('Registrado con éxito: ' + response.access_token);
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
