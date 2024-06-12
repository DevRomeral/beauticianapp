'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      router.push('/profile');
    } else {
      setErrorMessage('No se pudo iniciar sesión correctamente');
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="first_name">Nombre de Usuario</label>
          <input type="email" id="first_name" name="email" placeholder="micorreo@mail.com" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="•••••••••" required />
        </div>
        {errorMessage && (
          <div data-testid="divErrorMessage" className="my-6 border border-red-400 bg-red-200 p-3 text-red-700">
            {errorMessage}
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
