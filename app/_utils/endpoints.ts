const backendService = `${process.env.NEXT_PUBLIC_BACKEND_URL}v2/`;

export const appEndPoints = {
  LOGIN: `${backendService}auth/login`,
  REGISTER: `${backendService}auth/register`,
  REFRESH_TOKEN: `${backendService}auth/refresh-token`,
  GOOGLE_LOGIN: `${backendService}auth/google`,
  TWITTER_ACCESS_TOKEN: `${backendService}auth/twitter/access-token`,
  TWITTER_REQUEST_TOKEN: `${backendService}auth/twitter/request-token`,
};
