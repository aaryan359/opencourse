# Supabase Storage Setup Guide

This guide will help you set up the Supabase Storage bucket for video uploads.

## Prerequisites
- Supabase account and project
- Project credentials in `.env` file

## Setup Steps

### 1. Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New Bucket**
4. Create a bucket with the name: `videos`
5. Set the bucket to **Public** (so videos can be accessed via URL)

### 2. Set Bucket Policies

After creating the bucket, you need to set up policies:

1. Click on the `videos` bucket
2. Go to **Policies** tab
3. Add the following policies:

#### Policy 1: Allow Public Read Access
- Policy Name: `Public Access`
- Target Roles: `public`
- Policy Definition:
```sql
bucket_id = 'videos'
```
- Allowed Operations: `SELECT`

#### Policy 2: Allow Authenticated Upload
- Policy Name: `Authenticated Upload`
- Target Roles: `authenticated`
- Policy Definition:
```sql
bucket_id = 'videos'
```
- Allowed Operations: `INSERT`

#### Policy 3: Allow User Delete Own Videos
- Policy Name: `Delete Own Videos`
- Target Roles: `authenticated`
- Policy Definition:
```sql
bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1]
```
- Allowed Operations: `DELETE`

### 3. Folder Structure

The application automatically organizes videos in folders:
- `course-videos/` - for technical course videos (Admin.jsx)
- `nontech-videos/` - for non-technical course videos

### 4. File Constraints

The application enforces the following constraints:
- Maximum file size: 500MB
- Allowed formats: MP4, WebM, OGG, MOV, AVI
- Files are automatically renamed with timestamp and random string

### 5. Testing

To test if the setup is working:
1. Go to the Admin panel
2. Try uploading a video file (instead of YouTube URL)
3. Check if the video appears in your Supabase Storage bucket
4. Verify the video plays correctly after upload

## Troubleshooting

### Upload Fails
- Check if the bucket name is exactly `videos`
- Verify the bucket is set to Public
- Ensure policies are correctly configured
- Check file size is under 500MB

### Videos Don't Play
- Verify the bucket is set to Public
- Check the video URL is accessible
- Ensure the video format is supported by browsers

### Permission Errors
- Make sure you're authenticated (logged in)
- Verify the policies are correctly set up
- Check the `.env` file has correct Supabase credentials

## Security Notes

- Videos are stored with random filenames to prevent conflicts
- Only authenticated users can upload videos
- The storage bucket is public to allow video playback
- Consider implementing additional security measures for production use
