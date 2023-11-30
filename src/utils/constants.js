export const BASE_URL =
  import.meta.env.MODE === 'production'
    ? 'https://api.ismystreameronline.com/api'
    : '/api';

export const DOMAIN =
  import.meta.env.MODE === 'production'
    ? 'www.ismystreameronline.com'
    : 'localhost';

export const API_ROUTES = {
  streamers: `${BASE_URL}/streamers`,
  checkSession: `${BASE_URL}/check-session`,
  favorites: `${BASE_URL}/favorites`,
  games: `${BASE_URL}/games`,
  request: `${BASE_URL}/request`,
  logIn: `${BASE_URL}/log-in`,
  logOut: `${BASE_URL}/log-out`,
  signUp: `${BASE_URL}/sign-up`,
  search: `${BASE_URL}/search`,
  favoritesData: `${BASE_URL}/favorites-data`,
  google: `${BASE_URL}/auth/google`,
};
