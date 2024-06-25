'use client';

import { useSession } from '@/contexts/SessionContext';
import logo from '@/public/logo/logo-bw-full.svg';
import { Logout } from '@/services/api/ApiUserService';
import { ArrowLeftIcon, Bars3Icon } from '@heroicons/react/20/solid';
// import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, updateToken } = useSession();
  const router = useRouter();
  const path = usePathname();

  const setActiveLink = (route: string) => {
    return route === path ? 'font-extrabold' : 'font-light';
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const signOut = async () => {
    await Logout();
    updateToken('');
    router.push('/');
  };

  return (
    <nav>
      <div className={`drawer-menu ${isDrawerOpen ? 'open' : 'close'}`}>
        <div className="welcome">
          <h2>{user?.username ? `¡Hola, ${user?.username}!` : '¡Hola!'}</h2>
        </div>
        <ul className="links">
          <li>
            <Link href="/" onClick={closeDrawer} className={setActiveLink('/')}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/profile" prefetch={false} onClick={closeDrawer} className={setActiveLink('/profile')}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-no-wrap flex flex-1 gap-3 md:flex-none">
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
      <div className="logo-container flex h-full max-w-10 flex-auto justify-center">
        <Link href="/">
          <Image src={logo} className="h-full w-auto" alt="Logo"></Image>
        </Link>
      </div>
      <div className="flex flex-1 flex-wrap justify-end gap-3">
        {(user?.id && (
          <span className="cursor-pointer" onClick={signOut}>
            Cerrar Sesión
          </span>
        )) || (
          <Link href="/welcome" onClick={closeDrawer} className={setActiveLink('/welcome')}>
            Identifícate
          </Link>
        )}
      </div>
    </nav>
  );
}
