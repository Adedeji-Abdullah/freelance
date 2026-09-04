# Profile Picture Upload Implementation Guide

## Overview
This guide explains the profile picture upload functionality that has been implemented in your authentication app.

## What's Been Implemented

### 1. **Backend Updates** (`index.js`)

#### Multer Configuration
- Configured `multer` for file storage with the following settings:
  - **Storage location**: `public/uploads/profilePictures/`
  - **File naming**: Unique timestamp-based filenames to prevent overwrites
  - **File validation**: Only image files (jpeg, png, gif, webp) are accepted
  - **File size limit**: 5MB maximum
  - **Auto directory creation**: Directory is created automatically if it doesn't exist

#### API Endpoints

**POST /api/profile** - Create new profile with picture upload
```javascript
- Accepts FormData with file and profile information
- Stores image file in public/uploads/profilePictures/
- Saves profile data and image URL to MongoDB
- Returns: { success: true, message, data: profileObject }
```

**PUT /api/profile/:id** - Update existing profile
```javascript
- Update profile information and/or profile picture
- Returns: { success: true, message, data: updatedProfileObject }
```

**GET /api/profile/:id** - Retrieve profile by ID
```javascript
- Fetches complete profile data including picture URL
- Returns: { success: true, data: profileObject }
```

**Static File Serving**
- Images are served from `/uploads/` endpoint
- Access pictures at: `http://localhost:5000/uploads/profilePictures/[filename]`

### 2. **Database Schema Updates** (`model/profile.js`)

Updated MongoDB schema with the following fields:
```javascript
{
  firstname: String,
  lastname: String,
  email: String,
  category: String,
  group: String,
  bio: String,
  profilePicture: String,        // Filename stored on server
  profilePictureUrl: String,     // Full URL to access the image
  createdAt: Date,               // Auto-set on creation
  updatedAt: Date                // Auto-set on updates
}
```

### 3. **Frontend Updates** (`app/dashboard/profile/page.tsx`)

#### Features Implemented
- ✅ File input with image-only filter
- ✅ Real-time image preview before upload
- ✅ File validation:
  - Checks file type (must be image)
  - Validates file size (max 5MB)
  - Shows user-friendly error messages
- ✅ Proper FormData handling for file upload
- ✅ Loading states during upload
- ✅ Success/error notifications
- ✅ Auto-redirect to dashboard on success
- ✅ Form validation for all required fields

#### State Management
```typescript
- profilePicture: File | null       // Stores the actual file
- previewUrl: string                // Shows preview before upload
- loading: boolean                  // Upload status
- error: string                     // Error messages
- success: boolean                  // Success indicator
- firstname, lastname, email, bio, category, group: Form fields
```

#### Upload Process
1. User selects image file
2. File is validated (type, size)
3. Preview is generated using FileReader API
4. Form is submitted with FormData
5. Backend processes and stores image
6. Profile data is saved to database
7. Success message shown and redirect to dashboard

## Setup Instructions

### 1. Create Upload Directory
Make sure the `public/uploads/profilePictures/` directory exists:
```bash
mkdir -p public/uploads/profilePictures
```

### 2. Environment Variables
Ensure your `.env` file has:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN=your_jwt_secret
```

### 3. Install Dependencies
All necessary dependencies are already in `package.json`:
- `multer` - File upload middleware
- `express` - Backend framework
- `mongoose` - Database ORM

### 4. Run the Application

Terminal 1 - Start Backend:
```bash
npm run index
```

Terminal 2 - Start Frontend:
```bash
npm run dev
```

## API Usage Examples

### Create Profile with Picture (Frontend)
```javascript
const formData = new FormData();
formData.append("firstname", "John");
formData.append("lastname", "Doe");
formData.append("email", "john@example.com");
formData.append("category", "freelancer");
formData.append("group", "Frontend developer");
formData.append("bio", "Experienced frontend developer...");
formData.append("profilePicture", fileObject);

const response = await fetch("http://localhost:5000/api/profile", {
  method: "POST",
  body: formData  // Note: Don't set Content-Type header with FormData
});
```

### Retrieve Profile
```javascript
const response = await fetch("http://localhost:5000/api/profile/[profileId]");
const data = await response.json();
// Access image: data.data.profilePictureUrl
```

### Update Profile
```javascript
const formData = new FormData();
formData.append("firstname", "John");
formData.append("lastname", "Doe");
formData.append("bio", "Updated bio...");
formData.append("profilePicture", newFileObject); // Optional

const response = await fetch(`http://localhost:5000/api/profile/[profileId]`, {
  method: "PUT",
  body: formData
});
```

## Database Sample Document
```json
{
  "_id": "ObjectId",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "category": "freelancer",
  "group": "Frontend developer",
  "bio": "Experienced frontend developer with 5 years...",
  "profilePicture": "1726856342123-234892374.png",
  "profilePictureUrl": "/uploads/profilePictures/1726856342123-234892374.png",
  "createdAt": "2024-09-20T10:30:00Z",
  "updatedAt": "2024-09-20T10:30:00Z"
}
```

## Supported Image Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

**Maximum File Size**: 5MB

## Error Handling

### Frontend Validation
- ✓ Checks if file is selected
- ✓ Validates file type before upload
- ✓ Checks file size
- ✓ Validates all form fields

### Backend Validation
- ✓ File extension validation via MIME type
- ✓ File size check
- ✓ Database validation
- ✓ Proper error responses with messages

## Common Issues & Solutions

### Issue: Uploads fail with 400 error
**Solution**: Make sure:
1. Backend is running (`npm run index`)
2. CORS is enabled
3. `public/uploads/profilePictures/` directory exists

### Issue: Images not displaying
**Solution**:
1. Check if `profilePictureUrl` is in database
2. Verify static file serving is enabled: `app.use('/uploads', express.static(...))`
3. Access images via: `http://localhost:5000/uploads/profilePictures/[filename]`

### Issue: File too large error
**Solution**: Ensure image is less than 5MB. Compress image if needed.

## Next Steps

1. **Add Profile Picture Display**: Show uploaded image in profile view
   ```typescript
   {profileData.profilePictureUrl && (
     <img src={`http://localhost:5000${profileData.profilePictureUrl}`} />
   )}
   ```

2. **Add Image Cropping**: Implement image cropping before upload for better UX

3. **Add Image Optimization**: Compress images server-side using `sharp` package

4. **Add Profile Editing**: Implement edit endpoint to allow users to update profiles

5. **Add Delete Functionality**: Allow users to delete their profiles and associated images

## Security Considerations

1. **File Validation**: Only images are accepted
2. **File Size Limit**: Max 5MB to prevent storage abuse
3. **Unique Filenames**: Prevents overwriting existing files
4. **Server-Side Validation**: Files are validated on backend
5. **Future Improvements**:
   - Add authentication token validation to `/api/profile` endpoints
   - Implement virus scanning for uploaded files
   - Add rate limiting to prevent upload abuse
   - Validate file content, not just extension

## Troubleshooting

### Database Connection Issues
```bash
# Make sure MongoDB is running and MONGO_URI is correct
# Test connection: npm run index
```

### Port Already in Use
```bash
# If port 5000 is in use, change in .env:
PORT=5001
```

### Missing Dependencies
```bash
# Reinstall all dependencies
npm install
```

## Testing the Implementation

1. **Open browser**: `http://localhost:3000/dashboard/profile`
2. **Fill in form**: Enter all required fields
3. **Select image**: Click file input and choose an image
4. **View preview**: Image preview appears
5. **Submit**: Click "Create Profile"
6. **Verify**: Check success message and redirect to dashboard
7. **Check database**: Verify profile document in MongoDB
8. **Access image**: `http://localhost:5000/uploads/profilePictures/[filename]`

## File Structure
```
authentication/
├── index.js                              # Backend server with upload endpoints
├── package.json                          # Dependencies
├── model/
│   └── profile.js                        # Updated schema with image fields
├── app/
│   └── dashboard/
│       └── profile/
│           └── page.tsx                  # Updated frontend form
└── public/
    └── uploads/
        └── profilePictures/              # Auto-created upload directory
            └── [uploaded images]
```

---

**Last Updated**: September 2024
**Version**: 1.0
