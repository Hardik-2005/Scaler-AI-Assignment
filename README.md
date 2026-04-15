# Flipkart Clone

## Project Overview
This is a full-stack, responsive Flipkart clone designed with modern web technologies, simulating real-world e-commerce interactions. Features include secure authentication, a robust shopping cart, seamless checkout flow with email confirmations, and a stylized, component-driven frontend architecture.

## Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS, Zustand, UI Components (shadcn)
- **Backend:** Node.js, Express.js
- **Database:** Prisma ORM with MySQL
- **Authentication:** Clerk
- **Notifications:** EmailJS

## Setup Instructions
1. Clone the repository.
2. Install dependencies for the root, **client** and **server** directories using \
pm install\.
3. Create your local \.env\ files based on the provided \.env.example\ structures.
4. Run Prisma schema generation using \
px prisma db push\ and \
px prisma generate\.
5. Start the backend: \cd server && npm run dev\`n6. Start the frontend: \cd client && npm run dev\`n
## Screenshots
_(Placeholders for screenshots)_
- [Home Page]()
- [Product Display Dashboard]()
- [Cart & Checkout View]()

## Deployment Notes
Ensure your Clerk, EmailJS, and Database production URLs are loaded properly into your production environment variables (e.g., Vercel, Render, Railway, or Heroku).
