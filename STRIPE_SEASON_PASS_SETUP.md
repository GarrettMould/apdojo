# Stripe Season Pass Setup Guide

## Overview

The season pass checkout now uses your actual Stripe products instead of creating products dynamically. You need to configure the Price IDs from your Stripe products.

## Step 1: Get Your Stripe Price IDs

### Option A: If Your Products Already Have Prices

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/products)
2. Find your three products:
   - **AP Macro Season Pass**
   - **AP Micro Season Pass**
   - **Bundle Season Pass**
3. For each product:
   - Click on the product name to open it
   - Scroll down to the **"Pricing"** section
   - You'll see a table with prices - look for the **Price ID** column (starts with `price_...`)
   - If you don't see a Price ID column, click on the price row to expand it
   - The Price ID looks like: `price_1AbCdEfGhIjKlMnOpQrStUv`

### Option B: If Your Products Don't Have Prices Yet

If you only see Product IDs (like `prod_TgXi2aVEMz5JTg`) but no prices:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/products)
2. Click on each product
3. Click **"Add another price"** or **"Pricing"** tab
4. Set up the price:
   - **Amount**: $29.00 (or your price)
   - **Billing period**: One time
   - **Currency**: USD
5. Click **"Add price"** or **"Save"**
6. The Price ID will be generated (starts with `price_...`)
7. Copy this Price ID

## Step 2: Add Price IDs to Environment Variables

Add these to your `.env.local` file:

```bash
# Stripe Season Pass Price IDs
STRIPE_MACRO_SEASON_PASS_PRICE_ID=price_xxxxxxxxxxxxx
STRIPE_MICRO_SEASON_PASS_PRICE_ID=price_xxxxxxxxxxxxx
STRIPE_BUNDLE_SEASON_PASS_PRICE_ID=price_xxxxxxxxxxxxx
```

**Important:** 
- Use **test mode** Price IDs for development (from test mode products)
- Use **live mode** Price IDs for production
- Make sure the Price IDs match the mode of your `STRIPE_SECRET_KEY`

## Step 3: How It Works

### Single Season Pass Purchase
- User visits `/purchase/season-pass?courseType=macro` or `?courseType=micro`
- Clicks "UNLOCK INSTANT ACCESS"
- Uses the corresponding Price ID (`STRIPE_MACRO_SEASON_PASS_PRICE_ID` or `STRIPE_MICRO_SEASON_PASS_PRICE_ID`)
- Webhook adds the subject to `seasonPass` array

### Bundle Purchase
- User visits bundle purchase page (if you create one)
- Uses `STRIPE_BUNDLE_SEASON_PASS_PRICE_ID`
- Webhook adds both `'macro'` and `'micro'` to `seasonPass` array

## Step 4: Testing

1. Make sure all three Price IDs are set in `.env.local`
2. Restart your dev server
3. Try purchasing a season pass
4. Check Stripe Dashboard → Payments to verify the correct product was purchased
5. Check your Firestore `users` collection to verify `seasonPass` and `seasonPassExpiration` were set correctly

## Troubleshooting

### Error: "Stripe Price IDs not configured"
- Make sure all three environment variables are set
- Check for typos in variable names
- Restart your dev server after adding them

### Wrong product being purchased
- Verify the Price IDs match your Stripe products
- Check that you're using test mode Price IDs with test mode secret key (or live with live)

### Bundle not adding both subjects
- Check the webhook logs to see if `courseType: 'bundle'` is in the metadata
- Verify the webhook handler is processing bundle purchases correctly

## Notes

- The system automatically calculates expiration dates (June 30th UTC 11:59 PM)
- Bundle purchases grant access to both macro and micro
- All purchases expire on the same date (June 30th of the current or next year)

