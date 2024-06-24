'use client';

import WelcomeForm from '@/screens/user/welcome/WelcomeForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

function WelcomePage() {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   setErrorMessages([]);

  //   try {
  //     const formData = new FormData(event.currentTarget);
  //     const name = formData.get('name');
  //     const email = formData.get('email');
  //     const password = formData.get('password');

  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         password,
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);

  //       const responseNextAuth = await signIn('credentials', {
  //         email,
  //         password,
  //         redirect: false,
  //       });

  //       if (responseNextAuth?.error) {
  //         setErrorMessages(responseNextAuth.error.split(','));
  //         return;
  //       }

  //       // TODO: no le está dando tiempo a NextAuth para logarse y redirige al login en su lugar.
  //       router.push('/profile');
  //     } else {
  //       setErrorMessages(['No se pudo registrar']);
  //     }
  //   } catch (err) {
  //     setErrorMessages(['Ha ocurrido fallo al registrarse']);
  //   }
  // }

  return <WelcomeForm />;
}

export default WelcomePage;
