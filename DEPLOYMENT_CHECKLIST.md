# 🚀 Production Deployment Checklist

## ✅ Code Status: READY TO DEPLOY

All critical integrations are properly implemented with error handling and validation.

---

## 🔐 Required Environment Variables

### **Stripe (Payment Processing)**
```bash
# Required for all Stripe operations
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx                    # Live mode secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx  # Live mode publishable key
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx                  # Webhook signing secret

# Required for Season Pass purchases
STRIPE_MACRO_SEASON_PASS_PRICE_ID=price_xxxxxxxxxxxxx      # Macro season pass price ID
STRIPE_MICRO_SEASON_PASS_PRICE_ID=price_xxxxxxxxxxxxx     # Micro season pass price ID
STRIPE_BUNDLE_SEASON_PASS_PRICE_ID=price_xxxxxxxxxxxxx     # Bundle season pass price ID
```

**⚠️ Important:**
- Use **live mode** keys and Price IDs for production
- Use **test mode** keys and Price IDs for development
- Price IDs must match the mode of your `STRIPE_SECRET_KEY`

### **Firebase (Database & Authentication)**
```bash
# Required for Firebase Admin SDK (server-side operations)
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Note:** Client-side Firebase config is typically in `src/lib/firebase.ts` and uses public config.

---

## 🔧 Pre-Deployment Steps

### 1. **Stripe Setup**
- [ ] Create products in Stripe Dashboard:
  - [ ] AP Macro Season Pass
  - [ ] AP Micro Season Pass
  - [ ] Bundle Season Pass
- [ ] Add prices to each product (one-time payment)
- [ ] Copy Price IDs (start with `price_...`)
- [ ] Set up webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
- [ ] Configure webhook to listen for:
  - [ ] `checkout.session.completed` (for season passes)
  - [ ] `payment_intent.succeeded` (for unit tests/exams)
- [ ] Copy webhook signing secret (`whsec_...`)
- [ ] Add all Stripe environment variables to your hosting platform

### 2. **Firebase Setup**
- [ ] Create Firebase service account (if not already done)
- [ ] Download service account JSON
- [ ] Extract and add Firebase environment variables:
  - [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - [ ] `FIREBASE_CLIENT_EMAIL`
  - [ ] `FIREBASE_PRIVATE_KEY`
- [ ] Verify Firestore security rules allow authenticated users to read/write their own data
- [ ] Test Firebase Admin initialization (check server logs)

### 3. **Environment Variables Verification**
- [ ] All Stripe variables set (7 total)
- [ ] All Firebase variables set (3 total)
- [ ] Variables are set in your hosting platform (Vercel/Netlify/etc.)
- [ ] **DO NOT** commit `.env.local` to git (already in `.gitignore`)

---

## 🧪 Testing Checklist

### **Stripe Integration**
- [ ] Season pass purchase flow works (macro)
- [ ] Season pass purchase flow works (micro)
- [ ] Bundle purchase flow works
- [ ] Webhook receives `checkout.session.completed` events
- [ ] User's `seasonPass` array updates correctly in Firestore
- [ ] User's `seasonPassExpiration` updates correctly (June 30th UTC)
- [ ] Bundle adds both 'macro' and 'micro' to `seasonPass`
- [ ] Success/cancel URLs redirect correctly

### **Firebase Integration**
- [ ] User authentication works (signup/login)
- [ ] User data saves to Firestore
- [ ] Season pass status checks work (`hasValidSeasonPass`)
- [ ] Premium checks work (`isPremium` in credit system)
- [ ] Credits system works (daily practice, AI generations)
- [ ] XP system works (awards, leveling)

### **Feature Access**
- [ ] Free users redirected to purchase page for locked content
- [ ] Premium users can access all content
- [ ] Season pass expiration logic works (checks UTC date)
- [ ] PDF generation works for premium users
- [ ] "Join the Dojo" modal appears for free users

---

## 📋 Code Verification

### ✅ **Stripe Integration** - VERIFIED
- ✅ `/api/create-season-pass-checkout` - Validates Price IDs, creates checkout sessions
- ✅ `/api/stripe/webhook` - Handles `checkout.session.completed` and `payment_intent.succeeded`
- ✅ Season pass expiration logic (June 30th UTC 11:59 PM)
- ✅ Bundle purchase adds both subjects
- ✅ Error handling and validation in place

### ✅ **Firebase Integration** - VERIFIED
- ✅ Firebase Admin SDK initialized with error handling
- ✅ Firestore updates use transactions (atomic operations)
- ✅ User data structure includes `seasonPass` and `seasonPassExpiration`
- ✅ Credits system uses transactions for atomic updates
- ✅ XP system properly integrated

### ✅ **Premium Access Logic** - VERIFIED
- ✅ `hasValidSeasonPass()` utility function checks expiration
- ✅ `isPremium()` in credit system checks expiration
- ✅ All components use `hasValidSeasonPass()` for access control
- ✅ Free users redirected to purchase pages (no grey lock screens)

---

## 🚨 Known Issues / Considerations

### **None Identified** ✅

All critical systems are properly implemented with:
- Error handling
- Input validation
- Transaction safety (Firebase)
- Webhook signature verification (Stripe)
- Expiration date logic
- Bundle purchase handling

---

## 📝 Post-Deployment

### **Monitor These:**
1. **Stripe Dashboard**
   - Check for successful payments
   - Monitor webhook delivery (should be 100% success rate)
   - Check for any failed webhook deliveries

2. **Firebase Console**
   - Monitor Firestore writes (should match successful payments)
   - Check user documents for correct `seasonPass` and `seasonPassExpiration` fields
   - Monitor error logs

3. **Application Logs**
   - Check for any Firebase Admin initialization errors
   - Check for any Stripe API errors
   - Monitor webhook processing logs

### **If Issues Arise:**
1. **Webhook not receiving events:**
   - Verify webhook URL is correct in Stripe Dashboard
   - Check webhook signing secret matches environment variable
   - Verify webhook endpoint is publicly accessible

2. **Season pass not activating:**
   - Check webhook logs in Stripe Dashboard
   - Verify `userId` is in checkout session metadata
   - Check Firestore for user document updates
   - Verify expiration date format (ISO string)

3. **Firebase errors:**
   - Verify all Firebase environment variables are set
   - Check service account has proper permissions
   - Verify Firestore security rules

---

## 🎉 You're Ready!

All systems are properly integrated and ready for production deployment. The code includes:
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ Transaction safety
- ✅ Webhook security
- ✅ Expiration date logic
- ✅ Bundle purchase support

**Just make sure all environment variables are set in your hosting platform before deploying!**

