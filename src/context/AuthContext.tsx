import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, AuthResponse, UserBillingAddress } from '../types/index';

interface AuthContextType {
  user: UserAccount | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    company?: string;
    role?: UserAccount['role'];
    accountType?: UserAccount['accountType'];
    phone?: string;
    billingAddress?: UserBillingAddress;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; resetCode?: string; resetToken?: string; error?: string }>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserAccount>) => Promise<{ success: boolean; error?: string }>;
  openAuthModal: (mode?: 'login' | 'register' | 'forgot') => void;
  closeAuthModal: () => void;
  authModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('solvex_user_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('solvex_auth_token') || null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Verify session on initial load
  useEffect(() => {
    const checkSession = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data: AuthResponse = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
            localStorage.setItem('solvex_user_session', JSON.stringify(data.user));
          } else {
            // Token expired or invalid
            logout();
          }
        }
      } catch (err) {
        console.warn('Auth session check network error, keeping cached session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [token]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data: AuthResponse = await res.json();
      if (!res.ok || !data.success || !data.user || !data.token) {
        return { success: false, error: data.error || 'Invalid credentials' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('solvex_user_session', JSON.stringify(data.user));
      localStorage.setItem('solvex_auth_token', data.token);
      setAuthModalOpen(false);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Connection to Solvex Auth Gateway failed' };
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    company?: string;
    role?: UserAccount['role'];
    accountType?: UserAccount['accountType'];
    phone?: string;
    billingAddress?: UserBillingAddress;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result: AuthResponse = await res.json();
      if (!res.ok || !result.success || !result.user || !result.token) {
        return { success: false, error: result.error || 'Registration failed' };
      }

      setUser(result.user);
      setToken(result.token);
      localStorage.setItem('solvex_user_session', JSON.stringify(result.user));
      localStorage.setItem('solvex_auth_token', result.token);
      setAuthModalOpen(false);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during registration' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('solvex_user_session');
      localStorage.removeItem('solvex_auth_token');
    } catch {}
  };

  const requestPasswordReset = async (email: string): Promise<{
    success: boolean;
    resetCode?: string;
    resetToken?: string;
    error?: string;
  }> => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to dispatch reset code' };
      }

      return {
        success: true,
        resetCode: data.resetCode,
        resetToken: data.resetToken
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error requesting password reset' };
    }
  };

  const resetPassword = async (email: string, code: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword })
      });

      const data: AuthResponse = await res.json();
      if (!res.ok || !data.success || !data.user || !data.token) {
        return { success: false, error: data.error || 'Failed to reset password' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('solvex_user_session', JSON.stringify(data.user));
      localStorage.setItem('solvex_auth_token', data.token);
      setAuthModalOpen(false);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during password reset' };
    }
  };

  const updateProfile = async (data: Partial<UserAccount>): Promise<{ success: boolean; error?: string }> => {
    if (!token) return { success: false, error: 'Not authenticated' };

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result: AuthResponse = await res.json();
      if (!res.ok || !result.success || !result.user) {
        return { success: false, error: result.error || 'Profile update failed' };
      }

      setUser(result.user);
      localStorage.setItem('solvex_user_session', JSON.stringify(result.user));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error updating profile' };
    }
  };

  const openAuthModal = (mode: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        requestPasswordReset,
        resetPassword,
        updateProfile,
        openAuthModal,
        closeAuthModal,
        authModalOpen,
        authModalMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
