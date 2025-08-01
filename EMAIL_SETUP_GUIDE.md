# Email Service Setup Guide - Hikari no Matsuri

## Overview
Your application has a sophisticated email service with the following features:
- **Multiple email account rotation** for high-volume sending
- **Daily usage limits** to prevent Gmail quota issues
- **Registration confirmation emails** sent after successful payments
- **Professional email templates** with event branding

## Email Service Architecture

### Frontend Email (Simple notifications)
- Uses basic Nodemailer configuration
- For simple confirmations and notifications
- Configured in `app/api/send-confirmation/route.ts`

### Backend Email Service (Production-grade)
- Advanced email rotation system
- Multiple Gmail accounts for load balancing
- Daily usage tracking (500 emails per account per day)
- Professional HTML email templates
- Located in `HNM2-BE/service/emailService.js`

## Step-by-Step Setup

### 1. Gmail Account Preparation

You'll need **3-5 Gmail accounts** for optimal performance:

#### For each Gmail account:
1. **Enable 2-Factor Authentication**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to Security → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Enter "HNM Event System" as device name
   - **Save the 16-character password** (like: `abcd efgh ijkl mnop`)

3. **Account Recommendations**
   - Use descriptive names: `hnm.events@gmail.com`, `hnm.registration@gmail.com`
   - Or use your existing accounts with proper app passwords

### 2. Environment Variable Configuration

Update your `.env` files with real values:

#### Frontend (.env)
```env
# Primary email for simple notifications
EMAIL_USER=your_primary_email@gmail.com
EMAIL_PASS=your_16_char_app_password

# Event configuration
EVENT_NAME=Hikari no Matsuri
EVENT_YEAR=2025
EVENT_ORGANIZATION=CIT Chennai - Japanese Club
EVENT_CONTACT_EMAIL=japaneseclub@citchennai.net
EVENT_TEAM_NAME=Hikari no Matsuri Team
```

#### Backend (HNM2-BE/.env)
```env
# Multiple email accounts for rotation
EMAIL_1=hnm.events@gmail.com
EMAIL_1_PASSWORD=abcd_efgh_ijkl_mnop
EMAIL_2=hnm.registration@gmail.com
EMAIL_2_PASSWORD=qrst_uvwx_yzab_cdef
EMAIL_3=hnm.notifications@gmail.com
EMAIL_3_PASSWORD=ghij_klmn_opqr_stuv

# Event branding
EVENT_NAME=Hikari no Matsuri
EVENT_YEAR=2025
EVENT_ORGANIZATION=CIT Chennai - Japanese Club
EVENT_CONTACT_EMAIL=japaneseclub@citchennai.net
EVENT_TEAM_NAME=Hikari no Matsuri Team
```

### 3. Vercel Environment Variables

For production deployment, add these to your Vercel dashboard:

```bash
# Navigate to your Vercel project dashboard
# Go to Settings → Environment Variables
# Add each variable:

EMAIL_1=your_first_email@gmail.com
EMAIL_1_PASSWORD=your_first_app_password
EMAIL_2=your_second_email@gmail.com
EMAIL_2_PASSWORD=your_second_app_password
EMAIL_3=your_third_email@gmail.com
EMAIL_3_PASSWORD=your_third_app_password

EVENT_NAME=Hikari no Matsuri
EVENT_YEAR=2025
EVENT_ORGANIZATION=CIT Chennai - Japanese Club
EVENT_CONTACT_EMAIL=japaneseclub@citchennai.net
EVENT_TEAM_NAME=Hikari no Matsuri Team
```

## Email Service Features

### 1. Registration Confirmation Emails
- **Trigger**: Sent automatically after successful payment
- **Content**: Professional HTML template with:
  - Event details and schedule
  - QR code for entry (if applicable)
  - Payment confirmation details
  - Contact information

### 2. Email Rotation System
- **Daily Limits**: 500 emails per Gmail account
- **Automatic Rotation**: Switches to next account when limit reached
- **Usage Tracking**: Monitors daily usage per account
- **Fallback**: Resets counters if all accounts hit limits

### 3. Email Templates Include:
- Welcome message with event branding
- Payment confirmation details
- Event schedule and location
- Important instructions and guidelines
- Contact information for support

## Testing the Email Service

### 1. Test Basic Email Functionality
```bash
# Test email service status (backend)
curl -X GET "https://your-backend-url.vercel.app/test/email-status"
```

### 2. Test Registration Email Flow
1. Complete a registration with a valid email
2. Check that confirmation email is received
3. Verify email content and formatting

### 3. Monitor Email Usage
- Check backend logs for email rotation
- Monitor daily usage limits
- Verify fallback mechanisms

## Common Issues & Solutions

### Issue 1: "Authentication Failed"
**Solution**: 
- Verify 2FA is enabled on Gmail account
- Use App Password, not regular password
- Check for typos in email/password

### Issue 2: "Daily Limit Exceeded"
**Solution**:
- Add more email accounts to rotation
- Check email service status endpoint
- Verify usage counter reset (happens daily)

### Issue 3: Emails Going to Spam
**Solution**:
- Use professional "From" names
- Include proper unsubscribe links
- Test with multiple email providers

### Issue 4: HTML Template Issues
**Solution**:
- Test email templates across different clients
- Use inline CSS for better compatibility
- Include plain text fallback

## Email Service Monitoring

The backend provides email service status:
```javascript
// Email service status includes:
{
  index: 1,
  email: "hnm***@gmail.com",
  isConfigured: true,
  currentUsage: 45,
  dailyLimit: 500,
  isActive: true
}
```

## Security Best Practices

1. **Never commit email passwords** to version control
2. **Use App Passwords only** - never regular passwords
3. **Rotate App Passwords** periodically
4. **Monitor usage** for suspicious activity
5. **Use HTTPS only** for email endpoints

## Email Content Customization

Email templates are located in:
- `HNM2-BE/service/emailService.js` (lines 200-900)
- Includes HTML templates for registration confirmation
- Professional styling with event branding
- Responsive design for mobile devices

## Production Deployment Checklist

- [ ] Gmail accounts configured with 2FA
- [ ] App passwords generated for all accounts
- [ ] Environment variables set in Vercel
- [ ] Email templates tested across clients
- [ ] Daily usage limits configured
- [ ] Error handling and fallbacks tested
- [ ] Production email addresses updated

## Support & Troubleshooting

If you encounter issues:
1. Check Vercel deployment logs
2. Test individual email accounts
3. Verify environment variable values
4. Monitor email service status endpoint
5. Check spam folders for test emails

The email service is designed to be robust and handle high-volume event registrations while maintaining professional communication with your attendees.
