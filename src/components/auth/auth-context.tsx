'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User as AuthUser, RegisterData, LoginData, ApiError } from '@/services/authService';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signIn: (credentials: LoginData) => Promise<void>;
  signUp: (userData: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      const userData = await authService.initializeAuth();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (credentials: LoginData) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      
      if (response.success) {
        setUser(response.data.user);
        toast.success('Welcome back!');
      }
    } catch (error: any) {
      const apiError = error as ApiError;
      
      if (apiError.errors) {
        // Handle validation errors
        Object.entries(apiError.errors).forEach(([field, messages]) => {
          messages.forEach(message => {
            toast.error(`${field}: ${message}`);
          });
        });
      } else {
        toast.error(apiError.message || 'Login failed. Please try again.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      
      if (response.success) {
        setUser(response.data.user);
        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      const apiError = error as ApiError;
      
      if (apiError.errors) {
        // Handle validation errors
        Object.entries(apiError.errors).forEach(([field, messages]) => {
          messages.forEach(message => {
            toast.error(`${field}: ${message}`);
          });
        });
      } else {
        toast.error(apiError.message || 'Registration failed. Please try again.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      toast.success('Signed out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      // Even if logout fails on server, clear local state
      setUser(null);
      toast.error('Logout failed, but you have been signed out locally');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authService.getUserInfo();
      if (response.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If refresh fails, user might be logged out
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isLoading,
      signIn,
      signUp,
      signOut,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}