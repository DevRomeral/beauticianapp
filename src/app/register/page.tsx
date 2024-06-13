'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

function RegisterPage() {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessages([]);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    console.log(response);

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const responseNextAuth = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        setErrorMessages(responseNextAuth.error.split(','));
        return;
      }

      // TODO: no le está dando tiempo a NextAuth para logarse y redirige al login en su lugar.
      router.push('/profile');
    } else {
      setErrorMessages(['No se pudo registrar correctamente']);
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Registrar Nuevo Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" placeholder="Nombre" required />
        </div>
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
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
