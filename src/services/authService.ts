import axios from '@/lib/axios';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    token_type: string;
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiError {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly BASE_URL = '/api';

  // Get stored token
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  // Store token
  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  // Remove token
  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  // Set authorization header
  private getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Register new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.BASE_URL}/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data: AuthResponse = response.data;

      if (data.success && data.data.token) {
        this.setToken(data.data.token);
      }

      return data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message: 'Registration failed. Please try again.',
        errors: {}
      } as ApiError;
    }
  }

  // Login user
  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.BASE_URL}/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data: AuthResponse = response.data;

      if (data.success && data.data.token) {
        this.setToken(data.data.token);
      }

      return data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message: 'Login failed. Please check your credentials.',
        errors: {}
      } as ApiError;
    }
  }

  // Logout user
  async logout(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post(`${this.BASE_URL}/logout`, {}, {
        headers: this.getAuthHeaders()
      });

      const data = response.data;

      if (data.success) {
        this.removeToken();
      }

      return data;
    } catch (error: any) {
      // Even if the API call fails, remove the token locally
      this.removeToken();
      
      if (error.response?.data) {
        throw error.response.data;
      }
      throw {
        success: false,
        message: 'Logout failed. Please try again.'
      };
    }
  }

  // Get current user info
  async getUserInfo(): Promise<{ success: boolean; data: { user: User } }> {
    try {
      const response = await axios.get(`${this.BASE_URL}/me`, {
        headers: this.getAuthHeaders()
      });

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        // Token is invalid, remove it
        this.removeToken();
      }
      
      if (error.response?.data) {
        throw error.response.data;
      }
      throw {
        success: false,
        message: 'Failed to get user information.'
      };
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Initialize auth state (check token validity)
  async initializeAuth(): Promise<User | null> {
    if (!this.isAuthenticated()) {
      return null;
    }

    try {
      const response = await this.getUserInfo();
      if (response.success) {
        return response.data.user;
      }
    } catch (error) {
      // Token is invalid, remove it
      this.removeToken();
    }

    return null;
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;