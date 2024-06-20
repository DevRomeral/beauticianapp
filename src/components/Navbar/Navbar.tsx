'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-secondary-600 flex flex-wrap justify-between p-2 text-white">
      <div className="flex flex-wrap gap-3">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/profile" prefetch={false}>
          Profile
        </Link>
        {/* <a href="/profile">Profile</a> */}
      </div>
      <div className="flex flex-wrap gap-3">
        {(session?.user && (
          <>
            <span>{session.user.email}</span>
            <span
              className="cursor-pointer"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </span>
          </>
        )) || <span>Desconocido</span>}
      </div>
    </nav>
  );
}
