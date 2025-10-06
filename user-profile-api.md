# User Profile API Documentation

## Overview
این مستندات API های مربوط به مدیریت پروفایل کاربر را شرح می‌دهد.

## Base URL
```
/api
```

## Authentication
تمام endpoint های پروفایل نیاز به احراز هویت دارند و باید header زیر را شامل باشند:
```
Authorization: Bearer {token}
```

## Endpoints

### 1. Get User Profile
دریافت اطلاعات پروفایل کاربر فعلی

**Endpoint:** `GET /profile`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "نام کاربر",
        "email": "user@example.com",
        "phone": "09123456789",
        "address": "آدرس کاربر",
        "avatar": "avatars/avatar.jpg",
        "email_verified_at": null,
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T00:00:00.000000Z"
    }
}
```

### 2. Update User Profile
به‌روزرسانی اطلاعات پروفایل کاربر

**Endpoint:** `PUT /profile`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
name: نام جدید (اختیاری)
email: ایمیل جدید (اختیاری)
phone: شماره تلفن (اختیاری - می‌تواند null باشد)
address: آدرس (اختیاری)
avatar: فایل تصویر (اختیاری - jpeg,png,jpg,gif - حداکثر 2MB)
```

**Validation Rules:**
- `name`: رشته، حداکثر 255 کاراکتر
- `email`: ایمیل معتبر، حداکثر 255 کاراکتر، یکتا
- `phone`: رشته، حداکثر 20 کاراکتر، nullable
- `address`: رشته، nullable
- `avatar`: تصویر، فرمت‌های مجاز: jpeg,png,jpg,gif، حداکثر 2048KB

**Success Response:**
```json
{
    "success": true,
    "message": "Profile updated successfully",
    "data": {
        "id": 1,
        "name": "نام به‌روزشده",
        "email": "newemail@example.com",
        "phone": "09123456789",
        "address": "آدرس جدید",
        "avatar": "avatars/new-avatar.jpg",
        "email_verified_at": null,
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T12:00:00.000000Z"
    }
}
```

**Error Response (422 - Validation Error):**
```json
{
    "success": false,
    "errors": {
        "email": ["The email has already been taken."],
        "name": ["The name field is required."]
    }
}
```

### 3. Change Password
تغییر رمز عبور کاربر

**Endpoint:** `POST /change-password`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
    "current_password": "رمز عبور فعلی",
    "new_password": "رمز عبور جدید",
    "confirm_password": "تکرار رمز عبور جدید"
}
```

**Validation Rules:**
- `current_password`: الزامی، رشته
- `new_password`: الزامی، رشته، حداقل 8 کاراکتر، متفاوت از رمز فعلی
- `confirm_password`: الزامی، رشته، باید با new_password یکسان باشد

**Success Response:**
```json
{
    "success": true,
    "message": "Password changed successfully"
}
```

**Error Response (401 - Wrong Current Password):**
```json
{
    "success": false,
    "message": "Current password is incorrect"
}
```

**Error Response (422 - Validation Error):**
```json
{
    "success": false,
    "errors": {
        "new_password": ["The new password must be at least 8 characters."],
        "confirm_password": ["The confirm password and new password must match."]
    }
}
```

## Frontend Usage Examples

### JavaScript/Axios Examples

#### 1. Get Profile
```javascript
const getProfile = async () => {
    try {
        const response = await axios.get('/api/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.data.success) {
            console.log('User Profile:', response.data.data);
            return response.data.data;
        }
    } catch (error) {
        console.error('Error fetching profile:', error.response?.data);
    }
};
```

#### 2. Update Profile
```javascript
const updateProfile = async (profileData) => {
    try {
        const formData = new FormData();
        
        // اضافه کردن فیلدهای متنی
        if (profileData.name) formData.append('name', profileData.name);
        if (profileData.email) formData.append('email', profileData.email);
        if (profileData.phone !== undefined) formData.append('phone', profileData.phone);
        if (profileData.address) formData.append('address', profileData.address);
        
        // اضافه کردن فایل آواتار
        if (profileData.avatar) formData.append('avatar', profileData.avatar);
        
        const response = await axios.put('/api/profile', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (response.data.success) {
            console.log('Profile updated:', response.data.data);
            return response.data.data;
        }
    } catch (error) {
        if (error.response?.status === 422) {
            console.error('Validation errors:', error.response.data.errors);
        } else {
            console.error('Error updating profile:', error.response?.data);
        }
    }
};
```

#### 3. Change Password
```javascript
const changePassword = async (passwordData) => {
    try {
        const response = await axios.post('/api/change-password', {
            current_password: passwordData.currentPassword,
            new_password: passwordData.newPassword,
            confirm_password: passwordData.confirmPassword
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.data.success) {
            console.log('Password changed successfully');
            return true;
        }
    } catch (error) {
        if (error.response?.status === 401) {
            console.error('Current password is incorrect');
        } else if (error.response?.status === 422) {
            console.error('Validation errors:', error.response.data.errors);
        } else {
            console.error('Error changing password:', error.response?.data);
        }
        return false;
    }
};
```

### React Hook Example
```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.data.success) {
                setProfile(response.data.data);
                setError(null);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'خطا در دریافت اطلاعات');
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key] !== undefined && data[key] !== null) {
                    formData.append(key, data[key]);
                }
            });

            const response = await axios.put('/api/profile', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                setProfile(response.data.data);
                setError(null);
                return { success: true, data: response.data.data };
            }
        } catch (err) {
            const errorMsg = err.response?.data?.errors || err.response?.data?.message || 'خطا در به‌روزرسانی';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return {
        profile,
        loading,
        error,
        fetchProfile,
        updateProfile
    };
};

export default useProfile;
```

## Error Handling
- **401 Unauthorized**: توکن نامعتبر یا منقضی شده
- **422 Unprocessable Entity**: خطاهای اعتبارسنجی
- **500 Internal Server Error**: خطای سرور

## Notes
- تمام فیلدها در update اختیاری هستند
- فیلد phone می‌تواند null باشد
- آواتار قدیمی هنگام آپلود آواتار جدید حذف می‌شود
- رمز عبور جدید باید حداقل 8 کاراکتر باشد
- ایمیل باید یکتا باشد در سیستم