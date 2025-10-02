# مدیریت کاربران API

این سند راهنمای API برای مدیریت کاربران در سیستم است.

## نقاط پایانی API

### دریافت لیست کاربران

```
GET /api/users
```

**هدرهای مورد نیاز:**
- Authorization: Bearer {token}

**پاسخ موفق:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "نام کاربر",
      "email": "user@example.com",
      "phone": "09123456789",
      "address": "آدرس کاربر",
      "avatar": "avatars/filename.jpg",
      "created_at": "2023-01-01T00:00:00.000000Z",
      "updated_at": "2023-01-01T00:00:00.000000Z"
    }
  ]
}
```

### دریافت اطلاعات یک کاربر

```
GET /api/users/{user_id}
```

**هدرهای مورد نیاز:**
- Authorization: Bearer {token}

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "نام کاربر",
    "email": "user@example.com",
    "phone": "09123456789",
    "address": "آدرس کاربر",
    "avatar": "avatars/filename.jpg",
    "created_at": "2023-01-01T00:00:00.000000Z",
    "updated_at": "2023-01-01T00:00:00.000000Z"
  }
}
```

### ایجاد کاربر جدید

```
POST /api/users
```

**هدرهای مورد نیاز:**
- Authorization: Bearer {token}
- Content-Type: multipart/form-data (در صورت ارسال فایل)

**پارامترهای درخواست:**
- name: نام کاربر (الزامی)
- email: ایمیل کاربر (الزامی، باید منحصر به فرد باشد)
- password: رمز عبور (الزامی، حداقل 8 کاراکتر)
- phone: شماره تلفن (اختیاری)
- address: آدرس (اختیاری)
- avatar: تصویر پروفایل (اختیاری، فایل تصویر)

**پاسخ موفق:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "نام کاربر",
    "email": "user@example.com",
    "phone": "09123456789",
    "address": "آدرس کاربر",
    "avatar": "avatars/filename.jpg",
    "created_at": "2023-01-01T00:00:00.000000Z",
    "updated_at": "2023-01-01T00:00:00.000000Z"
  }
}
```

### به‌روزرسانی کاربر

```
PUT /api/users/{user_id}
```

**هدرهای مورد نیاز:**
- Authorization: Bearer {token}
- Content-Type: multipart/form-data (در صورت ارسال فایل)

**پارامترهای درخواست:**
- name: نام کاربر (اختیاری)
- email: ایمیل کاربر (اختیاری، باید منحصر به فرد باشد)
- password: رمز عبور (اختیاری، حداقل 8 کاراکتر)
- phone: شماره تلفن (اختیاری)
- address: آدرس (اختیاری)
- avatar: تصویر پروفایل (اختیاری، فایل تصویر)

**پاسخ موفق:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "نام کاربر",
    "email": "user@example.com",
    "phone": "09123456789",
    "address": "آدرس کاربر",
    "avatar": "avatars/filename.jpg",
    "created_at": "2023-01-01T00:00:00.000000Z",
    "updated_at": "2023-01-01T00:00:00.000000Z"
  }
}
```

### حذف کاربر

```
DELETE /api/users/{user_id}
```

**هدرهای مورد نیاز:**
- Authorization: Bearer {token}

**پاسخ موفق:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### به‌روزرسانی پروفایل کاربر

```
PUT /api/profile
```

**هدرهای مورد نیاز:**
- Authorization: Bearer {token}
- Content-Type: multipart/form-data (در صورت ارسال فایل)

**پارامترهای درخواست:**
- name: نام کاربر (اختیاری)
- email: ایمیل کاربر (اختیاری، باید منحصر به فرد باشد)
- phone: شماره تلفن (اختیاری)
- address: آدرس (اختیاری)
- avatar: تصویر پروفایل (اختیاری، فایل تصویر)

**پاسخ موفق:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "name": "نام کاربر",
    "email": "user@example.com",
    "phone": "09123456789",
    "address": "آدرس کاربر",
    "avatar": "avatars/filename.jpg",
    "created_at": "2023-01-01T00:00:00.000000Z",
    "updated_at": "2023-01-01T00:00:00.000000Z"
  }
}
```

### تغییر رمز عبور

```
POST /api/change-password
```

**هدرهای مورد نیاز:**
- Authorization: Bearer {token}

**پارامترهای درخواست:**
- current_password: رمز عبور فعلی (الزامی)
- new_password: رمز عبور جدید (الزامی، حداقل 8 کاراکتر)
- confirm_password: تکرار رمز عبور جدید (الزامی، باید با new_password یکسان باشد)

**پاسخ موفق:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

## کدهای خطا

- 401: عدم احراز هویت یا توکن نامعتبر
- 403: عدم دسترسی به منبع
- 404: منبع یافت نشد
- 422: خطای اعتبارسنجی داده‌ها
- 500: خطای سرور