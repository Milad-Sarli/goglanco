# راهنمای نمایش آواتار در فرانت‌اند

این راهنما نحوه نمایش صحیح آواتارهای کاربران در فرانت‌اند را توضیح می‌دهد.

## 📁 مسیر ذخیره‌سازی آواتار

آواتارها در مسیر زیر ذخیره می‌شوند:
```
/public/avatars/
```

## 🔗 نحوه دسترسی به آواتار

### 1. **URL کامل آواتار از API**
وقتی از API پروفایل کاربر استفاده می‌کنید، آواتار به صورت URL کامل برگردانده می‌شود:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "احمد محمدی",
    "email": "ahmad@example.com",
    "avatar": "http://localhost:8000/avatars/1703123456_abc123.jpg"
  }
}
```

### 2. **ساخت URL آواتار در فرانت‌اند**
اگر فقط مسیر نسبی آواتار دارید:

```javascript
// اگر avatar = "avatars/1703123456_abc123.jpg"
const baseURL = "http://localhost:8000"; // یا دامنه اصلی سایت
const avatarURL = `${baseURL}/${user.avatar}`;
```

## 🖼️ نمایش آواتار در کامپوننت‌ها

### React.js
```jsx
import React from 'react';

const UserAvatar = ({ user, size = 50 }) => {
  // بررسی وجود آواتار
  const avatarSrc = user.avatar 
    ? user.avatar.startsWith('http') 
      ? user.avatar 
      : `${process.env.REACT_APP_API_URL}/${user.avatar}`
    : '/default-avatar.png'; // آواتار پیش‌فرض

  return (
    <img
      src={avatarSrc}
      alt={`آواتار ${user.name}`}
      width={size}
      height={size}
      style={{
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #e5e7eb'
      }}
      onError={(e) => {
        // در صورت خطا، آواتار پیش‌فرض نمایش داده شود
        e.target.src = '/default-avatar.png';
      }}
    />
  );
};

export default UserAvatar;
```

### Vue.js
```vue
<template>
  <img
    :src="avatarSrc"
    :alt="`آواتار ${user.name}`"
    :width="size"
    :height="size"
    class="avatar"
    @error="handleImageError"
  />
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    user: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 50
    }
  },
  computed: {
    avatarSrc() {
      if (!this.user.avatar) {
        return '/default-avatar.png';
      }
      
      return this.user.avatar.startsWith('http') 
        ? this.user.avatar 
        : `${process.env.VUE_APP_API_URL}/${this.user.avatar}`;
    }
  },
  methods: {
    handleImageError(event) {
      event.target.src = '/default-avatar.png';
    }
  }
};
</script>

<style scoped>
.avatar {
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
}
</style>
```

### Angular
```typescript
// user-avatar.component.ts
import { Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-avatar',
  template: `
    <img
      [src]="avatarSrc"
      [alt]="'آواتار ' + user.name"
      [width]="size"
      [height]="size"
      class="avatar"
      (error)="handleImageError($event)"
    />
  `,
  styles: [`
    .avatar {
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #e5e7eb;
    }
  `]
})
export class UserAvatarComponent {
  @Input() user: any;
  @Input() size: number = 50;

  get avatarSrc(): string {
    if (!this.user.avatar) {
      return '/assets/default-avatar.png';
    }
    
    return this.user.avatar.startsWith('http') 
      ? this.user.avatar 
      : `${environment.apiUrl}/${this.user.avatar}`;
  }

  handleImageError(event: any): void {
    event.target.src = '/assets/default-avatar.png';
  }
}
```

## 🔧 تنظیمات متغیرهای محیطی

### React (.env)
```env
REACT_APP_API_URL=http://localhost:8000
```

### Vue (.env)
```env
VUE_APP_API_URL=http://localhost:8000
```

### Angular (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000'
};
```

## 📱 نمایش آواتار در اندازه‌های مختلف

```javascript
// اندازه‌های مختلف آواتار
const AvatarSizes = {
  small: 32,    // برای لیست‌ها
  medium: 50,   // برای کارت‌ها
  large: 80,    // برای پروفایل
  xlarge: 120   // برای صفحه پروفایل اصلی
};

// استفاده
<UserAvatar user={user} size={AvatarSizes.large} />
```

## 🎨 استایل‌های مختلف آواتار

### آواتار دایره‌ای
```css
.avatar-circle {
  border-radius: 50%;
  object-fit: cover;
}
```

### آواتار مربعی با گوشه‌های گرد
```css
.avatar-rounded {
  border-radius: 8px;
  object-fit: cover;
}
```

### آواتار با حاشیه
```css
.avatar-bordered {
  border: 3px solid #3b82f6;
  box-shadow: 0 0 0 2px #ffffff;
}
```

## 🔄 مدیریت آواتار پیش‌فرض

### ایجاد آواتار با حروف اول نام
```javascript
const generateInitialAvatar = (name) => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
    
  return `https://ui-avatars.com/api/?name=${initials}&background=3b82f6&color=ffffff&size=200`;
};

// استفاده
const avatarSrc = user.avatar || generateInitialAvatar(user.name);
```

## 📋 چک‌لیست پیاده‌سازی

- [ ] تنظیم متغیر محیطی برای URL پایه
- [ ] ایجاد کامپوننت آواتار قابل استفاده مجدد
- [ ] مدیریت خطاهای بارگذاری تصویر
- [ ] تعریف آواتار پیش‌فرض
- [ ] پشتیبانی از اندازه‌های مختلف
- [ ] بهینه‌سازی برای عملکرد (lazy loading)
- [ ] تست در مرورگرهای مختلف

## 🚀 نکات بهینه‌سازی

### Lazy Loading
```jsx
<img
  src={avatarSrc}
  alt={`آواتار ${user.name}`}
  loading="lazy"
  width={size}
  height={size}
/>
```

### WebP Support
```javascript
const getOptimizedAvatarUrl = (avatarPath) => {
  if (!avatarPath) return '/default-avatar.png';
  
  // اگر مرورگر از WebP پشتیبانی می‌کند
  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;
    
  if (supportsWebP && avatarPath.includes('.jpg')) {
    return avatarPath.replace('.jpg', '.webp');
  }
  
  return avatarPath;
};
```

## 🔒 نکات امنیتی

1. **اعتبارسنجی URL:** همیشه URL آواتار را اعتبارسنجی کنید
2. **محدودیت دامنه:** فقط از دامنه‌های مجاز تصاویر بارگذاری کنید
3. **Content Security Policy:** تنظیم CSP برای تصاویر

```javascript
const isValidAvatarUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const allowedDomains = ['localhost:8000', 'yourdomain.com'];
    return allowedDomains.includes(urlObj.host);
  } catch {
    return false;
  }
};
```

---

**نکته مهم:** همیشه مطمئن شوید که سرور Laravel شما در حال اجرا است و فایل‌های آواتار در مسیر `public/avatars` قابل دسترسی هستند.