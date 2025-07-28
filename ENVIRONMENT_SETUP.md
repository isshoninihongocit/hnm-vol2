# Environment Setup Guide for HNM Vol2

## Required Environment Variables

This project requires several environment variables to be set up for proper functionality. Follow the steps below to configure your environment.

### 1. Create Environment File

Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

### 2. Configure Environment Variables

#### Email Configuration (Required for email sending)
```env
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Note**: For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an App Password (not your regular password)
3. Use the App Password in the EMAIL_PASS field

#### Razorpay Configuration (Required for payments)
```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

**How to get Razorpay credentials**:
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to Settings > API Keys
3. Generate API Keys for your account

#### Firebase Configuration (Required for authentication)
```env
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**How to get Firebase credentials**:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings > General > Your apps
4. Click "Add app" or select web app
5. Copy the configuration values

#### API Configuration
```env
NODE_ENV=production  # or 'development' for local development
API_BASE_URL=https://your-production-domain.com  # or 'http://localhost:3000' for local
```

### 3. Production Deployment

For production deployment, ensure all environment variables are properly set in your hosting platform:

#### Vercel
```bash
vercel env add NODE_ENV
vercel env add RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET
vercel env add EMAIL_USER
vercel env add EMAIL_PASS
# ... add all other variables
```

#### Netlify
Add environment variables in Netlify Dashboard:
1. Go to Site Settings > Environment Variables
2. Add each variable individually

#### Other Platforms
Consult your hosting platform's documentation for setting environment variables.

### 4. Security Notes

- Never commit `.env` files to version control
- Use different credentials for development and production
- Regularly rotate your API keys and passwords
- Use strong, unique passwords for all services

### 5. Verification

To verify your setup:
1. Start the development server
2. Test Google authentication
3. Test email sending functionality
4. Test payment processing (use Razorpay test mode)

### 6. Troubleshooting

#### Common Issues:
- **Firebase Auth not working**: Check if your domain is added to authorized domains in Firebase Auth settings
- **Email not sending**: Verify Gmail App Password and 2FA is enabled
- **Razorpay errors**: Ensure you're using the correct key for your environment (test vs live)

#### Environment-specific debugging:
```env
NODE_ENV=development  # Enable more verbose logging
```

### 7. Development vs Production

#### Development (.env.local)
```env
NODE_ENV=development
API_BASE_URL=http://localhost:3000
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx  # Use test keys
```

#### Production (.env.production)
```env
NODE_ENV=production
API_BASE_URL=https://your-domain.com
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx  # Use live keys
```

---

For any issues with environment setup, please check the documentation or contact the development team.
