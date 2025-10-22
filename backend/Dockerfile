# Multi-stage Dockerfile for Node + TypeScript
# Builder: install deps (including dev), compile TypeScript to /app/dist
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install all dependencies (including devDeps for tsc)
RUN npm install

# Copy source and tsconfig
COPY tsconfig.json ./
COPY src ./src

# Compile TypeScript to /app/dist
RUN npx tsc -p .

# Final image: runtime-only, smaller
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only production dependencies
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

# Copy compiled files
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

# If your app uses a different port, override with PORT env var
EXPOSE 3000

# Start the compiled server
CMD ["node", "dist/server.js"]
