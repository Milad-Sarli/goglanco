import axios from '@/lib/axios';
import { AxiosResponse } from 'axios';

// Define required types based on API documentation
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  avatar?: string | null;
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// Get user profile
export const getUserProfile = async (): Promise<ApiResponse<User>> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await axios.get('/api/profile');
    return response.data;
  } catch (error: unknown) {
    // Handle API error responses
    if (error && typeof error === 'object' && 'response' in error && error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: 'Network error occurred'
    };
  }
};

// Update user profile
export const updateUserProfile = async (userData: FormData): Promise<ApiResponse<User>> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await axios.put('/api/profile', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown) {
    // Handle validation errors (422) and other API errors
    if (error && typeof error === 'object' && 'response' in error && error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: 'Network error occurred'
    };
  }
};

// Change password
export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export const changePassword = async (passwordData: ChangePasswordData): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await axios.post('/api/change-password', passwordData);
    return response.data;
  } catch (error: unknown) {
    // Handle authentication errors (401) and validation errors (422)
    if (error && typeof error === 'object' && 'response' in error && error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: 'Network error occurred'
    };
  }
};

// Check authentication status
export const checkAuth = async (): Promise<boolean> => {
  try {
    await axios.get('/api/user');
    return true;
  } catch {
    return false;
  }
};