FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install openssl which is required by Prisma on alpine
RUN apk add --no-cache openssl

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the backend codebase
COPY . .

# Expose Express port
EXPOSE 5000

# We let docker-compose handle the exact start command to include db push and seeding
CMD ["npm", "run", "dev"]
