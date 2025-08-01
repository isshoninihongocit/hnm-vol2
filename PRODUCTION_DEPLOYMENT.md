# 🚀 Production Deployment Guide - Hikari no Matsuri Frontend

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Ensure these environment variables are set in your production environment:

```bash
# Production Environment Variables
NODE_ENV=production
VITE_RAZORPAY_KEY_ID=rzp_live_your_production_key_here
VITE_API_BASE_URL=https://hnm2-be.vercel.app
```

### 2. Backend Integration Status ✅
- ✅ Authentication endpoints integrated (`/auth/login`, `/auth/signup`)
- ✅ Payment endpoints integrated (`/payments/create-order`, `/payments/verify`, `/payments/store-payment`)
- ✅ User data endpoints integrated (`/payments/user-purchased-plans`)
- ✅ Event registration endpoints integrated (`/events/register`)
- ✅ Error handling and logging implemented
- ✅ Environment variable security (using VITE_ prefix)

### 3. Security Measures
- ✅ API keys stored in environment variables
- ✅ Client-side variables prefixed with `VITE_`
- ✅ `.env` file in `.gitignore`
- ✅ Error handling for API failures
- ✅ Input validation on frontend

## 🏗️ Build Commands

### Development Build
```bash
npm run dev:production
```

### Production Build
```bash
npm run build:production
```

### Test Production Build Locally
```bash
npm run test:build
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   ```
   VITE_RAZORPAY_KEY_ID=rzp_live_your_production_key_here
   VITE_API_BASE_URL=https://hnm2-be.vercel.app
   ```
3. Deploy automatically on push to main branch

### Option 2: Netlify
1. Build command: `npm run build:production`
2. Publish directory: `build/client`
3. Set environment variables in Netlify dashboard

### Option 3: Traditional Hosting
1. Run `npm run build:production`
2. Upload `build/client` contents to your web server
3. Configure environment variables on your server

## 🔧 Backend Integration Features

### Authentication Flow
```typescript
// Login
const user = await signIn(email, password);

// Signup
const newUser = await signUp({
  email, password, username, college, phone
});
```

### Payment Flow
```typescript
// Create order
const order = await createRazorpayOrder({
  amount: 100,
  receipt: 'receipt_123',
  eventDetails: { name: 'General Pass', type: 'pass' },
  user: { name: 'John Doe', email: 'john@example.com' }
});

// Store successful payment
await storePayment({
  paymentData: { razorpay_payment_id, razorpay_order_id, razorpay_signature },
  orderData: order,
  planData: selectedPlan,
  userData: currentUser
});
```

### User Data
```typescript
// Get purchased plans
const purchasedPlans = await getUserPurchasedPlans(userEmail);

// Register for events
await registerForEvents(registrationData);
```

## 📊 Monitoring & Logging

### Production Logging
- Payment transactions logged to backend
- User actions tracked with console.log statements
- Error handling with detailed error messages
- Failed payments stored for analysis

### Health Checks
- API connectivity verification
- Environment variable validation
- Razorpay script loading verification

## 🚨 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure variables are prefixed with `VITE_`
   - Restart development server after adding variables
   - Check deployment platform environment settings

2. **Payment Integration Issues**
   - Verify Razorpay keys are correct (test vs live)
   - Check backend API endpoints are accessible
   - Ensure CORS is configured on backend

3. **Build Failures**
   - Run `npm run typecheck` to check TypeScript errors
   - Ensure all dependencies are installed
   - Check for console errors in browser

### Support Resources
- Backend API: https://hnm2-be.vercel.app
- Frontend Repository: Check current repo
- Environment Setup: See `.env.example`

## 🎯 Performance Optimizations

### Implemented Optimizations
- Code splitting with manual chunks
- Source maps disabled in production
- CSS minification enabled
- Bundle size optimization
- Lazy loading for components

### Monitoring
- Monitor bundle size with build output
- Check loading times in production
- Monitor API response times
- Track user engagement metrics

---

## 📞 Final Steps

1. **Test in Staging**: Deploy to staging environment first
2. **Verify Payments**: Test with Razorpay test keys
3. **Check Logs**: Monitor console and backend logs
4. **User Testing**: Have team members test the flow
5. **Go Live**: Switch to production Razorpay keys and deploy

**Status**: ✅ Ready for Production Deployment
