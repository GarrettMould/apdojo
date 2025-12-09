# Stripe Webhook Setup Guide

## Required Stripe Dashboard Configuration

For the exam purchase flow to work on your live site, you need to configure a webhook endpoint in your Stripe Dashboard.

### Step 1: Access Stripe Dashboard
1. Go to https://dashboard.stripe.com
2. Navigate to **Developers** → **Webhooks**

### Step 2: Add Webhook Endpoint

**For Production (Live Site):**
- **Endpoint URL**: `https://yourdomain.com/api/stripe/webhook`
  - Replace `yourdomain.com` with your actual domain
  - Example: `https://apdojo.com/api/stripe/webhook`

**For Testing (Local Development):**
- Use Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Or use a tool like ngrok to expose your local server

### Step 3: Select Events to Listen For

The webhook needs to listen for these events:

1. **`checkout.session.completed`** ⭐ **REQUIRED for exam purchases**
   - This event fires when a user completes payment for an exam
   - The webhook will add the exam to the user's `purchases` array in Firebase

2. **`payment_intent.succeeded`** (Already configured for unit tests)
   - This handles unit test purchases
   - Can keep this enabled if you're still using it

### Step 4: Get Webhook Signing Secret

After creating the webhook endpoint:

1. Click on the webhook endpoint you just created
2. Find the **Signing secret** (starts with `whsec_...`)
3. Copy this secret

### Step 5: Add to Environment Variables

Add the webhook secret to your production environment variables:

**In your hosting platform (Vercel/Netlify/etc.):**
```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

**Also ensure these are set:**
```
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxx
```

### Step 6: Test the Webhook

1. In Stripe Dashboard, go to your webhook endpoint
2. Click **Send test webhook**
3. Select `checkout.session.completed` event
4. Check your server logs to verify it's received

### Important Notes

- **The webhook endpoint must be publicly accessible** (HTTPS required)
- **The webhook secret must match** between Stripe Dashboard and your environment variables
- **Test in Stripe test mode first** before going live
- The webhook will automatically add exam IDs (like `macro-mcq-1`) to the user's `purchases` array in Firebase

### Current Webhook Handler

The webhook at `/api/stripe/webhook` handles:
- `payment_intent.succeeded` → Adds unit tests to `purchasedTests` array
- `checkout.session.completed` → Adds exams to `purchases` array (NEW)

### Troubleshooting

If purchases aren't being recorded:
1. Check Stripe Dashboard → Webhooks → Recent events
2. Look for failed webhook deliveries
3. Check server logs for webhook errors
4. Verify `STRIPE_WEBHOOK_SECRET` is set correctly
5. Ensure the webhook URL is accessible (not blocked by firewall)

