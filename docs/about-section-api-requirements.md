# About Page API Requirements

## Overview
This document outlines the API requirements for the About page sections of the website. The About page content is managed through an admin interface and requires endpoints for retrieving, updating, and uploading images for various sections including hero, story, values, timeline, and team members.

## API Endpoints

### 1. Get About Page Data
- **Endpoint:** `GET /api/about`
- **Authentication:** Required (Bearer Token)
- **Description:** Retrieves the current about page data including all sections
- **Response Format:**
```json
{
    "data": {
        "hero": {
            "title": "string",
            "subtitle": "string",
            "image": "string (URL)"
        },
        "story": {
            "items": [
                {
                    "title": "string",
                    "year": "string",
                    "content": "string"
                }
            ]
        },
        "values": [
            {
                "title": "string",
                "description": "string",
                "icon": "string"
            }
        ],
        "timeline": [
            {
                "year": "string",
                "title": "string",
                "description": "string"
            }
        ],
        "team": [
            {
                "name": "string",
                "role": "string",
                "bio": "string",
                "image": "string (URL)"
            }
        ]
    },
    "message": "string (optional)",
    "status": "number"
}
```

### 2. Update About Page Data
- **Endpoint:** `PUT /api/about`
- **Authentication:** Required (Bearer Token)
- **Description:** Updates the about page data for all sections
- **Request Body:** Same structure as GET response data
- **Response Format:** Same as GET response

### 3. Upload Image
- **Endpoint:** `POST /api/about/upload-image`
- **Authentication:** Required (Bearer Token)
- **Description:** Uploads an image file for either hero section or team member profiles
- **Request Format:** Multipart form data
```
Content-Type: multipart/form-data
{
    "image": File (Required, Image file),
    "section": "string" (Required, Either 'hero' or 'team')
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
- **Maximum File Size:** 5MB
- **Image Requirements:**
  - Hero Image:
    - Minimum dimensions: 1200x800 pixels
    - Maximum dimensions: 3840x2160 pixels
    - Aspect ratio: 16:9 preferred
  - Team Member Images:
    - Minimum dimensions: 400x400 pixels
    - Maximum dimensions: 1200x1200 pixels
    - Aspect ratio: 1:1 (square)

## Database Schema

### About Hero Table
```sql
CREATE TABLE about_hero (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### About Story Items Table
```sql
CREATE TABLE about_story_items (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    year VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    sort_order INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### About Values Table
```sql
CREATE TABLE about_values (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL,
    sort_order INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### About Timeline Table
```sql
CREATE TABLE about_timeline (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    year VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sort_order INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### About Team Members Table
```sql
CREATE TABLE about_team_members (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    sort_order INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Data Validation Rules

### Hero Section
- **title**: Required, max 255 characters
- **subtitle**: Required, max 1000 characters
- **image**: Required, valid URL, max 255 characters

### Story Items
- **title**: Required, max 255 characters
- **year**: Required, max 50 characters
- **content**: Required, max 2000 characters

### Values
- **title**: Required, max 255 characters
- **description**: Required, max 1000 characters
- **icon**: Required, max 100 characters

### Timeline
- **year**: Required, max 50 characters
- **title**: Required, max 255 characters
- **description**: Required, max 1000 characters

### Team Members
- **name**: Required, max 255 characters
- **role**: Required, max 255 characters
- **bio**: Required, max 1000 characters
- **image**: Required, valid URL, max 255 characters

### Image Upload Rules
- **File Size:** Maximum 5MB
- **File Types:** .jpg, .jpeg, .png, .webp
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
    Route::get('/about', [AboutController::class, 'show']);
    Route::put('/about', [AboutController::class, 'update']);
    Route::post('/about/upload-image', [AboutController::class, 'uploadImage']);
});
```

## Example Response Codes
- 200: Successful GET/PUT request
- 201: Successful file upload
- 400: Bad request (invalid data)
- 401: Unauthorized
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
7. Implement image compression

## Notes for Backend Implementation
1. Implement soft deletes for all tables
2. Consider caching the about page data
3. Set up proper file upload handling with validation
4. Consider implementing versioning for content changes
5. Add audit logging for tracking changes
6. Implement backup strategy for images
7. Consider implementing a preview system before publishing changes
8. Set up proper file cleanup for unused images
9. Implement proper error handling and logging
10. Consider implementing bulk operations for efficiency 