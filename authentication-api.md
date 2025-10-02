# Authentication API Documentation

این مستند شامل تمام endpoint های مربوط به احراز هویت (Authentication) است که می‌توانید در فرانت‌اند خود استفاده کنید.

## Base URL
```
http://your-domain.com/api
```

## Headers
برای تمام درخواست‌ها:
```
Content-Type: application/json
Accept: application/json
```

برای endpoint های محافظت شده:
```
Authorization: Bearer {your-token}
```

---

## 1. ثبت نام (Register)

### Endpoint
```
POST /register
```

### Request Body
```json
{
    "name": "نام کاربر",
    "email": "user@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

### Response (Success - 201)
```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "نام کاربر",
            "email": "user@example.com",
            "created_at": "2024-01-01T00:00:00.000000Z"
        },
        "token": "1|abcdefghijklmnopqrstuvwxyz",
        "token_type": "Bearer"
    }
}
```

### Response (Validation Error - 422)
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "email": ["Email already exists"],
        "password": ["Password must be at least 8 characters"]
    }
}
```

### Validation Rules
- `name`: الزامی، رشته، حداکثر 255 کاراکتر
- `email`: الزامی، ایمیل معتبر، حداکثر 255 کاراکتر، یکتا
- `password`: الزامی، رشته، حداقل 8 کاراکتر
- `password_confirmation`: باید با password مطابقت داشته باشد

---

## 2. ورود (Login)

### Endpoint
```
POST /login
```

### Request Body
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

### Response (Success - 200)
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "نام کاربر",
            "email": "user@example.com",
            "created_at": "2024-01-01T00:00:00.000000Z"
        },
        "token": "2|abcdefghijklmnopqrstuvwxyz",
        "token_type": "Bearer"
    }
}
```

### Response (Invalid Credentials - 401)
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

### Response (Validation Error - 422)
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "email": ["Email is required"],
        "password": ["Password is required"]
    }
}
```

### Validation Rules
- `email`: الزامی، ایمیل معتبر
- `password`: الزامی، رشته

---

## 3. خروج (Logout)

### Endpoint
```
POST /logout
```

### Headers
```
Authorization: Bearer {your-token}
```

### Request Body
```json
{}
```

### Response (Success - 200)
```json
{
    "success": true,
    "message": "Logout successful"
}
```

### Response (Unauthorized - 401)
```json
{
    "message": "Unauthenticated."
}
```

---

## 4. دریافت اطلاعات کاربر (Get User Info)

### Endpoint
```
GET /me
```

### Headers
```
Authorization: Bearer {your-token}
```

### Response (Success - 200)
```json
{
    "success": true,
    "data": {
        "user": {
            "id": 1,
            "name": "نام کاربر",
            "email": "user@example.com",
            "created_at": "2024-01-01T00:00:00.000000Z"
        }
    }
}
```

### Response (Unauthorized - 401)
```json
{
    "message": "Unauthenticated."
}
```

---

## نمونه کد JavaScript

### ثبت نام
```javascript
const register = async (userData) => {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // ذخیره token در localStorage
            localStorage.setItem('auth_token', data.data.token);
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

// استفاده
register({
    name: 'نام کاربر',
    email: 'user@example.com',
    password: 'password123',
    password_confirmation: 'password123'
});
```

### ورود
```javascript
const login = async (credentials) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // ذخیره token در localStorage
            localStorage.setItem('auth_token', data.data.token);
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// استفاده
login({
    email: 'user@example.com',
    password: 'password123'
});
```

### خروج
```javascript
const logout = async () => {
    try {
        const token = localStorage.getItem('auth_token');
        
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            // حذف token از localStorage
            localStorage.removeItem('auth_token');
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};
```

### دریافت اطلاعات کاربر
```javascript
const getUserInfo = async () => {
    try {
        const token = localStorage.getItem('auth_token');
        
        const response = await fetch('/api/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            return data.data.user;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Get user info error:', error);
        throw error;
    }
};
```

---

## نکات مهم

1. **Token Management**: همیشه token را در localStorage یا sessionStorage ذخیره کنید
2. **Error Handling**: همیشه خطاها را مدیریت کنید
3. **Security**: هرگز token را در console.log نمایش ندهید
4. **Expiration**: token ها ممکن است منقضی شوند، در این صورت کاربر را به صفحه ورود هدایت کنید
5. **CORS**: اطمینان حاصل کنید که CORS به درستی تنظیم شده است

---

## Status Codes

- `200`: موفقیت‌آمیز
- `201`: ایجاد موفقیت‌آمیز (ثبت نام)
- `401`: عدم احراز هویت
- `422`: خطای اعتبارسنجی
- `500`: خطای سرور