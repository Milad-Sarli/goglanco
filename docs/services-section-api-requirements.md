# Services Section API Requirements

## Overview
This document outlines the API requirements for the Services section of the website. The Services section allows administrators to manage service offerings through a comprehensive admin interface.

## API Endpoints

### 1. Get All Services
- **Endpoint:** `GET /api/services`
- **Authentication:** Required (Bearer Token)
- **Description:** Retrieves all services with their order preserved
- **Response Format:**
```json
{
    "data": [
        {
            "id": "number",
            "title": "string",
            "description": "string",
            "icon": "string",
            "image": "string (URL)",
            "sort_order": "number",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
    ],
    "message": "string (optional)",
    "status": "number"
}
```

### 2. Get Single Service
- **Endpoint:** `GET /api/services/{id}`
- **Authentication:** Required (Bearer Token)
- **Description:** Retrieves a specific service by ID
- **Response Format:** Same as single service object from GET all

### 3. Create Service
- **Endpoint:** `POST /api/services`
- **Authentication:** Required (Bearer Token)
- **Description:** Creates a new service
- **Request Body:**
```json
{
    "title": "string",
    "description": "string",
    "icon": "string",
    "image": "string (URL)"
}
```
- **Response Format:** Same as single service object

### 4. Update Service
- **Endpoint:** `PUT /api/services/{id}`
- **Authentication:** Required (Bearer Token)
- **Description:** Updates an existing service
- **Request Body:** Same as create service
- **Response Format:** Same as single service object

### 5. Delete Service
- **Endpoint:** `DELETE /api/services/{id}`
- **Authentication:** Required (Bearer Token)
- **Description:** Deletes a service
- **Response Format:**
```json
{
    "message": "string",
    "status": "number"
}
```

### 6. Upload Service Image
- **Endpoint:** `POST /api/services/upload-image`
- **Authentication:** Required (Bearer Token)
- **Description:** Uploads an image for a service
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

### 7. Reorder Services
- **Endpoint:** `PUT /api/services/reorder`
- **Authentication:** Required (Bearer Token)
- **Description:** Updates the order of services
- **Request Body:**
```json
{
    "serviceIds": ["number"]
}
```
- **Response Format:**
```json
{
    "message": "string",
    "status": "number"
}
```

## Database Schema

### Services Table
```sql
CREATE TABLE services (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(10) NOT NULL,
    image VARCHAR(255) NOT NULL,
    sort_order INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

## Data Validation Rules

### Service Data
- **title**: Required, max 255 characters
- **description**: Required, max 1000 characters
- **icon**: Required, max 10 characters (emoji)
- **image**: Required, valid URL, max 255 characters
- **sort_order**: Non-negative integer

### Image Upload Rules
- **File Size:** Maximum 5MB
- **File Types:** .jpg, .jpeg, .png, .webp
- **Image Dimensions:**
  - Minimum: 800x600 pixels
  - Maximum: 3840x2160 pixels
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
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{id}', [ServiceController::class, 'show']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
    Route::post('/services/upload-image', [ServiceController::class, 'uploadImage']);
    Route::put('/services/reorder', [ServiceController::class, 'reorder']);
});
```

## Example Response Codes
- 200: Successful GET/PUT request
- 201: Successful creation/upload
- 204: Successful deletion
- 400: Bad request (invalid data)
- 401: Unauthorized
- 403: Forbidden
- 404: Service not found
- 413: File too large
- 415: Unsupported file type
- 422: Validation error
- 500: Server error

## Implementation Notes
1. Implement soft deletes for services
2. Cache service data with proper invalidation
3. Optimize images for web delivery
4. Implement proper error handling
5. Add audit logging for all changes
6. Set up backup strategy for images
7. Implement request validation using Laravel Form Requests
8. Use Laravel Resource classes for consistent API responses
9. Implement proper file cleanup for unused images
10. Consider implementing versioning for service content 