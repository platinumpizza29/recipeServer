# Base image with Bun
FROM oven/bun

# Working directory
WORKDIR /app

# Copy package.json, bun.lockb, and .env (if using environment variables)
COPY package*.json bun.lockb .env ./

# Install dependencies (excluding devDependencies)
RUN bun install --production

# Copy prisma schema (if you use Prisma)
COPY prisma ./prisma

# Optional steps based on your project:
# 1. Generate Prisma Client outside container (recommended)
# -----------------------------------------------------
# FROM node:18-alpine AS generate
# WORKDIR /app
# COPY package*.json bun.lockb .prisma ./
# RUN bun install --global @prisma/client
# RUN bunx prisma generate --output=.
# ... (copy generated client files to final image)

# 2. Build frontend assets (if applicable)
# -----------------------------------------------------
# RUN npm run build # Replace with your build command

# Expose the port (if needed)
EXPOSE 3000

# Start command
CMD ["bun", "start"]

# Recommendations:
# - For production, replace "development" with "production" in your .env file (if applicable).
# - Customize the final CMD command to match your app's entry point.
# - Consider a .dockerignore file to exclude unnecessary files from the image.
# - Use environment variables in your code to access values from .env (e.g., `process.env.DATABASE_URL`).

