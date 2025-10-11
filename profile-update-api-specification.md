# Profile Update API Specification

## مشکل فعلی
در تب Profile، فیلدهای `name`, `email`, `phone`, `avatar`, و `address` به درستی آپدیت نمی‌شوند. مقادیری که کاربر در اینپوت‌ها وارد می‌کند به دیتابیس ارسال نمی‌شوند.

## راه‌حل پیشنهادی

### 1. ساختار داده‌های ارسالی به بک‌اند

#### برای آپدیت اطلاعات شخصی (Personal Information):
```javascript
// FormData structure for profile update
const formData = new FormData();
formData.append('name', 'نام کاربر');
formData.append('email', 'user@example.com');
formData.append('phone', '09123456789');
formData.append('avatar', fileObject); // فقط در صورت انتخاب فایل جدید
```

#### برای آپدیت آدرس (Address Information):
```javascript
// FormData structure for address update
const formData = new FormData();
formData.append('address', 'آدرس کامل کاربر');
```

### 2. منطق پردازش در فرانت‌اند

#### تابع handleProfileUpdate:
```javascript
const handleProfileUpdate = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.currentTarget);
  const cleanFormData = new FormData();
  
  // اضافه کردن تمام فیلدها به FormData
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const avatar = formData.get('avatar');
  
  if (name) cleanFormData.append('name', name.trim());
  if (email) cleanFormData.append('email', email.trim());
  if (phone) cleanFormData.append('phone', phone.trim());
  if (avatar && avatar.size > 0) cleanFormData.append('avatar', avatar);
  
  // ارسال به بک‌اند
  const response = await updateUserProfile(cleanFormData);
};
```

#### تابع handleAddressUpdate:
```javascript
const handleAddressUpdate = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.currentTarget);
  const address = formData.get('address');
  
  const cleanFormData = new FormData();
  if (address) cleanFormData.append('address', address.trim());
  
  // ارسال به بک‌اند
  const response = await updateUserProfile(cleanFormData);
};
```

### 3. انتظارات از بک‌اند

#### Endpoint: `PUT/PATCH /api/user/profile`

#### Headers:
```
Content-Type: multipart/form-data
Authorization: Bearer {token}
```

#### Request Body (FormData):
```
name: string (اختیاری)
email: string (اختیاری)
phone: string (اختیاری)
address: string (اختیاری)
avatar: File (اختیاری)
```

#### Response Format:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 5,
    "name": "نام به‌روزرسانی شده",
    "email": "email@updated.com",
    "phone": "09123456789",
    "address": "آدرس به‌روزرسانی شده",
    "avatar": "path/to/avatar.jpg",
    "email_verified_at": null,
    "created_at": "2025-10-02T05:15:19.000000Z",
    "updated_at": "2025-10-11T18:30:00.000000Z"
  }
}
```

### 4. نکات مهم برای بک‌اند

1. **Partial Update**: بک‌اند باید قابلیت به‌روزرسانی جزئی داشته باشد (فقط فیلدهای ارسال شده را آپدیت کند)

2. **File Handling**: برای فیلد `avatar`, بک‌اند باید:
   - فایل را در مسیر مناسب ذخیره کند
   - URL کامل فایل را در response برگرداند
   - فرمت‌های مجاز: JPEG, PNG, JPG, GIF
   - حداکثر سایز: 2MB

3. **Validation**: بک‌اند باید اعتبارسنجی کند:
   - فرمت ایمیل
   - طول نام (حداقل 2 کاراکتر)
   - فرمت شماره تلفن (اختیاری)

4. **Error Handling**: در صورت خطا:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["The email format is invalid"],
    "name": ["The name field is required"]
  }
}
```

### 5. تست‌های مورد نیاز

1. آپدیت تک فیلد (مثلاً فقط نام)
2. آپدیت چند فیلد همزمان
3. آپلود فایل avatar
4. آپدیت با فیلدهای خالی
5. اعتبارسنجی داده‌های نامعتبر

### 6. مثال کامل درخواست

```javascript
// مثال آپدیت کامل
const formData = new FormData();
formData.append('name', 'احمد محمدی');
formData.append('email', 'ahmad@example.com');
formData.append('phone', '09123456789');
formData.append('address', 'تهران، خیابان ولیعصر، پلاک 123');
// avatar فقط در صورت انتخاب فایل جدید اضافه می‌شود

fetch('/api/user/profile', {
  method: 'POST', // یا PUT/PATCH
  headers: {
    'Authorization': 'Bearer ' + token
  },
  body: formData
});
```

## خلاصه تغییرات مورد نیاز

1. **فرانت‌اند**: اطمینان از ارسال صحیح داده‌ها در FormData
2. **بک‌اند**: پشتیبانی از partial update و file upload
3. **همگام‌سازی**: response بک‌اند باید داده‌های به‌روزرسانی شده را برگرداند
4. **UI Update**: پس از دریافت response موفق، state فرانت‌اند باید به‌روزرسانی شود