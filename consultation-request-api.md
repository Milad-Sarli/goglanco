# راهنمای استفاده از API درخواست مشاوره

این راهنما نحوه استفاده از API درخواست مشاوره در فرانت‌اند را توضیح می‌دهد.

## دریافت لیست درخواست‌های مشاوره

```
GET /api/consultation-requests
```

### پاسخ

```json
{
  "message": "Consultation requests retrieved successfully",
  "data": [
    {
      "id": 1,
      "fullname": "نام کامل",
      "email": "email@example.com",
      "phone": "09123456789",
      "preferred_date": "2024-06-15",
      "message": "متن پیام درخواست مشاوره",
      "status": "pending",
      "created_at": "2024-06-10T12:00:00.000000Z",
      "updated_at": "2024-06-10T12:00:00.000000Z"
    }
  ]
}
```

## ارسال درخواست مشاوره

```
POST /api/consultation-requests
```

## پارامترهای درخواست

درخواست باید به صورت `application/json` ارسال شود و شامل فیلدهای زیر باشد:

| فیلد | نوع | توضیحات | اجباری |
|------|------|------------|----------|
| fullname | string | نام کامل متقاضی | بله |
| email | string | آدرس ایمیل معتبر | بله |
| phone | string | شماره تلفن (حداکثر 20 کاراکتر) | خیر |
| preferred_date | date | تاریخ ترجیحی برای مشاوره (باید امروز یا بعد از آن باشد) | خیر |
| message | string | پیام یا توضیحات متقاضی | بله |

## مثال درخواست

```javascript
// با استفاده از fetch
fetch('https://your-domain.com/api/consultation-requests', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    fullname: 'نام و نام خانوادگی',
    email: 'example@email.com',
    phone: '09123456789',
    preferred_date: '2024-06-30',
    message: 'متن پیام درخواست مشاوره'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

// با استفاده از axios
axios.post('https://your-domain.com/api/consultation-requests', {
  fullname: 'نام و نام خانوادگی',
  email: 'example@email.com',
  phone: '09123456789',
  preferred_date: '2024-06-30',
  message: 'متن پیام درخواست مشاوره'
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error.response.data);
});
```

## پاسخ موفق

در صورت موفقیت، API با کد وضعیت `201 Created` پاسخ می‌دهد و یک JSON شامل پیام موفقیت و اطلاعات درخواست ثبت شده برمی‌گرداند:

```json
{
  "message": "Consultation request submitted successfully!",
  "data": {
    "id": 1,
    "fullname": "نام و نام خانوادگی",
    "email": "example@email.com",
    "phone": "09123456789",
    "preferred_date": "2024-06-30",
    "message": "متن پیام درخواست مشاوره",
    "status": "pending",
    "created_at": "2024-06-15T12:00:00.000000Z",
    "updated_at": "2024-06-15T12:00:00.000000Z"
  }
}
```

## خطاها

در صورت بروز خطا در اعتبارسنجی، API با کد وضعیت `422 Unprocessable Entity` پاسخ می‌دهد و جزئیات خطاها را برمی‌گرداند:

```json
{
  "fullname": [
    "The fullname field is required."
  ],
  "email": [
    "The email field is required."
  ],
  "message": [
    "The message field is required."
  ]
}
```

## نکات مهم

1. پس از ارسال موفق درخواست، یک ایمیل اطلاع‌رسانی به آدرس `miladsarli4444@gmail.com` ارسال می‌شود.
2. وضعیت اولیه همه درخواست‌ها `pending` است.
3. تاریخ ترجیحی باید در فرمت `YYYY-MM-DD` و برابر یا بعد از تاریخ امروز باشد.
4. فیلدهای `phone` و `preferred_date` اختیاری هستند.

## مدیریت خطاها در فرانت‌اند

```javascript
// نمونه کد برای مدیریت خطاها
const handleSubmit = async (formData) => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await axios.post('https://your-domain.com/api/consultation-requests', formData);
    
    setSuccess(true);
    setFormData(initialFormState); // پاک کردن فرم
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      // خطاهای اعتبارسنجی
      setValidationErrors(error.response.data);
    } else {
      // سایر خطاها
      setError('خطا در ارسال درخواست. لطفا دوباره تلاش کنید.');
    }
    return null;
  } finally {
    setLoading(false);
  }
};
```