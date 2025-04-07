# Laravel API Requirements for Admin Panel

## Authentication
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/user

## Pages Management
- GET /api/pages
- GET /api/pages/{id}
- POST /api/pages
- PUT /api/pages/{id}
- DELETE /api/pages/{id}

## Header/Footer Management
- GET /api/header-footer
- PUT /api/header-footer

## Portfolio Management
- GET /api/portfolio
- GET /api/portfolio/{id}
- POST /api/portfolio
- PUT /api/portfolio/{id}
- DELETE /api/portfolio/{id}
- POST /api/portfolio/{id}/upload-image

## Testimonials Management
- GET /api/testimonials
- GET /api/testimonials/{id}
- POST /api/testimonials
- PUT /api/testimonials/{id}
- DELETE /api/testimonials/{id}

## Contact Management
- GET /api/contact
- PUT /api/contact
- GET /api/contact/messages
- GET /api/contact/messages/{id}
- DELETE /api/contact/messages/{id}

## Settings
- GET /api/settings
- PUT /api/settings

## Data Models

### Page
```php
{
  id: number,
  title: string,
  slug: string,
  content: string,
  meta_title: string,
  meta_description: string,
  status: 'published' | 'draft',
  created_at: string,
  updated_at: string
}
```

### Portfolio Item
```php
{
  id: number,
  title: string,
  description: string,
  image_url: string,
  category: string,
  status: 'published' | 'draft',
  created_at: string,
  updated_at: string
}
```

### Testimonial
```php
{
  id: number,
  name: string,
  position: string,
  company: string,
  content: string,
  image_url: string,
  rating: number,
  status: 'published' | 'draft',
  created_at: string,
  updated_at: string
}
```

### Contact Settings
```php
{
  email: string,
  phone: string,
  address: string,
  social_media: {
    facebook: string,
    twitter: string,
    instagram: string,
    linkedin: string
  }
}
```

### Header/Footer Settings
```php
{
  header: {
    logo_url: string,
    menu_items: Array<{
      title: string,
      url: string,
      order: number
    }>
  },
  footer: {
    copyright_text: string,
    menu_items: Array<{
      title: string,
      url: string,
      order: number
    }>
  }
}
```

## Security Requirements
1. All endpoints except login should require authentication
2. Use JWT for authentication
3. Implement rate limiting
4. Validate all input data
5. Sanitize output data
6. Implement CORS policies
7. Use HTTPS

## Response Format
All API responses should follow this format:
```json
{
  "success": boolean,
  "data": object | array | null,
  "message": string,
  "errors": array | null
}
```

## Error Codes
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Server Error 