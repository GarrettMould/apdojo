# Environment Variables Setup

This project requires environment variables to be set up for Firebase and other services.

## Quick Setup

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Firebase credentials:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (or create a new one)
   - Go to Project Settings (gear icon) > General tab
   - Scroll down to "Your apps" section
   - Click on the Web app icon (</>) or create a new web app
   - Copy the config values into your `.env.local` file

3. The Firebase config object will look like this:
   ```javascript
   {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   }
   ```

4. Map these to your `.env.local`:
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `storageBucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`

## Required for Basic Functionality

At minimum, you need the Firebase variables to run the app:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`

## Required for Server-Side Features (API Routes)

For server-side operations like updating MCQ status, XP, and other API routes, you also need **Firebase Admin SDK** credentials:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (gear icon) → **Service Accounts** tab
4. Click **Generate New Private Key**
5. Download the JSON file (this contains your service account credentials)

6. Extract these values from the JSON file and add them to your `.env.local`:
   - `FIREBASE_CLIENT_EMAIL` - The `client_email` field from the JSON (e.g., `firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com`)
   - `FIREBASE_PRIVATE_KEY` - The `private_key` field from the JSON (keep the `\n` characters, they'll be handled automatically)

**Important**: The `FIREBASE_PRIVATE_KEY` should be the entire private key string from the JSON, including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines. You can paste it as a single line or keep the newlines - the code will handle both formats.

Example `.env.local` entries:
```
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**Note**: `NEXT_PUBLIC_FIREBASE_PROJECT_ID` is shared between client and server, so you only need to set it once.

## Optional Services

Other services are only needed if you're using those features:
- **Stripe**: For payment processing
  - `STRIPE_SECRET_KEY` - Your Stripe secret key (starts with `sk_`)
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key (starts with `pk_`)
  - `STRIPE_WEBHOOK_SECRET` - Webhook signing secret (starts with `whsec_`) - **Required for exam purchases**
    - See `STRIPE_WEBHOOK_SETUP.md` for detailed setup instructions
- **Sanity**: For CMS content
- **OpenAI/Together AI**: For AI features
- **Resend**: For email sending
- **Upstash Redis**: For rate limiting

## Important Notes

- Never commit `.env.local` to git (it's already in `.gitignore`)
- The `NEXT_PUBLIC_` prefix means these variables are exposed to the browser
- Restart your dev server after changing environment variables



