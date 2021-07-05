import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  email: null,
  login: () => {},
  logout: () => {}
});
