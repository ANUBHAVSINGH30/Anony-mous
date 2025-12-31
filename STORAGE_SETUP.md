# Supabase Storage Setup for Image Uploads

Follow these steps to enable image uploads in your app.

## Step 1: Create Storage Bucket

1. In Supabase dashboard, click **Storage** in the left sidebar
2. Click **"New bucket"** button
3. Fill in:
   - **Name**: `post-images`
   - **Public bucket**: ✅ YES (check this box)
   - **File size limit**: 5MB (optional)
   - **Allowed MIME types**: Leave empty or add: `image/jpeg, image/png, image/gif, image/webp`
4. Click **"Create bucket"**

## Step 2: Set Bucket Policies

1. Click on the `post-images` bucket you just created
2. Click the **"Policies"** tab at the top
3. You'll see "No policies yet"

### Create INSERT Policy (Allow uploads)

1. Click **"New policy"**
2. Select **"For full customization"** → **"Create a policy from scratch"**
3. Fill in:
   - **Policy name**: `Allow public uploads`
   - **Allowed operation**: Check ✅ **INSERT**
   - **Target roles**: `public` (should be default)
   - **USING expression**: `true`
   - **WITH CHECK expression**: `true`
4. Click **"Review"** then **"Save policy"**

### Create SELECT Policy (Allow reading/viewing)

1. Click **"New policy"** again
2. Select **"For full customization"** → **"Create a policy from scratch"**
3. Fill in:
   - **Policy name**: `Allow public read access`
   - **Allowed operation**: Check ✅ **SELECT**
   - **Target roles**: `public`
   - **USING expression**: `true`
4. Click **"Review"** then **"Save policy"**

### Create DELETE Policy (Allow deleting - optional)

1. Click **"New policy"** again
2. Select **"For full customization"** → **"Create a policy from scratch"**
3. Fill in:
   - **Policy name**: `Allow public delete`
   - **Allowed operation**: Check ✅ **DELETE**
   - **Target roles**: `public`
   - **USING expression**: `true`
4. Click **"Review"** then **"Save policy"**

## Step 3: Verify Setup

1. Go back to **Storage** → **post-images**
2. Under **Policies** tab, you should see 3 policies:
   - ✅ Allow public uploads (INSERT)
   - ✅ Allow public read access (SELECT)
   - ✅ Allow public delete (DELETE)

## Step 4: Test Image Upload

1. Make sure your frontend dev server is running (`npm run dev`)
2. Go to **Create** page in your app
3. Click **Media** tab
4. Select an image
5. Add a title
6. Click **Post**
7. You should see "Uploading image..." then "Posting..."
8. Check your feed - the image should appear
9. In Supabase dashboard, go to **Storage** → **post-images** → you should see the uploaded image in the `posts/` folder

## Troubleshooting

### Error: "new row violates row-level security policy"
- Make sure you created the INSERT and SELECT policies
- Make sure the bucket is set to **Public**

### Error: "Failed to upload image"
- Check browser console for specific error
- Verify bucket name is exactly `post-images` (with hyphen, not underscore)
- Verify policies are enabled

### Images not displaying
- Make sure SELECT policy exists
- Check if image URL is saved in database (Table Editor → posts → media_url column)
- Try opening the image URL directly in browser

### File size issues
- Default limit is 5MB per file
- Check file size before upload
- Can adjust in bucket settings

## SQL Alternative (Quick Setup)

If you prefer, you can also set up policies via SQL Editor:

```sql
-- Create storage bucket (if not created via UI)
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true);

-- Allow public uploads
create policy "Allow public uploads"
on storage.objects for insert
to public
with check (bucket_id = 'post-images');

-- Allow public read access
create policy "Allow public read access"
on storage.objects for select
to public
using (bucket_id = 'post-images');

-- Allow public delete
create policy "Allow public delete"
on storage.objects for delete
to public
using (bucket_id = 'post-images');
```

## What Happens Now

- Images are uploaded to Supabase Storage (not base64 in database)
- You get a public URL like: `https://xxx.supabase.co/storage/v1/object/public/post-images/posts/123456.jpg`
- This URL is saved in the `media_url` column
- Much more efficient than base64!
- Images load faster
- Database stays clean

---

**Once this is done, image uploads will work!** 🎉
