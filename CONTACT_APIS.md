# Contact Section API Documentation

This document outlines the API endpoints related to the contact functionalities: sending messages, requesting consultations, and fetching contact information.

## Base URL

All API endpoints are prefixed with your Laravel application's base URL (e.g., `http://your-laravel-app.test/api`).

## 1. Send a Message (Contact Form)

Allows users to send a message through the contact form.

- **Endpoint:** `/contact-messages`
- **Method:** `POST`
- **Description:** Submits a new contact message to the system.
- **Request Body:** `JSON`
  ```json
  {
    "fullname": "John Doe",
    "email": "john.doe@example.com",
    "message": "Hello, I would like to inquire about your rug repair services."
  }
  ```
- **Fields:**
  - `fullname`: `string`, required, max 255 characters.
  - `email`: `string` (email format), required, max 255 characters.
  - `message`: `string`, required.

- **Success Response (201 Created):**
  ```json
  {
    "message": "Message sent successfully!",
    "data": {
      "fullname": "John Doe",
      "email": "john.doe@example.com",
      "message": "Hello, I would like to inquire about your rug repair services.",
      "updated_at": "2024-05-12T03:30:00.000000Z",
      "created_at": "2024-05-12T03:30:00.000000Z",
      "id": 1
    }
  }
  ```

- **Error Response (422 Unprocessable Entity - Validation Error):**
  ```json
  {
    "email": [
      "The email field must be a valid email address."
    ],
    "message": [
      "The message field is required."
    ]
    // ... other validation errors
  }
  ```

- **Example Usage (Next.js with `fetch`):**
  ```javascript
  async function sendMessage(formData) {
    try {
      const response = await fetch('/api/laravel-proxy', { // Assuming a proxy to your Laravel API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: '/contact-messages', // Actual Laravel endpoint
          method: 'POST',
          data: formData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors (result will contain them)
        console.error('Validation errors:', result);
        // Display errors to the user
        return { success: false, errors: result };
      }

      // Handle success
      console.log('Message sent:', result.data);
      return { success: true, data: result.data };
    } catch (error) {
      console.error('Error sending message:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }

  // const formData = { fullname: 'Jane Roe', email: 'jane@example.com', message: 'Test message' };
  // sendMessage(formData).then(res => console.log(res));
  ```

## 2. Schedule a Weekend Consultation

Allows users to request a weekend consultation.

- **Endpoint:** `/consultation-requests`
- **Method:** `POST`
- **Description:** Submits a new weekend consultation request.
- **Request Body:** `JSON`
  ```json
  {
    "fullname": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "(555) 987-6543", // Optional
    "preferred_date": "2024-07-20", // Optional, YYYY-MM-DD format, must be today or later
    "message": "I would like to schedule a consultation for carpet inspection this weekend."
  }
  ```
- **Fields:**
  - `fullname`: `string`, required, max 255 characters.
  - `email`: `string` (email format), required, max 255 characters.
  - `phone`: `string`, optional, max 20 characters.
  - `preferred_date`: `date` (YYYY-MM-DD), optional. If provided, must be today or a future date.
  - `message`: `string`, required.

- **Success Response (201 Created):**
  ```json
  {
    "message": "Consultation request submitted successfully!",
    "data": {
      "fullname": "Jane Doe",
      "email": "jane.doe@example.com",
      "phone": "(555) 987-6543",
      "preferred_date": "2024-07-20",
      "message": "I would like to schedule a consultation for carpet inspection this weekend.",
      "status": "pending",
      "updated_at": "2024-05-12T03:35:00.000000Z",
      "created_at": "2024-05-12T03:35:00.000000Z",
      "id": 1
    }
  }
  ```

- **Error Response (422 Unprocessable Entity - Validation Error):**
  Similar to the contact message, with relevant field errors.

- **Example Usage (Next.js with `fetch`):**
  ```javascript
  async function scheduleConsultation(formData) {
    try {
      const response = await fetch('/api/laravel-proxy', { // Assuming a proxy
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: '/consultation-requests', // Actual Laravel endpoint
          method: 'POST',
          data: formData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Validation errors:', result);
        return { success: false, errors: result };
      }

      console.log('Consultation scheduled:', result.data);
      return { success: true, data: result.data };
    } catch (error) {
      console.error('Error scheduling consultation:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }

  // const consultationData = { fullname: 'Sam Smith', email: 'sam@example.com', message: 'Need rug quote' };
  // scheduleConsultation(consultationData).then(res => console.log(res));
  ```

## 3. Get Contact Information

Fetches the general contact information for display on the website.

- **Endpoint:** `/contact-information`
- **Method:** `GET`
- **Description:** Retrieves the stored contact details (address, phone, email, business hours).

- **Success Response (200 OK):**
  ```json
  {
    "id": 1,
    "address": "123 Rug Street, Carpet City, ST 12345",
    "phone": "(555) 123-4567",
    "email": "info@goglanco.com",
    "business_hours_monday_saturday": "Monday - Saturday: 10:00 AM - 4:00 PM",
    "business_hours_sunday": "Sunday: Closed",
    "created_at": "2024-05-12T03:00:00.000000Z",
    "updated_at": "2024-05-12T03:40:00.000000Z"
  }
  ```
  *(Note: If no contact information has been set up in the admin panel yet, the default values from the model's `firstOrCreate` method will be returned the first time this endpoint is hit after table creation.)*

- **Error Response (500 Internal Server Error):**
  (If the database table doesn't exist or another DB issue occurs)
  ```json
  {
    "message": "Could not retrieve contact information. Ensure migrations are run.",
    "error": "SQLSTATE[42S02]: Base table or view not found..."
  }
  ```

- **Example Usage (Next.js with `fetch`, possibly in `getStaticProps` or `getServerSideProps` or a client-side fetch):**
  ```javascript
  async function getContactInfo() {
    try {
      const response = await fetch('/api/laravel-proxy', { // Assuming a proxy
         method: 'POST', // Or GET if your proxy supports it directly for GET requests
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           endpoint: '/contact-information', // Actual Laravel endpoint
           method: 'GET',
         }),
      });
      
      if (!response.ok) {
        const errorResult = await response.json();
        console.error('Error fetching contact info:', errorResult.message);
        // Potentially throw an error or return null/default data
        return null;
      }
      
      const data = await response.json();
      console.log('Contact Information:', data);
      return data;
    } catch (error) {
      console.error('Network error fetching contact info:', error);
      return null;
    }
  }

  // getContactInfo().then(info => {
  //   if (info) {
  //     // Use the contact info in your component
  //   }
  // });
  ```

**Note on Next.js Proxy:**
The JavaScript examples above assume you might be using a Next.js API route (e.g., `pages/api/laravel-proxy.js`) to forward requests to your Laravel backend. This is a common pattern to avoid CORS issues and keep your Laravel API URL private from the client-side code. The proxy would take the `endpoint`, `method`, and `data` from the request body and make the actual call to the Laravel API.

If you are calling the Laravel API directly from the client-side, ensure CORS is configured correctly on your Laravel application. 
