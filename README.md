# Dine Together

A modern, full-stack web application designed for group meal ordering in a restaurant setting, built with **Next.js 16** and **MongoDB**. This system allows staff to manage table sessions through a dashboard and enables customers to order items by scanning a QR code assigned to their specific table.

## 💻 How to Demo

### 1. The Staff Dashboard (Admin View)

_Access the hidden management interfaces used by restaurant staff._

- **Table Manager:** [https://dinetogether.vercel.app/table](https://dinetogether.vercel.app/table) - Use this to view and manage active tables and generate QR sessions.
- **Kitchen Display System:** [https://dinetogether.vercel.app/orders](https://dinetogether.vercel.app/orders) - Watch incoming orders appear here.

### 2. The Customer View

_Simulate a customer scanning a QR code for "Table 3"._

- **Mobile Menu:** [Live Customer Demo Link](https://dinetogether.vercel.app/menu?sessionId=6947a8e16a882fae9384c37a&table=3) - Add items here and watch them appear as incoming order instantly.

---

## 🚀 Features

- **Table Management Dashboard**: A centralized view for staff to monitor occupied tables, track active sessions, and open new table sessions.
- **QR Code Session Integration**: Generates a unique QR code for each table session which, when scanned, directs customers to the menu with their session ID and table number pre-configured.
- **Dynamic Menu System**: A categorized menu fetching data directly from the database, featuring items like meats and vegetables.
- **Interactive Ordering Experience**:
  - Real-time cart management including adding/removing items.
  - Visual order confirmation and tracking.
- **Automated Database Seeding**: Includes a pre-configured script to populate the menu with initial items such as "หมูสันนอก" (Pork Loin) and "เต้าหู้" (Tofu).
- **Type-Safe APIs**: Utilizes Zod for request validation across order creation and session management endpoints.

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS 4, Framer Motion, and Lucide React icons.
- **Database**: MongoDB with Mongoose ODM.
- **State Management**: TanStack React Query v5.
- **Data Validation**: Zod.
- **Runtime/Tooling**: Bun/TSX.

## ⚙️ Configuration

### Environment Variables

The application requires the following environment variable to be set in a `.env.local` file:

- `MONGODB_URI`: Your MongoDB connection string.

## 📂 Project Structure

- `app/table/`: Implementation of the staff-facing table session dashboard.
- `app/menu/`: Client-side menu and cart components for customer ordering.
- `app/api/`: Backend routes for handling `orders` and `sessions`.
- `lib/seedMenu.ts`: Utility for populating the database with initial menu data.
- `shared/schemas/`: Shared Zod schemas for consistent validation between the client and server.

## 📜 Available Scripts

Run these commands using your preferred package manager (e.g., `bun` or `npm`):

- `dev`: Starts the development server.
- `build`: Creates a production build.
- `start`: Launches the production server.
- `lint`: Runs ESLint to check for code quality.
- `seed`: Populates the MongoDB database with initial menu data using `.env.local`.
- `test`: Runs tests to check the code integrity.
