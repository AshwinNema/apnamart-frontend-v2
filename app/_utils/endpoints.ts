const backendService = `${process.env.NEXT_PUBLIC_BACKEND_URL}v2/`;

const auth = {
  LOGIN: `${backendService}auth/login`,
  REGISTER: `${backendService}auth/register`,
  REFRESH_TOKEN: `${backendService}auth/refresh-token`,
  GOOGLE_LOGIN: `${backendService}auth/google`,
  TWITTER_ACCESS_TOKEN: `${backendService}auth/twitter/access-token`,
  TWITTER_REQUEST_TOKEN: `${backendService}auth/twitter/request-token`,
  LOG_OUT: `${backendService}auth/logout`,
};

const user = {
  UPLOAD_PROFILE_IMG: `${backendService}user/profile-photo`,
  PROFILE: `${backendService}user/profile`,
  QUERY_MAP_LOCATION: `${backendService}user/query-location`,
  GET_ADDRESS: `${backendService}user/address`,
  UPDATE_USER_ADDRESS: `${backendService}user/address`,
  UPDATE_USER_PROFILE: `${backendService}user/profile`,
};

export const appEndPoints = {
  ...auth,
  ...user,
};
