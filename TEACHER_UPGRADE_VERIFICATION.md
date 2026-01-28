# Teacher Upgrade Feature - Production Verification Guide

## Required Environment Variables in Production

For the `/api/upgrade-to-teacher` route to work in production, ensure these environment variables are set in your hosting platform (Vercel/Netlify/etc.):

### Required Variables:
1. **`FIREBASE_PROJECT_ID`** OR **`NEXT_PUBLIC_FIREBASE_PROJECT_ID`** (either works)
   - Your Firebase project ID (e.g., `apdojo`)

2. **`FIREBASE_CLIENT_EMAIL`**
   - Your Firebase Admin SDK service account email
   - Format: `firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com`

3. **`FIREBASE_PRIVATE_KEY`**
   - Your Firebase Admin SDK private key
   - Should include `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines
   - Can be on one line with `\n` characters

## How to Verify Before Deploying

### Step 1: Test Locally First
1. Make sure your `.env.local` has all three variables set
2. Restart your dev server: `npm run dev`
3. Open the tutor/builder page: `http://localhost:3000/tutor/builder`
4. Click "Free Teacher Access" button
5. Check the browser console and server logs for any errors

### Step 2: Check Production Environment Variables

**If using Vercel:**
1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify these are set:
   - `FIREBASE_PROJECT_ID` or `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`

**If using Netlify:**
1. Go to Site settings → Environment variables
2. Verify the same variables are set

### Step 3: Test the API Route Directly (After Deploy)

You can test the API route directly using curl or a tool like Postman:

```bash
# Replace YOUR_USER_ID with an actual user ID from Firebase
curl -X POST https://yourdomain.com/api/upgrade-to-teacher \
  -H "Content-Type: application/json" \
  -d '{"userId": "YOUR_USER_ID"}'
```

Expected successful response:
```json
{"success": true}
```

Expected error if env vars missing:
```json
{
  "success": false,
  "error": "Database not initialized",
  "details": "Firebase Admin SDK failed to initialize. Please check server environment variables."
}
```

### Step 4: Check Server Logs

After deploying, check your production logs:
- **Vercel**: Dashboard → Your Project → Deployments → Click on deployment → View Function Logs
- Look for: `✅ Firebase Admin initialized successfully` or error messages

## Quick Verification Checklist

- [ ] All 3 environment variables are set in production
- [ ] Tested locally and it works
- [ ] Deployed to production
- [ ] Checked production logs for initialization success
- [ ] Tested the button on production site
- [ ] Verified user's `teacher` field updates in Firebase

## Troubleshooting

### If you see "Database not initialized" error:
1. Check that all 3 environment variables are set in production
2. Verify `FIREBASE_PRIVATE_KEY` includes the full key with BEGIN/END lines
3. Check production logs for specific error messages
4. Make sure you redeployed after adding environment variables

### If the route returns HTML instead of JSON:
- This means the route file failed to load
- Check that `firebase-admin.ts` doesn't throw errors during initialization
- Check production logs for module loading errors

### If it works locally but not in production:
- Environment variables might not be set correctly in production
- Make sure you redeployed after adding/changing environment variables
- Check that variable names match exactly (case-sensitive)
