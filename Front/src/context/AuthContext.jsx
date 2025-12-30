import { createContext, useEffect, useMemo, useState } from 'react';
import { clearAuthToken, setAuthToken } from '../services/api';
import { deleteAccount as deleteAccountRequest } from '../services/authService';

const STORAGE_KEY = 'auth_state';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.token) {
          setToken(parsed.token);
          setUser(parsed.user || null);
          setAuthToken(parsed.token);
        }
      } catch (e) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn('Failed to parse saved auth state', e);
        }
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setReady(true);
  }, []);

  const persist = (nextToken, nextUser) => {
    if (nextToken) {
      setToken(nextToken);
      setUser(nextUser || null);
      setAuthToken(nextToken);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: nextToken, user: nextUser || null }));
    } else {
      setToken(null);
      setUser(null);
      clearAuthToken();
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = (nextToken, nextUser) => persist(nextToken, nextUser);
  const logout = () => persist(null, null);

  const deleteAccount = async () => {
    await deleteAccountRequest();
    logout();
  };

  const value = useMemo(
    () => ({
      token,
      user,
      ready,
      isAuthenticated: Boolean(token),
      login,
      logout,
      deleteAccount,
    }),
    [token, user, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}