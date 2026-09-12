# ALLMOALI - Razorpay Payment Gateway Integration & Setup Guide

This document provides step-by-step instructions for configuring, testing, and deploying the Razorpay Payment Gateway integration on the ALLMOALI Next.js website.

---

## 1. Environment Variables Overview

The integration uses 3 core environment variables:

| Variable Name | Environment | Description | Exposed to Browser? |
| :--- | :--- | :--- | :--- |
| `RAZORPAY_KEY_ID` | Server | Your Razorpay API Key ID (`rzp_test_...` or `rzp_live_...`) | No (Server only) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Client & Server | Public Key ID used by Razorpay Checkout script | Yes (Public) |
| `RAZORPAY_KEY_SECRET` | Server Only | Razorpay API Secret Key | **NEVER** |
| `RAZORPAY_WEBHOOK_SECRET` | Server Only | Secret token used to verify Webhook signatures | **NEVER** |

> [!CAUTION]
> `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` must **NEVER** be committed to Git or exposed in client-side code.

---

## 2. Razorpay Account Setup & API Key Generation

### Step 1: Login to Razorpay Dashboard
1. Log in to [dashboard.razorpay.com](https://dashboard.razorpay.com).
2. Complete business KYC / account activation if launching in Live Mode.

### Step 2: Generate API Keys (Test Mode First)
1. Switch to **Test Mode** using the toggle at the top right of your Razorpay Dashboard.
2. Go to **Account & Settings** → **API Keys**.
3. Click **Generate Test Key**.
4. Copy:
   - **Key ID**: Starts with `rzp_test_...`
   - **Key Secret**: Save this in a password manager (it will only be shown once).

### Step 3: Local Configuration (.env.local)
Create a `.env.local` file in your project root:

```env
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
RAZORPAY_WEBHOOK_SECRET=your_custom_webhook_secret_here
```

---

## 3. Webhook Configuration in Razorpay Dashboard

Webhooks allow Razorpay to notify your server asynchronously when payments succeed or fail.

### Step 1: Add New Webhook
1. In the Razorpay Dashboard, go to **Account & Settings** → **Webhooks**.
2. Click **Add New Webhook**.

### Step 2: Configure Webhook Settings
- **Webhook URL**: `https://YOUR-DOMAIN.com/api/razorpay/webhook` (e.g. `https://allmoali.com/api/razorpay/webhook`)
- **Secret**: Generate a strong random string (e.g., `whsec_allmoali_987654321`). Set this value as `RAZORPAY_WEBHOOK_SECRET` in your environment variables.
- **Active Events**: Select the following mandatory events:
  - `payment.authorized`
  - `payment.captured`
  - `payment.failed`
  - `order.paid`
3. Save the Webhook.

---

## 4. Local Development & Webhook Testing

### Local Webhook Testing with ngrok
To test Razorpay webhooks locally during development:
1. Run local dev server: `npm run dev`
2. Start ngrok tunnel: `ngrok http 3000`
3. Update Webhook URL in Razorpay Dashboard to: `https://<your-ngrok-id>.ngrok-free.app/api/razorpay/webhook`

---

## 5. Cloudflare Workers / OpenNext Production Deployment

When deploying to Cloudflare Workers using OpenNext:

### 1. Set Production Secrets via Wrangler
Run the following CLI commands to securely store production secrets in Cloudflare without exposing them in your source code:

```bash
npx wrangler secret put RAZORPAY_KEY_ID
npx wrangler secret put NEXT_PUBLIC_RAZORPAY_KEY_ID
npx wrangler secret put RAZORPAY_KEY_SECRET
npx wrangler secret put RAZORPAY_WEBHOOK_SECRET
```

### 2. Deploy the Application
```bash
npm run deploy
```

---

## 6. Going Live (Switching to Live Credentials)

Before switching to Live Mode:
1. Complete Razorpay Account Activation & KYC.
2. In Razorpay Dashboard, toggle to **Live Mode**.
3. Go to **Account & Settings** → **API Keys** → **Generate Live Key**.
4. Update secrets in Cloudflare (`wrangler secret put ...`) or server host.
5. Create a Live Webhook pointing to `https://allmoali.com/api/razorpay/webhook` with live `RAZORPAY_WEBHOOK_SECRET`.
6. Conduct a small live transaction (e.g., ₹286 for single bottle) to verify payment flow.

---

## 7. Architecture & API Reference

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/razorpay/create-order` | `POST` | Validates customer data, calculates server-side price, generates internal order & Razorpay order ID. |
| `/api/razorpay/verify` | `POST` | Verifies Razorpay HMAC SHA256 payment signature server-side. |
| `/api/razorpay/webhook` | `POST` | Processes asynchronous webhook events with raw body signature verification and idempotency checks. |

---

## 8. Troubleshooting & Gotchas

- **Invalid Signature Error on Webhooks**:
  Ensure that `/api/razorpay/webhook` reads the request body using `await request.text()` before parsing JSON. The HMAC SHA256 signature calculation requires the exact raw string representation.
- **Node vs Cloudflare Workers Compatibility**:
  The integration uses native `fetch` calls and standard Node crypto compat (`nodejs_compat`), ensuring full execution compatibility on Cloudflare Workers runtime.
