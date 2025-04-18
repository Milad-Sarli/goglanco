# Portfolio Admin API Requirements

This document outlines the API endpoints required for the portfolio admin functionality.

## Base URL

All API endpoints are prefixed with `/api/portfolio/`

## Endpoints

### Hero Section

#### GET /api/portfolio/hero
- Returns the hero section content
- Response: `{ data: { title: string, subtitle: string, description: string } }`

#### PUT /api/portfolio/hero
- Updates the hero section content
- Request Body: `{ title: string, subtitle: string, description: string }`
- Response: `{ success: boolean, data: { title: string, subtitle: string, description: string } }`

### Categories

#### GET /api/portfolio/categories
- Returns all categories
- Response: `{ data: Array<{ id: number, name: string, description: string }> }`

#### POST /api/portfolio/categories
- Creates a new category
- Request Body: `{ name: string, description: string }`
- Response: `{ success: boolean, data: { id: number, name: string, description: string } }`

#### DELETE /api/portfolio/categories/:id
- Deletes a category
- Response: `{ success: boolean }`

### Gallery

#### GET /api/portfolio/gallery
- Returns all gallery items
- Response: `{ data: Array<{ id: number, title: string, image: string, category: string }> }`

#### POST /api/portfolio/gallery
- Creates a new gallery item
- Request Body: `{ title: string, image: string, category: string }`
- Response: `{ success: boolean, data: { id: number, title: string, image: string, category: string } }`

#### DELETE /api/portfolio/gallery/:id
- Deletes a gallery item
- Response: `{ success: boolean }`

### Testimonials

#### GET /api/portfolio/testimonials
- Returns all testimonials
- Response: `{ data: Array<{ id: number, name: string, text: string, rating: number }> }`

#### POST /api/portfolio/testimonials
- Creates a new testimonial
- Request Body: `{ name: string, text: string, rating: number }`
- Response: `{ success: boolean, data: { id: number, name: string, text: string, rating: number } }`

#### DELETE /api/portfolio/testimonials/:id
- Deletes a testimonial
- Response: `{ success: boolean }`

### Call to Action (CTA)

#### GET /api/portfolio/cta
- Returns the CTA section content
- Response: `{ data: { title: string, description: string, buttonText: string } }`

#### PUT /api/portfolio/cta
- Updates the CTA section content
- Request Body: `{ title: string, description: string, buttonText: string }`
- Response: `{ success: boolean, data: { title: string, description: string, buttonText: string } }`

## Error Responses

All endpoints may return the following error responses:

```json
{
  "success": false,
  "error": {
    "message": "Error message description",
    "code": "ERROR_CODE"
  }
}
```

Common error codes:
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `SERVER_ERROR`: Internal server error

## Authentication

All admin API endpoints require authentication. Include the authentication token in the request headers:

```
Authorization: Bearer <token>
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse. The current limits are:
- 100 requests per minute per IP address
- 1000 requests per hour per IP address

## Data Validation

- All text fields have a maximum length of 500 characters
- Image URLs must be valid URLs
- Ratings must be between 1 and 5
- IDs must be positive integers

## Development Notes

For development and testing purposes, when the API routes are not yet implemented or when data is not available, the admin interface will use fallback data to preview the features. This allows for development and testing of the UI components before the backend implementation is complete. 