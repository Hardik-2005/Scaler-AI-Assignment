import { requireAuth } from '@clerk/express';

// Middleware to protect routes via Clerk
// Will reject with 401 if no valid token in 'Authorization: Bearer <t>'
export const requireLogin = requireAuth();
