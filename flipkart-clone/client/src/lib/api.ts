import axios from "axios";

// Standard Axios Instance for unauthorized API Routes
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Create a function that injects the Clerk token on the fly
// Call this specifically when communicating with protected backend routes
export const getAuthApi = async (getToken: () => Promise<string | null>) => {
  const token = await getToken();
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};