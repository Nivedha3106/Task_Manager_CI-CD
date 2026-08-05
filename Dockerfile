# ==========================================
# STAGE 1: The Build Environment
# ==========================================
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package management files first to maximize Docker caching efficiency
COPY package*.json ./

# Clean install all dependencies (including devDependencies like Jest)
RUN npm ci

# Copy the rest of your application code
COPY . .

# Run your automated test suite to ensure broken code never gets containerized
RUN npm test

# Prune devDependencies so only production modules remain
RUN npm prune --production


# ==========================================
# STAGE 2: The Production Image
# ==========================================
FROM node:20-alpine AS runner

# Set production environment variables
ENV NODE_ENV=production
WORKDIR /app

# Copy only the necessary production files from Stage 1
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/app.js ./app.js
COPY --from=builder /app/public ./public

# Expose port 3000 to allow traffic into the container
EXPOSE 3000

# Run the application directly using node
CMD ["node", "app.js"]
