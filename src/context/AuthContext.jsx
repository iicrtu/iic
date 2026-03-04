import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const API = import.meta.env.VITE_API_URL;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAuth = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/auth/me`, {
        credentials: "include",
        cache: "no-cache",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("AuthContext: error fetching user", err);
      setError(err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch once on mount
  useEffect(() => {
    fetchAuth();
  }, [fetchAuth]);

  const refreshAuth = useCallback(() => fetchAuth(), [fetchAuth]);

  const logout = useCallback(async () => {
    try {
      await fetch(`${API}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("AuthContext: logout error", err);
    }
    setUser(null);
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, error, refreshAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export default AuthContext;
