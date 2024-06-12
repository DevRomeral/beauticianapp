'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

function LoginForm() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
    // const response = await fetch('/api/auth');

    if (response.ok) {
      router.push('/profile');
    } else {
      // Handle errors
    }
  }

  return (
    <div className="container mx-auto">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="first_name">Nombre de Usuario</label>
          <input type="email" id="first_name" name="email" placeholder="micorreo@mail.com" required />
        </div>

        <div className="mb-6">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="•••••••••" required />
        </div>
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
