import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function redirectAfterLoginSuccess(router: AppRouterInstance) {
  const callbackUrl = new URLSearchParams(window.location.search).get('redirectTo') || '/profile';
  console.log('redireccionando a...' + callbackUrl);
  router.push(callbackUrl);
}
