# Hero Section API Requirements

## Overview
This document outlines the API requirements for the Hero section of the website. The Hero section is managed through an admin interface and requires endpoints for retrieving, updating, and uploading images for the hero content.

## API Endpoints

### 1. Get Hero Data
- **Endpoint:** `GET /api/hero`
- **Authentication:** Required (Bearer Token)
- **Description:** Retrieves the current hero section data
- **Response Format:**
```json
{
    "data": {
        "title": "string",
        "subtitle": "string",
        "mainImage": "string (URL)",
        "backgroundImages": ["string (URL)"],
        "stats": {
            "rugsRestored": "number",
            "yearsExperience": "number",
            "satisfactionRate": "number"
        }
    },
    "message": "string (optional)",
    "status": "number"
}
```

### 2. Update Hero Data
- **Endpoint:** `PUT /api/hero`
- **Authentication:** Required (Bearer Token)
- **Description:** Updates the hero section data
- **Request Body:**
```json
{
    "title": "string",
    "subtitle": "string",
    "mainImage": "string (URL)",
    "backgroundImages": ["string (URL)"],
    "stats": {
        "rugsRestored": "number",
        "yearsExperience": "number",
        "satisfactionRate": "number"
    }
}
```
- **Response Format:** Same as GET response

### 3. Upload Image
- **Endpoint:** `POST /api/hero/upload-image`
- **Authentication:** Required (Bearer Token)
- **Description:** Uploads an image file for the hero section
- **Request Format:** Multipart form data
```
Content-Type: multipart/form-data
{
    "image": File (Required, Image file)
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
  - Minimum dimensions: 1200x800 pixels
  - Maximum dimensions: 3840x2160 pixels
  - Aspect ratio: 16:9 preferred

## Database Schema

### Hero Table
```sql
CREATE TABLE heroes (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT NOT NULL,
    main_image VARCHAR(255) NOT NULL,
    rugs_restored INT UNSIGNED NOT NULL DEFAULT 0,
    years_experience INT UNSIGNED NOT NULL DEFAULT 0,
    satisfaction_rate INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Hero Background Images Table
```sql
CREATE TABLE hero_background_images (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    hero_id BIGINT UNSIGNED NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    file_size INT UNSIGNED,
    mime_type VARCHAR(50),
    dimensions VARCHAR(50),
    sort_order INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hero_id) REFERENCES heroes(id) ON DELETE CASCADE
);
```

## Data Validation Rules

### Hero Data
- **title**: Required, max 255 characters
- **subtitle**: Required, max 1000 characters
- **mainImage**: Required, valid URL, max 255 characters
- **backgroundImages**: Array of valid URLs, each max 255 characters
- **stats**:
  - **rugsRestored**: Required, non-negative integer
  - **yearsExperience**: Required, non-negative integer
  - **satisfactionRate**: Required, integer between 0 and 100

### Image Upload Rules
- **File Size:** Maximum 5MB
- **File Types:** .jpg, .jpeg, .png, .webp
- **Image Dimensions:**
  - Width: 1200px - 3840px
  - Height: 800px - 2160px
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
    Route::get('/hero', [HeroController::class, 'show']);
    Route::put('/hero', [HeroController::class, 'update']);
    Route::post('/hero/upload-image', [HeroController::class, 'uploadImage']);
});
```

## Example Response Codes
- 200: Successful GET/PUT request
- 201: Successful file upload
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

## Notes for Backend Implementation
1. Implement soft deletes for both tables if needed
2. Consider caching the hero data as it's frequently accessed
3. Set up proper file upload handling with validation
4. Consider implementing versioning for hero content
5. Add audit logging for tracking changes
6. Implement backup strategy for images
7. Consider implementing a preview system before publishing changes
8. Implement image optimization pipeline
9. Set up proper file cleanup for unused images
10. Implement file type validation using mime type detection