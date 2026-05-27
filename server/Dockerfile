# ==========================================
# STAGE 1: Builder & Dependency Installer
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copy package descriptors
COPY package*.json ./

# Install ALL dependencies (including devDependencies for TypeScript compilation)
RUN npm ci

# Copy TypeScript configs and source code
COPY tsconfig.json ./
COPY src/ ./src/

# Compile TypeScript to production JavaScript in /dist
RUN npm run build

# Remove development dependencies, leaving only production dependencies in node_modules
RUN npm prune --production

# ==========================================
# STAGE 2: Secure Distroless Production Runner
# ==========================================
# Google's official highly-secure Distroless image for Node.js 22
FROM gcr.io/distroless/nodejs22-debian12 AS runner

WORKDIR /usr/src/app

# Set Node environment to production
ENV NODE_ENV=production

# Copy production node_modules from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy compiled JavaScript from builder
COPY --from=builder /usr/src/app/dist ./dist

# Expose backend port
EXPOSE 4004

# In Distroless Node.js images, 'node' is the default entrypoint.
# We just pass the path to our compiled JavaScript file to run it directly!
CMD ["dist/server.js"]
