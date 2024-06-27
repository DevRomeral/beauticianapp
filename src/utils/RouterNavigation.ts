import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function redirectAfterLoginSuccess(router: AppRouterInstance) {
  const redirectToUrl = new URLSearchParams(window.location.search).get('redirectTo');
  // console.log('RedirectToURL ' + redirectToUrl);
  const callbackUrl = redirectToUrl || '/profile';
  console.log('redireccionando a...' + callbackUrl);
  router.push(callbackUrl as string);
}
