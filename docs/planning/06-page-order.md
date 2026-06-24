# Page Content — Order Page

## Route

`/order`

## Page Purpose

The order page is the conversion page. It should be clean, fast, and mobile-first. It collects customer information, calculates total price, creates the database order, reserves inventory, and redirects to WhatsApp.

## Primary CTA

**Place Order on WhatsApp**

## Image Assets

Use:

- `/assets/product/product-cutout-transparent.png`
- `/assets/product/product-main.jpeg`

## Section 1 — Order Hero

### Eyebrow

Fresh · Natural · Delivered with Care

### H1

Place your Premium Daab order.

### Subheadline

Enter your delivery details, choose your quantity, and continue to WhatsApp for manual confirmation.

### Note

Do not over-design this page. It must be usable.

## Section 2 — Delivery Details Form

### Fields

1. Full Name
2. Phone Number / WhatsApp
3. City
4. Area
5. Full Address
6. Delivery Note optional

### Helper Text

For address:

**House / Road / Block / Building / Landmark**

For phone:

**Use your active WhatsApp number so we can confirm your order.**

## Section 3 — Product Selection

### Product

**Premium Daab**  
100% Natural Young Coconut

### Price

**Tk 120 per unit**

### Quantity Selector

- Minus button
- Quantity number
- Plus button

### Rules

- Minimum quantity: 1
- Normal maximum: 50
- More than 50 should direct to Events & Bulk Orders

## Section 4 — Order Summary

Show:

- Unit price
- Quantity
- Subtotal
- Delivery charge
- Total

Example:

```txt
Unit Price: Tk 120
Quantity: 2
Subtotal: Tk 240
Delivery Charge: Tk 40
Total: Tk 280
```

Delivery charge must come from selected service area.

## Section 5 — Final Action

### Button

Place Order on WhatsApp

### Button Behavior

When clicked:

1. Validate all required fields.
2. Check selected area availability.
3. Check product inventory.
4. Create Supabase order.
5. Reserve inventory.
6. Generate WhatsApp redirect message.
7. Redirect user to WhatsApp.

### Loading Text

Preparing your order...

### Success/Redirect Text

Opening WhatsApp for confirmation...

## Section 6 — Confirmation Note

### Text

Your order is not fully confirmed until our team replies on WhatsApp. This helps us confirm freshness, availability, delivery time, and address details.

## Section 7 — Trust Cards

Cards:

**Freshly Prepared**  
Prepared after order details are submitted.

**Manual Confirmation**  
Our team confirms your order through WhatsApp.

**Delivery in Selected Areas**  
Delivery charge depends on your selected area.

**Cash / Mobile Payment**  
Payment options are confirmed manually.

## Validation Error Copy

### Missing Name

Please enter your full name.

### Invalid Phone

Please enter a valid Bangladeshi WhatsApp number.

### Missing Area

Please select your delivery area.

### Area Unavailable

Premium Daab is not available in this area yet. You can join the waitlist.

### Missing Address

Please enter your full delivery address.

### Out of Stock

Premium Daab is currently out of stock. Please try again later or contact us on WhatsApp.

### Server Error

Something went wrong while preparing your order. Please try again.
