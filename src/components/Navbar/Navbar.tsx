'use client';

import { ArrowLeftIcon, Bars3Icon } from '@heroicons/react/20/solid';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session } = useSession();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <nav>
      <div className={`drawer-menu ${isDrawerOpen ? 'open' : 'close'}`}>
        <div className="welcome">
          <h2>{session?.user?.email ? `¡Hola, ${session?.user.email}!` : '¡Hola!'}</h2>
        </div>
        <ul className="links">
          <li>
            <Link href="/" onClick={closeDrawer}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/login" onClick={closeDrawer}>
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" onClick={closeDrawer}>
              Register
            </Link>
          </li>
          <li>
            <Link href="/profile" prefetch={false} onClick={closeDrawer}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-no-wrap flex gap-3">
        {/* <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/profile" prefetch={false}>
          Profile
        </Link> */}
        {/* <a href="/profile">Profile</a> */}
        <div className="visible z-50 h-full w-auto cursor-pointer transition-all md:hidden" onClick={toggleDrawer}>
          {isDrawerOpen ? (
            <ArrowLeftIcon className="h-full w-auto"></ArrowLeftIcon>
          ) : (
            <Bars3Icon className="h-full w-auto"></Bars3Icon>
          )}
        </div>
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
