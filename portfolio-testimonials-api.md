# Portfolio Testimonials API Documentation

این مستند راهنمای استفاده از API های مربوط به نظرات پورتفولیو برای استفاده در فرانت‌اند می‌باشد.

## Base URL
```
http://your-domain.com/api
```

## Authentication
برای برخی از endpoint ها نیاز به احراز هویت دارید. از Sanctum token استفاده کنید:

```javascript
headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
```

## Endpoints

### 1. دریافت تمام نظرات (عمومی)

**GET** `/api/portfolio/testimonials`

این endpoint برای نمایش عمومی تمام نظرات استفاده می‌شود.

#### Request
```javascript
fetch('/api/portfolio/testimonials', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
```

#### Response
```json
{
    "data": [
        {
            "id": 1,
            "name": "احمد محمدی",
            "text": "خدمات عالی و کیفیت بالا",
            "rating": 5
        },
        {
            "id": 2,
            "name": "فاطمه احمدی",
            "text": "بسیار راضی از همکاری",
            "rating": 4
        }
    ],
    "status": 200
}
```

### 2. ثبت نظر جدید (نیاز به احراز هویت)

**POST** `/api/portfolio/testimonials`

برای ثبت نظر جدید توسط کاربر احراز هویت شده.

#### Request
```javascript
fetch('/api/portfolio/testimonials', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        name: 'نام شما',
        text: 'متن نظر شما',
        rating: 5
    })
})
```

#### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | نام نظردهنده (حداکثر 500 کاراکتر) |
| text | string | Yes | متن نظر (حداکثر 500 کاراکتر) |
| rating | integer | Yes | امتیاز (1 تا 5) |

#### Response (Success - 201)
```json
{
    "success": true,
    "data": {
        "id": 3,
        "name": "نام شما",
        "text": "متن نظر شما",
        "rating": 5,
        "user_id": 1
    },
    "status": 201
}
```

#### Response (Validation Error - 422)
```json
{
    "message": "The given data was invalid.",
    "errors": {
        "name": ["The name field is required."],
        "text": ["The text field is required."],
        "rating": ["The rating must be between 1 and 5."]
    }
}
```

### 3. دریافت نظرات کاربر (نیاز به احراز هویت)

**GET** `/api/user/testimonials`

برای دریافت نظراتی که کاربر احراز هویت شده ثبت کرده است.

#### Request
```javascript
fetch('/api/user/testimonials', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
```

#### Response
```json
{
    "data": [
        {
            "id": 3,
            "name": "نام شما",
            "text": "متن نظر شما",
            "rating": 5,
            "created_at": "2024-01-15T10:30:00.000000Z",
            "updated_at": "2024-01-15T10:30:00.000000Z"
        }
    ],
    "status": 200
}
```

### 4. حذف نظر

**DELETE** `/api/portfolio/testimonials/{testimonial_id}`

برای حذف یک نظر خاص.

#### Request
```javascript
fetch('/api/portfolio/testimonials/3', {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
```

#### Response
```json
{
    "success": true,
    "status": 200
}
```

## نمونه کد React/JavaScript

### کامپوننت نمایش نظرات

```javascript
import React, { useState, useEffect } from 'react';

const TestimonialsList = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch('/api/portfolio/testimonials');
            const data = await response.json();
            setTestimonials(data.data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>در حال بارگذاری...</div>;

    return (
        <div className="testimonials-list">
            {testimonials.map(testimonial => (
                <div key={testimonial.id} className="testimonial-card">
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.text}</p>
                    <div className="rating">
                        {'★'.repeat(testimonial.rating)}
                        {'☆'.repeat(5 - testimonial.rating)}
                    </div>
                </div>
            ))}
        </div>
    );
};
```

### کامپوننت ثبت نظر

```javascript
import React, { useState } from 'react';

const TestimonialForm = ({ token, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        text: '',
        rating: 5
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const response = await fetch('/api/portfolio/testimonials', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                onSuccess && onSuccess(data.data);
                setFormData({ name: '', text: '', rating: 5 });
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error('Error submitting testimonial:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="testimonial-form">
            <div className="form-group">
                <label>نام:</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                />
                {errors.name && <span className="error">{errors.name[0]}</span>}
            </div>

            <div className="form-group">
                <label>نظر شما:</label>
                <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    required
                />
                {errors.text && <span className="error">{errors.text[0]}</span>}
            </div>

            <div className="form-group">
                <label>امتیاز:</label>
                <select
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                >
                    {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num} ستاره</option>
                    ))}
                </select>
                {errors.rating && <span className="error">{errors.rating[0]}</span>}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'در حال ارسال...' : 'ثبت نظر'}
            </button>
        </form>
    );
};
```

### کامپوننت نظرات کاربر

```javascript
import React, { useState, useEffect } from 'react';

const UserTestimonials = ({ token }) => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserTestimonials();
    }, []);

    const fetchUserTestimonials = async () => {
        try {
            const response = await fetch('/api/user/testimonials', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            setTestimonials(data.data);
        } catch (error) {
            console.error('Error fetching user testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTestimonial = async (id) => {
        if (!confirm('آیا مطمئن هستید؟')) return;

        try {
            const response = await fetch(`/api/portfolio/testimonials/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setTestimonials(testimonials.filter(t => t.id !== id));
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error);
        }
    };

    if (loading) return <div>در حال بارگذاری...</div>;

    return (
        <div className="user-testimonials">
            <h2>نظرات شما</h2>
            {testimonials.length === 0 ? (
                <p>شما هنوز نظری ثبت نکرده‌اید.</p>
            ) : (
                testimonials.map(testimonial => (
                    <div key={testimonial.id} className="testimonial-card">
                        <h3>{testimonial.name}</h3>
                        <p>{testimonial.text}</p>
                        <div className="rating">
                            {'★'.repeat(testimonial.rating)}
                            {'☆'.repeat(5 - testimonial.rating)}
                        </div>
                        <small>ثبت شده در: {new Date(testimonial.created_at).toLocaleDateString('fa-IR')}</small>
                        <button 
                            onClick={() => deleteTestimonial(testimonial.id)}
                            className="delete-btn"
                        >
                            حذف
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};
```

## نکات مهم

1. **احراز هویت**: برای ثبت نظر و مشاهده نظرات شخصی، حتماً token را در header ارسال کنید.

2. **Validation**: تمام فیلدها اجباری هستند و محدودیت‌های طول دارند.

3. **Rating**: امتیاز باید عددی بین 1 تا 5 باشد.

4. **User ID**: هنگام ثبت نظر، user_id به صورت خودکار از کاربر احراز هویت شده گرفته می‌شود.

5. **Error Handling**: همیشه خطاها را مدیریت کنید و پیام‌های مناسب به کاربر نمایش دهید.

## Status Codes

- **200**: موفقیت‌آمیز
- **201**: ایجاد موفقیت‌آمیز
- **401**: عدم احراز هویت
- **422**: خطای validation
- **404**: یافت نشد
- **500**: خطای سرور