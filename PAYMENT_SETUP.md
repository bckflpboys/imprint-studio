# 🚀 Multi-Payment Gateway Setup Guide

## ✅ What's Included

Your Next.js template now has a complete multi-payment gateway system supporting:

1. **Stripe** - Global payment processing
2. **Paystack** - African payments (Nigeria, Ghana, Kenya, South Africa)
3. **PayPal** - Global payment platform
4. **Razorpay** - Indian payment gateway
5. **Flutterwave** - African payment gateway

## 📁 File Structure

```
libs/payments/
├── index.ts           # Main orchestrator (use this in your code)
├── types.ts           # TypeScript interfaces
├── stripe.ts          # Stripe implementation
├── paystack.ts        # Paystack implementation
├── paypal.ts          # PayPal implementation
├── razorpay.ts        # Razorpay implementation
├── flutterwave.ts     # Flutterwave implementation
└── README.md          # Detailed documentation

app/
├── api/payment/
│   ├── create/route.ts      # Create payment endpoint
│   ├── verify/route.ts      # Verify payment endpoint
│   └── providers/route.ts   # List available providers
└── payment/
    ├── page.tsx             # Payment form UI
    ├── success/page.tsx     # Success page
    └── cancel/page.tsx      # Cancel page
```

## 🔧 Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
npm install stripe axios razorpay @paypal/checkout-server-sdk
```

### Step 2: Configure Environment Variables

Copy `.env.example` to `.env.local` and add your keys:

```env
# Add only the providers you want to use

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key_here

# Paystack
PAYSTACK_SECRET_KEY=sk_test_your_key_here

# PayPal
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
PAYPAL_MODE=sandbox

# Razorpay
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Flutterwave
FLUTTERWAVE_SECRET_KEY=your_secret_key
```

### Step 3: Test It Out

1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3000/payment`
3. Try making a test payment!

## 💻 Usage Examples

### In Your Code

```typescript
import { paymentGateway } from '@/libs/payments';

// Create a payment
const result = await paymentGateway.createCheckout({
  provider: 'stripe',  // or 'paystack', 'paypal', etc.
  amount: 5000,        // Amount in cents (50.00)
  currency: 'USD',
  customerEmail: 'customer@example.com',
  description: 'Product purchase',
});

if (result.success) {
  // Redirect to checkout
  window.location.href = result.checkoutUrl;
}
```

### Via API

```javascript
// Create payment
const response = await fetch('/api/payment/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    provider: 'stripe',
    amount: 5000,
    currency: 'USD',
    customerEmail: 'user@example.com',
  }),
});

const data = await response.json();
```

## 🎯 Key Features

✅ **Unified Interface** - Same code works with all providers  
✅ **Auto-Detection** - Only loads configured providers  
✅ **Type-Safe** - Full TypeScript support  
✅ **Error Handling** - Comprehensive error messages  
✅ **Easy Testing** - Switch providers with one line  
✅ **Production Ready** - Built with best practices  

## 🔒 Important Notes

### Currency Formats

Different providers use different formats:

- **Stripe**: Amount in cents (5000 = $50.00)
- **Paystack**: Amount in kobo (5000 = ₦50.00)
- **PayPal**: Amount in dollars (50.00 = $50.00)
- **Razorpay**: Amount in paise (5000 = ₹50.00)
- **Flutterwave**: Amount in dollars (50.00 = $50.00)

The system handles this automatically!

### Security

- ✅ Never expose secret keys in frontend code
- ✅ Always verify payments on the server
- ✅ Use environment variables for credentials
- ✅ Implement webhook handlers for production

## 🧪 Testing

Each provider has test/sandbox modes:

- **Stripe**: Use test keys (sk_test_...)
- **Paystack**: Use test keys (sk_test_...)
- **PayPal**: Set PAYPAL_MODE=sandbox
- **Razorpay**: Use test keys
- **Flutterwave**: Use test keys

## 📚 Next Steps

1. **Get API Keys**: Sign up for the providers you want to use
2. **Test Payments**: Try the `/payment` page
3. **Implement Webhooks**: Handle payment notifications
4. **Customize UI**: Update the payment form to match your brand
5. **Go Live**: Switch to production keys when ready

## 🆘 Need Help?

- Check `libs/payments/README.md` for detailed docs
- Visit provider documentation links in the README
- Test with sandbox/test keys first

## 🎉 You're All Set!

Your multi-payment gateway is ready to accept payments from customers worldwide! 🌍💳
