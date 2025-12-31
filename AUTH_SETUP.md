# Supabase Authentication Setup

## ✅ Authentication is Already Configured!

The code is ready, but you need to enable authentication in Supabase.

## Step 1: Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** in the left sidebar
2. Click on **Providers**
3. Find **Email** provider
4. Make sure it's **enabled** (toggle should be ON/green)
5. Scroll down and click **Save** if you made changes

## Step 2: Configure Email Settings (Optional but Recommended)

1. Still in **Authentication** → **Providers**
2. Scroll down to **Email** section
3. You can configure:
   - **Confirm email**: Turn OFF for testing (users can sign up without email verification)
   - **Secure email change**: Keep default
   - **Secure password change**: Keep default

4. Click **Save**

## Step 3: Test Authentication

1. Make sure your frontend is running (`npm run dev`)
2. Go to **http://localhost:5173/signup**
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: test123 (min 6 characters)
4. Click **Sign Up**
5. You should be redirected to the feed

### Check if it worked:

1. In Supabase dashboard, go to **Authentication** → **Users**
2. You should see your test user listed
3. In your app navbar, you should see **"Sign Out"** button (instead of "Sign In")

## Step 4: Test Sign In

1. Click **Sign Out** in your app
2. Go to **Sign In** page
3. Enter the same email/password
4. Click **Sign In**
5. You should be redirected to feed again

## How It Works

**Before (Anonymous Only):**
- Everyone posts as `anon_xxxxx`
- No accounts

**Now (With Auth):**
- Users can create accounts
- Sign in/out
- Posts still show as anonymous usernames (for privacy)
- But users have persistent accounts

**Note:** Even with authentication, posts remain anonymous! Users have accounts to access the app, but their posts don't reveal their identity. Best of both worlds!

## Troubleshooting

### Error: "User already registered"
- That email is already taken
- Try a different email or sign in instead

### Error: "Invalid login credentials"
- Wrong email or password
- Make sure you're using the correct credentials

### Error: "Email not confirmed"
- If you enabled "Confirm email", you need to verify the email first
- For testing, turn OFF "Confirm email" in **Authentication → Providers → Email**

### Not redirecting after sign up
- Check browser console for errors
- Make sure `.env.local` has correct Supabase keys

### Sign Out not working
- Check browser console
- Clear browser cache and localStorage

## What You Get

✅ User accounts with email/password
✅ Sign Up page functional
✅ Sign In page functional
✅ Sign Out button in navbar
✅ Protected routes (only logged-in users can post)
✅ Anonymous posting (posts don't show real identity)
✅ Persistent user sessions

## Optional: Add Profile Pictures

Later you can extend this to:
- Add user profiles
- Upload profile pictures
- Show user stats
- But keep posts anonymous!

---

**Authentication is ready to use!** Just enable Email provider in Supabase dashboard and start testing. 🎉
