# ---- Stage 1: Build ----
# Installs all dependencies and builds the React client with Vite.
FROM oven/bun:latest AS builder

WORKDIR /app

COPY package*.json bun.lock* ./
RUN bun install

COPY . .
RUN bun run build

# ---- Stage 2: Runner ----
# Lean production image — only production bun modules and built assets.
FROM oven/bun:latest AS runner

WORKDIR /app

COPY package*.json bun.lock* ./
RUN bun install --production

# Copy server source (bun runs it directly at startup)
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

CMD ["bun", "./src/server/index.ts"]
