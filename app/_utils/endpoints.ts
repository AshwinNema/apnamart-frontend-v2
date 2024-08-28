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

const category = {
  CREATE_CATEGORY: `${backendService}category`,
  UPDATE_CATEGORY: `${backendService}category/`,
  QUERY_CATEGORIES: `${backendService}category`,
  UPDATE_CATEGORY_IMAGE: `${backendService}category/image/`,
  DELETE_CATEGORY: `${backendService}category/`,
  SEARCH_CATEGORY_BY_NAME: `${backendService}category/search-by-name`,
  CATEGORY_LIST: `${backendService}category/list`,
};

const subcategory = {
  CREATE_SUB_CATEGORY: `${backendService}subcategory`,
  UPDATE_SUB_CATEGORY: `${backendService}subcategory/`,
  QUERY_SUB_CATEGORIES: `${backendService}subcategory`,
  UPDATE_SUB_CATEGORY_IMAGE: `${backendService}subcategory/image/`,
  DELETE_SUB_CATEGORY: `${backendService}subcategory/`,
  SEARCH_SUB_CATEGORY_BY_NAME: `${backendService}subcategory/search-by-name`,
};

export const appEndPoints = {
  ...auth,
  ...user,
  UPDATE_DELIVERY_AREA: `${backendService}delivery-area`,
  GET_ALL_DELIVERY_AREAS: `${backendService}delivery-area`,
  ...category,
  ...subcategory,
};
