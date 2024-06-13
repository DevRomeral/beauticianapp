'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

function LoginForm() {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessages([]);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/profile';
    console.log('Redirección: ' + callbackUrl);

    const responseNextAuth = await signIn('credentials', {
      email,
      password,
      // redirectTo: callbackUrl,
      redirect: false,
    });

    console.log(responseNextAuth);

    if (responseNextAuth?.ok) {
      router.push(callbackUrl);
      return;
    }

    setErrorMessages((responseNextAuth?.error || '').split(','));
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email">Nombre de Usuario</label>
          <input type="email" id="email" name="email" placeholder="micorreo@mail.com" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="•••••••••" required />
        </div>
        {errorMessages.length > 0 && (
          <div data-testid="divErrorMessage" className="my-6 border border-red-400 bg-red-200 p-3 text-red-700">
            {errorMessages.map((e) => (
              <p key={e}>{e}</p>
            ))}
          </div>
        )}
        <div className="mb-6">
          <button type="submit" data-testid="btnSubmit">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
