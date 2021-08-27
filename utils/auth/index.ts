import { addHours } from 'date-fns';
import nookies, { parseCookies } from 'nookies';
import { isProduction } from '~/environments';

export const COOKIE_TOKEN_NAME = 'stk-token';
const cookieDomain: string = isProduction ? 'stokei.com' : undefined;

export const getToken = (ctx?: any) => {
  const cookies = parseCookies(ctx);
  return cookies[COOKIE_TOKEN_NAME];
};
export const removeToken = (ctx?: any) =>
  nookies.destroy(ctx, COOKIE_TOKEN_NAME, {
    domain: cookieDomain
  });

export const setToken = (value: string, ctx?: any) =>
  nookies.set(ctx, COOKIE_TOKEN_NAME, value, {
    expires: addHours(Date.now(), 12),
    secure: isProduction,
    domain: cookieDomain
  });
