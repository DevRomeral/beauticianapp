'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

function ProfilePage() {
  const [whoami, setWhoami] = useState({});
  const { data: session } = useSession();

  const whoAmI = async () => {
    // console.log('Token: ' + session?.user?.token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${session?.user?.backToken}`,
      },
    });
    setWhoami(await res.json());
  };

  // console.log('Bearer', session?.user?.backToken);

  return (
    <div className="container mx-auto">
      <h1>Mi Perfil</h1>
      <div>
        <button className="bg-accent-300 p-2" onClick={whoAmI}>
          Who Am I?
        </button>
        <button
          className="bg-red-500 p-2 text-white"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </div>
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>

      <div>
        <pre>{JSON.stringify(whoami, null, 2)}</pre>
      </div>
    </div>
  );
}

export default ProfilePage;
