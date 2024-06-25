'use client';

import { Dashboard } from '@/services/api/ApiUserService';
import { useState } from 'react';

import Button from '@/components/inputs/Button';

function ProfilePage() {
  const [whoami, setWhoami] = useState({});

  const whoAmI = async () => {
    try {
      setWhoami(await Dashboard());
    } catch (err) {
      console.error(err);
      setWhoami({});
    }
  };

  return (
    <div className="container mx-auto">
      <h1>Mi Perfil</h1>
      <div>
        <Button style="primary" text="Who Am I?" onClick={whoAmI} />
      </div>
      <div>
        <pre>{JSON.stringify(whoami, null, 2)}</pre>
      </div>
    </div>
  );
}

export default ProfilePage;
