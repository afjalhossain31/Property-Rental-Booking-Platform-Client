# 🏠 Property Rental & Booking Platform

A full-stack Property Rental & Booking Platform where property owners can list rental properties and tenants can discover, book, review, and pay reservation fees securely online. The platform features role-based access control, property management, booking workflows, Stripe payments, favorites management, analytics dashboards, and administrative moderation.

## 🌐 Live Website

**Live Link:** [https://property-rental-booking-platform-cl.vercel.app/]

---

## 🎯 Project Purpose

The purpose of this platform is to create a secure and transparent rental marketplace where:

* Property Owners can list and manage rental properties.
* Tenants can search, book, and review properties.
* Admins can monitor users, properties, bookings, and transactions.
* Online payments can be processed securely through Stripe.

---

## 📁 Frontend Folder Structure

```bash
property-rental-client/
├── public/                       # Static assets (images, icons, etc.)
│   └── favicon.ico
├── src/
│   ├── app/                      # Next.js App Router Core
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/[...all]/    # Authentication endpoints (Better Auth)
│   │   │   └── checkout_sessions/# Stripe payment API
│   │   ├── dashboard/            # User/Owner/Admin Dashboard
│   │   │   ├── add-property/
│   │   │   ├── all-bookings/
│   │   │   ├── all-properties/
│   │   │   ├── booking-requests/
│   │   │   ├── favorites/
│   │   │   ├── my-bookings/
│   │   │   ├── my-properties/
│   │   │   ├── profile/
│   │   │   ├── transactions/
│   │   │   ├── layout.js         # Dashboard layout & sidebar
│   │   │   └── page.js           # Dashboard home
│   │   ├── forgot-password/
│   │   │   └── page.js
│   │   ├── login/
│   │   ├── payment-success/
│   │   ├── properties/
│   │   │   ├── [id]/
│   │   │   └── page.js
│   │   ├── register/
│   │   ├── globals.css
│   │   ├── layout.js             # Root layout
│   │   └── page.js               # Landing page
│   │
│   ├── components/              # Reusable UI Components
│   │   ├── Banner.jsx
│   │   ├── CustomerReviews.jsx
│   │   ├── FeaturedProperties.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── RecentlyAdded.jsx
│   │   ├── RentalStatistics.jsx
│   │   ├── TopLocations.jsx
│   │   └── WhyChooseUs.jsx
│   │
│   └── lib/                     # Utilities & Configurations
│       ├── auth-client.js
│       ├── auth.js
│       └── stripe.js
│
├── .env.local                   # Environment variables
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── package.json                 # Dependencies and scripts
```

## ✨ Key Features

### 🔐 Authentication & Authorization

* JWT Authentication
* Email & Password Login
* Google Social Login
* Role-Based Access Control (Tenant, Owner, Admin)
* Protected Routes & APIs

### 🏡 Property Management

* Add New Property
* Update Property
* Delete Property
* Property Approval/Rejection System
* Property Search & Filtering
* Backend Sorting & Pagination

### ❤️ Favorites System

* Add Property to Favorites
* View Favorite Properties
* Remove Favorite Properties

### 📅 Booking System

* Book Property with Modal Form
* Move-in Date Selection
* Booking Status Tracking
* Owner Approval/Rejection Workflow

### 💳 Secure Payment

* Stripe Payment Integration
* Transaction Recording
* Booking Confirmation After Payment
* Payment Status Management

### ⭐ Review System

* Property Rating
* User Reviews
* Dynamic Review Display

### 📊 Owner Dashboard

* Total Earnings Analytics
* Total Properties Overview
* Total Bookings Overview
* Monthly Earnings Chart (Recharts)
* Property Management
* Booking Requests Management

### 🛠️ Admin Dashboard

* Manage Users
* Change User Roles
* Manage Properties
* Approve/Reject Properties
* Manage Bookings
* Monitor Transactions

### 🎨 User Experience

* Fully Responsive Design
* Framer Motion Animations
* Loading States
* Custom Error Pages
* Modern Dashboard UI
* Clean & Professional Design

---

## 🧰 Technologies Used

### Frontend

* React.js
* Next.js
* Tailwind CSS
* DaisyUI
* Framer Motion
* Axios
* React Hook Form
* React Icons
* Recharts
* SweetAlert2
* Stripe React SDK

### Backend

* Node.js
* Express.js
* MongoDB
* JWT
* Stripe API
* CORS
* dotenv

---

## 📌 Main Functionalities

### Tenant

* Browse Properties
* Search & Filter Properties
* Add to Favorites
* Book Properties
* Make Payments
* Write Reviews
* Manage Profile

### Owner

* Add Properties
* Manage Properties
* View Booking Requests
* Approve/Reject Bookings
* View Earnings Analytics

### Admin

* Manage Users
* Manage Properties
* Manage Bookings
* Monitor Transactions
* Assign Roles

---

## 🔒 Environment Variables

### Client

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key
```

### Server

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## 📦 NPM Packages Used

### Frontend Packages

```bash
axios
react-hook-form
react-icons
framer-motion
sweetalert2
recharts
@stripe/react-stripe-js
@stripe/stripe-js
```

### Backend Packages

```bash
express
mongodb
jsonwebtoken
cors
dotenv
stripe
```

---

## 🚀 Installation & Setup

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Run Client

```bash
npm run dev
```

### Run Server

```bash
npm start
```

---

## 👨‍💻 Developer

**Abdullah Al Afjal**

* B.Sc. in Computer Science & Engineering
* Daffodil International University

---

## 📄 License

This project is developed for educational and portfolio purposes.
