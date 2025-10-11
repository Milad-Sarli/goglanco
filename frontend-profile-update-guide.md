# راهنمای پیاده‌سازی آپدیت پروفایل در فرانت‌اند

## مشکل فعلی
پروفایل کاربر آپدیت نمی‌شود و مقادیر null به بک‌اند ارسال می‌شود.

## راه‌حل فرانت‌اند

### 1. تنظیمات API Client

```javascript
// تنظیم base URL و headers
const API_BASE_URL = '/api';
const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    // توجه: Content-Type را برای FormData تنظیم نکنید
});
```

### 2. تابع آپدیت پروفایل

```javascript
// تابع اصلی آپدیت پروفایل
const updateUserProfile = async (profileData) => {
    try {
        const formData = new FormData();
        
        // اضافه کردن فیلدهای متنی (فقط اگر مقدار داشته باشند)
        if (profileData.name && profileData.name.trim()) {
            formData.append('name', profileData.name.trim());
        }
        
        if (profileData.email && profileData.email.trim()) {
            formData.append('email', profileData.email.trim());
        }
        
        // phone و address می‌توانند خالی باشند
        if (profileData.hasOwnProperty('phone')) {
            formData.append('phone', profileData.phone || '');
        }
        
        if (profileData.hasOwnProperty('address')) {
            formData.append('address', profileData.address || '');
        }
        
        // اضافه کردن فایل avatar (فقط اگر انتخاب شده باشد)
        if (profileData.avatar && profileData.avatar instanceof File) {
            formData.append('avatar', profileData.avatar);
        }
        
        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'POST', // استفاده از POST برای FormData
            headers: getAuthHeaders(),
            body: formData
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'خطا در آپدیت پروفایل');
        }
        
        return result;
        
    } catch (error) {
        console.error('Profile update error:', error);
        throw error;
    }
};
```

### 3. مدیریت فرم در React/Vue

#### برای React:

```jsx
import { useState } from 'react';

const ProfileForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        avatar: null
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // بررسی نوع فایل
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                alert('فرمت فایل مجاز نیست. فقط JPEG, PNG, JPG, GIF');
                return;
            }
            
            // بررسی سایز فایل (2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('سایز فایل نباید بیشتر از 2MB باشد');
                return;
            }
            
            setFormData(prev => ({
                ...prev,
                avatar: file
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const result = await updateUserProfile(formData);
            
            // نمایش پیام موفقیت
            alert('پروفایل با موفقیت آپدیت شد');
            
            // آپدیت state با داده‌های جدید
            if (result.data) {
                setFormData(prev => ({
                    ...prev,
                    name: result.data.name || '',
                    email: result.data.email || '',
                    phone: result.data.phone || '',
                    address: result.data.address || ''
                }));
            }
            
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                alert('خطا در آپدیت پروفایل: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label>نام:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                {errors.name && <span className="error">{errors.name[0]}</span>}
            </div>

            <div>
                <label>ایمیل:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                {errors.email && <span className="error">{errors.email[0]}</span>}
            </div>

            <div>
                <label>تلفن:</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                {errors.phone && <span className="error">{errors.phone[0]}</span>}
            </div>

            <div>
                <label>آدرس:</label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                />
                {errors.address && <span className="error">{errors.address[0]}</span>}
            </div>

            <div>
                <label>تصویر پروفایل:</label>
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/gif"
                    onChange={handleFileChange}
                />
                {errors.avatar && <span className="error">{errors.avatar[0]}</span>}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'در حال آپدیت...' : 'آپدیت پروفایل'}
            </button>
        </form>
    );
};
```

#### برای Vue.js:

```vue
<template>
  <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
    <div>
      <label>نام:</label>
      <input
        v-model="formData.name"
        type="text"
        required
      />
      <span v-if="errors.name" class="error">{{ errors.name[0] }}</span>
    </div>

    <div>
      <label>ایمیل:</label>
      <input
        v-model="formData.email"
        type="email"
        required
      />
      <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>
    </div>

    <div>
      <label>تلفن:</label>
      <input
        v-model="formData.phone"
        type="text"
      />
      <span v-if="errors.phone" class="error">{{ errors.phone[0] }}</span>
    </div>

    <div>
      <label>آدرس:</label>
      <textarea v-model="formData.address"></textarea>
      <span v-if="errors.address" class="error">{{ errors.address[0] }}</span>
    </div>

    <div>
      <label>تصویر پروفایل:</label>
      <input
        type="file"
        accept="image/jpeg,image/png,image/jpg,image/gif"
        @change="handleFileChange"
      />
      <span v-if="errors.avatar" class="error">{{ errors.avatar[0] }}</span>
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? 'در حال آپدیت...' : 'آپدیت پروفایل' }}
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        address: '',
        avatar: null
      },
      loading: false,
      errors: {}
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
          alert('فرمت فایل مجاز نیست');
          return;
        }
        
        if (file.size > 2 * 1024 * 1024) {
          alert('سایز فایل نباید بیشتر از 2MB باشد');
          return;
        }
        
        this.formData.avatar = file;
      }
    },
    
    async handleSubmit() {
      this.loading = true;
      this.errors = {};

      try {
        const result = await updateUserProfile(this.formData);
        alert('پروفایل با موفقیت آپدیت شد');
        
        if (result.data) {
          this.formData = {
            ...this.formData,
            name: result.data.name || '',
            email: result.data.email || '',
            phone: result.data.phone || '',
            address: result.data.address || ''
          };
        }
        
      } catch (error) {
        if (error.response?.data?.errors) {
          this.errors = error.response.data.errors;
        } else {
          alert('خطا در آپدیت پروفایل: ' + error.message);
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
```

### 4. نکات مهم

#### ✅ کارهای ضروری:
1. **استفاده از FormData**: حتماً از FormData برای ارسال داده‌ها استفاده کنید
2. **عدم تنظیم Content-Type**: برای FormData، Content-Type را تنظیم نکنید
3. **استفاده از POST**: برای آپلود فایل از method POST استفاده کنید
4. **بررسی فایل**: نوع و سایز فایل را قبل از ارسال بررسی کنید
5. **Trim کردن**: مقادیر متنی را trim کنید

#### ❌ کارهای اشتباه:
1. ارسال JSON به جای FormData
2. تنظیم Content-Type به application/json
3. ارسال فیلدهای خالی به صورت اجباری
4. عدم بررسی نوع و سایز فایل

### 5. مثال کامل درخواست

```javascript
// مثال کامل ارسال درخواست
const exampleUpdate = async () => {
    const profileData = {
        name: 'احمد محمدی',
        email: 'ahmad@example.com',
        phone: '09123456789',
        address: 'تهران، خیابان ولیعصر',
        avatar: selectedFile // File object از input
    };
    
    try {
        const result = await updateUserProfile(profileData);
        console.log('Success:', result);
        // آپدیت UI با داده‌های جدید
    } catch (error) {
        console.error('Error:', error);
        // نمایش خطا به کاربر
    }
};
```

### 6. مدیریت Response

```javascript
// مدیریت پاسخ موفق
const handleSuccessResponse = (response) => {
    if (response.success && response.data) {
        // آپدیت state/store با داده‌های جدید
        updateUserState(response.data);
        
        // نمایش پیام موفقیت
        showSuccessMessage(response.message);
        
        // اگر avatar آپدیت شده، URL جدید را نمایش دهید
        if (response.data.avatar) {
            updateAvatarDisplay(response.data.avatar);
        }
    }
};

// مدیریت خطاها
const handleErrorResponse = (error) => {
    if (error.response?.data?.errors) {
        // خطاهای validation
        displayValidationErrors(error.response.data.errors);
    } else {
        // خطاهای عمومی
        showErrorMessage(error.message || 'خطا در آپدیت پروفایل');
    }
};
```

با پیاده‌سازی این کدها در فرانت‌اند، مشکل آپدیت پروفایل حل خواهد شد و داده‌ها به درستی به بک‌اند ارسال می‌شوند.