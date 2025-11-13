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

## Optional Services

Other services are only needed if you're using those features:
- **Stripe**: For payment processing
- **Sanity**: For CMS content
- **OpenAI/Together AI**: For AI features
- **Resend**: For email sending
- **Upstash Redis**: For rate limiting

## Important Notes

- Never commit `.env.local` to git (it's already in `.gitignore`)
- The `NEXT_PUBLIC_` prefix means these variables are exposed to the browser
- Restart your dev server after changing environment variables



