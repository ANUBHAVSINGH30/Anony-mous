# Supabase Setup Guide for Anony-mous

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: anony-mous (or your choice)
   - **Database Password**: (create a strong password)
   - **Region**: (choose closest to you)
5. Click "Create new project" and wait for it to initialize

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Project Settings** (gear icon)
2. Click on **API** in the left sidebar
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under Project API keys)

4. Open `frontend/.env.local` and replace:
   ```
   VITE_SUPABASE_URL=your_actual_url_here
   VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
   ```

## Step 3: Create Database Tables

1. In Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click **"New query"**
3. Copy and paste this SQL:

```sql
-- Create posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'link', 'media')),
  media_url TEXT,
  username TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0
);

-- Create comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  username TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create votes table
CREATE TABLE votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  value INTEGER NOT NULL CHECK (value IN (-1, 1)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_upvotes ON posts(upvotes DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_votes_post_id ON votes(post_id);
CREATE INDEX idx_votes_user_id ON votes(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON votes
  FOR SELECT USING (true);

-- Create policies for insert (anyone can insert)
CREATE POLICY "Enable insert for all users" ON posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for all users" ON comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for all users" ON votes
  FOR INSERT WITH CHECK (true);

-- Create policies for update
CREATE POLICY "Enable update for all users" ON posts
  FOR UPDATE USING (true);

CREATE POLICY "Enable update for all users" ON votes
  FOR UPDATE USING (true);

-- Create policies for delete
CREATE POLICY "Enable delete for all users" ON votes
  FOR DELETE USING (true);
```

4. Click **"Run"** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned" - that's good!

## Step 4: Verify Tables

1. Click on **Table Editor** in the left sidebar
2. You should see three tables:
   - `posts`
   - `comments`
   - `votes`

## Step 5: (Optional) Create Storage Bucket for Images

1. Click on **Storage** in the left sidebar
2. Click **"New bucket"**
3. Name it: `post-images`
4. Make it **public**
5. Click **"Create bucket"**

6. Click on the `post-images` bucket
7. Go to **Policies** tab
8. Click **"New policy"** and add:
   - **Policy name**: Public read
   - **SELECT**: Enable for all users
   - **INSERT**: Enable for all users

## Step 6: Test Your Setup

1. Make sure you've updated `.env.local` with your actual keys
2. Restart your dev server:
   ```bash
   cd frontend
   npm run dev
   ```
3. Try creating a post!
4. Check your Supabase **Table Editor** → `posts` table to see the data

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure `.env.local` is in the `frontend` folder
- Restart your dev server after updating `.env.local`
- Verify the variable names start with `VITE_`

### Error: "relation 'posts' does not exist"
- Run the SQL script again in SQL Editor
- Check if tables appear in Table Editor

### Posts not showing up
- Open browser console (F12) and check for errors
- Verify your Supabase URL and keys are correct
- Check if RLS policies are enabled (see Step 3)

### Can't insert data
- Make sure RLS policies allow INSERT (see Step 3)
- Check browser console for specific error messages

## Next Steps

Once this is working:
- ✅ Create posts from the app
- ✅ See posts in feed
- ✅ Vote on posts
- ✅ Add comments
- 🔄 Implement image upload to Storage
- 🔄 Add real-time subscriptions (posts update live)
