'use client';

import { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<User | null>(null);

  const getProfile = async () => {
    const res = await fetch('/api/auth/profile', {
      // credentials: 'include',
    });
    const data = await res.json();
    setProfile(data);
  };

  const logout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      // credentials: 'include',
    });
    if (res.status == 200) {
      router.push('/login');
    }
  };

  return (
    <div className="container mx-auto">
      <h1>Mi Perfil</h1>
      <div>
        <button className="bg-accent-300 p-2" onClick={getProfile}>
          Obtener Perfil
        </button>
        <button className="p-2" onClick={logout}>
          Logout
        </button>
      </div>
      <div>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    </div>
  );
}

export default ProfilePage;
