export const ApiConfig = {
  url: process.env.NEXT_PUBLIC_BACKEND_URL || '',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
};
