import axios from '@/lib/axios';

// تعریف تایپ‌های مورد نیاز
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// دریافت پروفایل کاربر
export const getUserProfile = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.put('/api/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// به‌روزرسانی پروفایل کاربر
export const updateUserProfile = async (userData: FormData): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.put('/api/profile', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// تغییر رمز عبور
export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export const changePassword = async (passwordData: ChangePasswordData): Promise<ApiResponse<null>> => {
  try {
    const response = await axios.post('/api/change-password', passwordData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// بررسی وضعیت احراز هویت کاربر
export const checkAuth = async (): Promise<boolean> => {
  try {
    await axios.get('/api/user');
    return true;
  } catch (error) {
    return false;
  }
};