import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const FAKE_USER = {
  email: 'demo@example.com',
  password: 'password123'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      setUser({ email });
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials (simulated login)' };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}