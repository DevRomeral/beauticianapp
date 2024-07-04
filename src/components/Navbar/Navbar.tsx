'use client';

import { useSession } from '@/contexts/SessionContext';
import logo from '@/public/logo/logo-bw-full.svg';
import { Logout } from '@/services/api/ApiUserService';
import { ArrowLeftIcon, Bars3Icon } from '@heroicons/react/20/solid';
import { useTranslations } from 'next-intl';
// import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export const NavBarConfig = {
  navbarLogoContainer: 'navbarLogoContainer',
  drawerMenuId: 'drawerMenu',
  btnDrawerMenuId: 'btnDrawerMenu',
  btnLogInId: 'btnLogIn',
  btnLogOutId: 'btnLogOut',
  linkSettingsId: 'linkSettings',
};

export default function NavBar() {
  const t = useTranslations('Navbar');
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
      <div data-testid={NavBarConfig.drawerMenuId} className={`drawer-menu ${isDrawerOpen ? 'open' : 'close'}`}>
        <div className="welcome">
          <h2>
            {t(user?.name ? 'drawer-menu.welcome-user' : 'drawer-menu.welcome', {
              name: user?.name,
            })}
          </h2>
        </div>
        <ul className="links">
          <li>
            <Link href="/profile" prefetch={false} onClick={closeDrawer} className={setActiveLink('/profile')}>
              {t('links.profile')}
            </Link>
          </li>
          <li>
            <Link href="/clientes" prefetch={false} onClick={closeDrawer} className={setActiveLink('/clientes')}>
              {t('links.clientes')}
            </Link>
          </li>
          <li>
            <Link
              data-testid={NavBarConfig.linkSettingsId}
              href="/settings"
              prefetch={false}
              onClick={closeDrawer}
              className={setActiveLink('/settings')}
            >
              {t('links.settings')}
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-no-wrap flex flex-1 gap-3 md:flex-none">
        <div
          className="visible z-50 h-full w-auto cursor-pointer transition-all md:hidden"
          data-testid={NavBarConfig.btnDrawerMenuId}
          onClick={toggleDrawer}
        >
          {isDrawerOpen ? (
            <ArrowLeftIcon className="h-full w-auto"></ArrowLeftIcon>
          ) : (
            <Bars3Icon className="h-full w-auto"></Bars3Icon>
          )}
        </div>
      </div>
      <div
        data-testid={NavBarConfig.navbarLogoContainer}
        className="logo-container flex h-full max-w-10 flex-auto justify-center"
      >
        <Link href="/">
          <Image src={logo} className="h-full w-auto" alt="Logo"></Image>
        </Link>
      </div>
      <div className="flex flex-1 flex-wrap justify-end gap-3">
        {(user?.id && (
          <span data-testid={NavBarConfig.btnLogOutId} className="cursor-pointer" onClick={signOut}>
            {t('linkSignOut')}
          </span>
        )) || (
          <Link
            data-testid={NavBarConfig.btnLogInId}
            href="/welcome"
            onClick={closeDrawer}
            className={setActiveLink('/welcome')}
          >
            {t('linkSignIn')}
          </Link>
        )}
      </div>
    </nav>
  );
}
