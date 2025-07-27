# Portfolio Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for transforming the mock data portfolio into a fully functional backend-integrated application.

## Current Mock Data Structure

### 1. Hero Section Data
```javascript
hero: {
  name, title, subtitle, location, phone, email
}
```

### 2. About Section Data
```javascript
about: {
  summary, personalStory, philosophy, strengths[]
}
```

### 3. Skills Data
```javascript
skills: {
  categories: [{ title, skills[] }]
}
```

### 4. Experience Data
```javascript
experience: [{ 
  title, company, location, duration, responsibilities[] 
}]
```

### 5. Projects Data
```javascript
projects: [{ 
  title, description, technologies[], achievements[] 
}]
```

### 6. Education Data
```javascript
education: { certifications[] }
```

### 7. Interests Data
```javascript
interests: {
  title, description, items: [{ title, description, icon }]
}
```

### 8. Hobbies Data
```javascript
hobbies: {
  title, description, items: [{ title, description, icon, highlight }]
}
```

### 9. Contact Data
```javascript
contact: { email, phone, location, linkedin, github }
```

## Backend API Endpoints to Implement

### 1. Portfolio Data Management
- `GET /api/portfolio` - Get complete portfolio data
- `PUT /api/portfolio` - Update portfolio data (admin only)

### 2. Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact submissions (admin only)

### 3. Resume Download
- `GET /api/resume/download` - Download resume file
- `POST /api/resume/upload` - Upload resume file (admin only)

### 4. Analytics (Optional)
- `POST /api/analytics/visit` - Track page visits
- `GET /api/analytics/stats` - Get visit statistics

## MongoDB Collections

### 1. Portfolio Collection
```javascript
{
  _id: ObjectId,
  hero: { name, title, subtitle, location, phone, email },
  about: { summary, personalStory, philosophy, strengths[] },
  skills: { categories: [{ title, skills[] }] },
  experience: [{ title, company, location, duration, responsibilities[] }],
  projects: [{ title, description, technologies[], achievements[] }],
  education: { certifications[] },
  interests: { title, description, items: [{ title, description, icon }] },
  hobbies: { title, description, items: [{ title, description, icon, highlight }] },
  contact: { email, phone, location, linkedin, github },
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Contact Messages Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String, 
  subject: String,
  message: String,
  status: String, // 'new', 'read', 'replied'
  createdAt: Date
}
```

### 3. Resume Files Collection
```javascript
{
  _id: ObjectId,
  filename: String,
  originalName: String,
  mimeType: String,
  size: Number,
  filePath: String,
  isActive: Boolean,
  uploadedAt: Date
}
```

## Frontend Integration Changes

### 1. Remove Mock Data Usage
- Replace `mockData` imports with API calls
- Add loading states for data fetching
- Add error handling for failed API calls

### 2. Contact Form Integration
- Replace mock form submission with actual API call
- Add proper success/error feedback
- Add form validation

### 3. Resume Download Integration
- Replace mock download with actual file download
- Add proper error handling for file not found

### 4. Add Loading States
- Hero section: Loading skeleton
- Other sections: Loading indicators
- Contact form: Submission loading state

## Implementation Plan

### Phase 1: Basic Backend Setup
1. Create MongoDB models
2. Implement GET /api/portfolio endpoint
3. Seed database with current mock data
4. Test portfolio data retrieval

### Phase 2: Contact Form Backend
1. Implement POST /api/contact endpoint
2. Add email validation and sanitization
3. Test contact form submission

### Phase 3: Resume Management
1. Implement file upload/download endpoints
2. Add file validation and storage
3. Test resume download functionality

### Phase 4: Frontend Integration
1. Replace mock data with API calls
2. Add loading states and error handling
3. Update contact form to use backend
4. Update resume download functionality

### Phase 5: Testing & Optimization
1. Test all endpoints thoroughly
2. Add proper error handling
3. Optimize performance
4. Add basic security measures

## Error Handling Strategy

### Backend Errors
- 400: Bad Request (invalid data)
- 404: Not Found (missing resources)
- 500: Internal Server Error (database issues)

### Frontend Error Handling  
- Network errors: Show retry mechanism
- Data loading errors: Show fallback content
- Form submission errors: Show error messages
- File download errors: Show appropriate feedback

## Security Considerations

### Input Validation
- Sanitize all contact form inputs
- Validate file uploads (type, size limits)
- Rate limiting for contact form submissions

### Data Protection
- No sensitive data in portfolio collection
- Secure file storage for resume
- Basic spam prevention for contact form

This contract ensures seamless migration from mock data to full backend functionality while maintaining all current features and adding new capabilities.