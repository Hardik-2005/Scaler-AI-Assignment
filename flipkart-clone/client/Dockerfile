FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose Next.js port
EXPOSE 3000

# Run in dev mode for hot-reloading
CMD ["npm", "run", "dev"]
