import React from 'react';

// Mock authentication context
export const mockAuthContext = {
  user: null,
  loading: false,
  error: null,
  login: jest.fn().mockResolvedValue(true),
  logout: jest.fn(),
  register: jest.fn().mockResolvedValue(true),
};

export const AuthContext = React.createContext(mockAuthContext);
export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
);

// Reset mock between tests
export const resetMocks = () => {
  mockAuthContext.login.mockClear();
  mockAuthContext.logout.mockClear();
  mockAuthContext.register.mockClear();
};