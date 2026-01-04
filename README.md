# Business Listing Platform

This is a B2B directory and listing platform where companies can create professional business listings to improve their online visibility and rank higher on Google search results.

## Key Functionality

**Business Listings**: Companies can create and manage detailed profiles showcasing their services, contact information, and business details

**Team Management**: Businesses can add and manage team members within their organization

**SEO Optimization**: The platform is built with Google ranking in mind, helping businesses get discovered through organic search

**Multi-Payment Support**: Integrated payment gateways (Stripe, Paystack, PayPal, Razorpay, Flutterwave) for monetization through premium listings or featured placements

**User Authentication**: Secure login system for business owners and team members

**Directory/Search**: Customers can search and discover businesses through the platform


## Technical Stack

**Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS

**Backend**: Next.js API routes

**Database**: MongoDB with Mongoose

**Authentication**: NextAuth.js

**Payments**: Multi-gateway integration

## Main Pages/Routes

**Dashboard** (for business management)

**Teams** (team member management)

**Blog** (content/SEO)

**Contact** (customer inquiries)

**Payment processing**

**Privacy Policy & Terms of Service**

Essentially, it's similar to platforms like Google My Business, Yelp, or local business directories—but tailored for companies to list themselves and improve their search engine rankings.

## Features

- ⚡ Next.js 14 with App Router
- ⚛️ React 18
- 🎨 Tailwind CSS
- 📝 TypeScript
- 🔐 Authentication ready (NextAuth)
- 💳 **Multi-Payment Gateway** (Stripe, Paystack, PayPal, Razorpay, Flutterwave)
- 📧 Email functionality
- 🗄️ MongoDB/Mongoose setup
- 🎯 SEO optimized for Google rankings
- 📱 Responsive design
- 🧩 Reusable components
- 📋 Business listing management
- 👥 Team management
- 🔍 Search and discovery features

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

### Start Production

```bash
npm start
```

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── dashboard/       # Dashboard pages
│   ├── api/             # API routes
│   └── ...
├── components/          # React components
├── libs/                # Utility libraries
│   ├── payments/       # Multi-payment gateway system
│   └── ...             # Other utilities
├── models/              # Database models
├── public/              # Static assets
└── ...
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_URL=http://localhost:3000
MONGODB_URI=your_mongodb_uri

# Authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Payment Providers (add only the ones you need)
STRIPE_SECRET_KEY=sk_test_...
PAYSTACK_SECRET_KEY=sk_test_...
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
```

See `.env.example` for a complete list of environment variables.

## Components

This template includes various pre-built components:

- Layout components (Header, Footer)
- UI components (Buttons, Modal, Tabs, Accordion)
- Marketing components (Hero, Pricing, Testimonials, CTA, FAQ)
- And more!

## Multi-Payment Gateway

This template includes a powerful multi-payment gateway system supporting:

- **Stripe** - Global payment processing
- **Paystack** - African payments
- **PayPal** - Global payment platform
- **Razorpay** - Indian payment gateway
- **Flutterwave** - African payment gateway

### Quick Start

```typescript
import { paymentGateway } from '@/libs/payments';

const result = await paymentGateway.createCheckout({
  provider: 'stripe', // or 'paystack', 'paypal', etc.
  amount: 5000,
  currency: 'USD',
  customerEmail: 'user@example.com',
});
```

See `libs/payments/README.md` for complete documentation.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT
