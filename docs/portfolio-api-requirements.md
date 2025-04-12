# Portfolio API Requirements

## Overview
This document outlines the API requirements for the Portfolio section of the website. The Portfolio section showcases before/after transformations of restoration work and is managed through an admin interface. It requires endpoints for creating, retrieving, updating, and deleting portfolio items, as well as handling image uploads.

## API Endpoints

### 1. Get Portfolio Items
- **Endpoint:** `GET /api/portfolio`
- **Authentication:** Required (Bearer Token)
- **Description:** Retrieves all portfolio items
- **Response Format:**
```json
{
    "data": [{
        "id": "number",
        "title": "string",
        "category": "string",
        "beforeImage": "string (URL)",
        "afterImage": "string (URL)",
        "description": "string",
        "tags": ["string"],
        "created_at": "string (ISO date)",
        "updated_at": "string (ISO date)"
    }],
    "message": "string (optional)",
    "status": "number"
}
```

### 2. Create Portfolio Item
- **Endpoint:** `POST /api/portfolio`
- **Authentication:** Required (Bearer Token)
- **Description:** Creates a new portfolio item
- **Request Body:**
```json
{
    "title": "string",
    "category": "string",
    "beforeImage": "string (URL)",
    "afterImage": "string (URL)",
    "description": "string",
    "tags": ["string"]
}
```
- **Response Format:** Same as single item in GET response

### 3. Update Portfolio Item
- **Endpoint:** `PUT /api/portfolio/{id}`
- **Authentication:** Required (Bearer Token)
- **Description:** Updates an existing portfolio item
- **Request Body:** Same as POST but all fields optional
- **Response Format:** Same as single item in GET response

### 4. Delete Portfolio Item
- **Endpoint:** `DELETE /api/portfolio/{id}`
- **Authentication:** Required (Bearer Token)
- **Description:** Deletes a portfolio item
- **Response Format:**
```json
{
    "message": "string",
    "status": "number"
}
```

### 5. Upload Image
- **Endpoint:** `POST /api/portfolio/upload-image`
- **Authentication:** Required (Bearer Token)
- **Description:** Uploads an image file for portfolio items
- **Request Format:** Multipart form data
```
Content-Type: multipart/form-data
{
    "image": File (Required, Image file),
    "type": "string" (Required, either "before" or "after")
}
```
- **Response Format:**
```json
{
    "data": {
        "url": "string (URL to access the uploaded image)",
        "filename": "string (name of the file on server)"
    },
    "message": "string",
    "status": "number"
}
```
- **Supported Image Types:** JPEG, PNG, WebP
- **Maximum File Size:** 10MB
- **Image Requirements:**
  - Minimum dimensions: 800x600 pixels
  - Maximum dimensions: 3840x2160 pixels
  - Aspect ratio: 4:3 preferred

## Database Schema

### Portfolio Items Table
```sql
CREATE TABLE portfolio_items (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    before_image VARCHAR(255) NOT NULL,
    after_image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Portfolio Tags Table
```sql
CREATE TABLE portfolio_tags (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    portfolio_item_id BIGINT UNSIGNED NOT NULL,
    tag VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (portfolio_item_id) REFERENCES portfolio_items(id) ON DELETE CASCADE,
    UNIQUE KEY unique_portfolio_tag (portfolio_item_id, tag)
);
```

## Data Validation Rules

### Portfolio Item Data
- **title**: Required, max 255 characters
- **category**: Required, max 100 characters
- **beforeImage**: Required, valid URL, max 255 characters
- **afterImage**: Required, valid URL, max 255 characters
- **description**: Required, max 2000 characters
- **tags**: Array of strings, each max 50 characters

### Image Upload Rules
- **File Size:** Maximum 10MB
- **File Types:** .jpg, .jpeg, .png, .webp
- **Image Dimensions:**
  - Width: 800px - 3840px
  - Height: 600px - 2160px
- **File Naming:** Sanitized, unique names generated server-side
- **Storage:** Images should be stored in a secure location with appropriate backup

## Security Considerations
1. All endpoints require authentication via Bearer token
2. Input validation should be performed on both frontend and backend
3. URLs should be validated for security
4. CORS should be properly configured
5. Rate limiting should be implemented
6. Validate file mime types server-side
7. Scan uploaded files for malware
8. Implement maximum upload size limits
9. Generate unique filenames to prevent overwriting
10. Store files outside of public web root

## Example Laravel Routes
```php
// routes/api.php
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('portfolio', PortfolioController::class);
    Route::post('/portfolio/upload-image', [PortfolioController::class, 'uploadImage']);
});
```

## Example Response Codes
- 200: Successful GET/PUT request
- 201: Successful POST request or file upload
- 204: Successful DELETE request
- 401: Unauthorized
- 403: Forbidden
- 404: Resource not found
- 413: File too large
- 415: Unsupported file type
- 422: Validation error
- 500: Server error

## File Storage Configuration
1. Configure secure file storage location
2. Implement file access controls
3. Set up CDN for image delivery (optional)
4. Configure image optimization pipeline
5. Set up backup system for uploaded files

## Image Processing
1. Implement server-side image validation
2. Optimize images for web delivery
3. Generate multiple sizes for responsive design
4. Strip EXIF data for privacy
5. Validate image dimensions
6. Convert to web-optimized formats

## Notes for Backend Implementation
1. Implement soft deletes for both tables
2. Consider caching frequently accessed portfolio items
3. Set up proper file upload handling with validation
4. Consider implementing versioning for portfolio content
5. Add audit logging for tracking changes
6. Implement backup strategy for images
7. Consider implementing a preview system before publishing changes
8. Implement image optimization pipeline
9. Set up proper file cleanup for unused images
10. Implement pagination for portfolio items list
11. Add sorting and filtering capabilities
12. Implement search functionality 