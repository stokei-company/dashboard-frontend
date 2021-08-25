export const isProduction: boolean = process.env.NODE_ENV === 'production';

export const BASE_API_SERVER_URL: string =
  process.env.NEXT_PUBLIC_BASE_API_SERVER_URL;
export const AUTH_FRONTEND_URL: string =
  process.env.NEXT_PUBLIC_AUTH_FRONTEND_URL;
