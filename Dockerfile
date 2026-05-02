# ---- Stage 1: Build ----
# Installs all dependencies and builds the React client with Vite.
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Stage 2: Runner ----
# Lean production image — only production node_modules and built assets.
FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Copy server source (tsx runs it directly at startup)
COPY src/server ./src/server
COPY tsconfig.json ./

# The server expects the client build at ./client/dist (see attachClient in server/index.ts).
# Vite defaults to outputting at ./dist, so we map it here.
COPY --from=builder /app/dist ./client/dist

# Run as a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node_modules/.bin/tsx", "./src/server/index.ts"]
