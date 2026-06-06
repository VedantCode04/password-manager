# -------- Build stage --------
FROM node:lts-alpine3.23 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# -------- Runtime stage --------
FROM node:lts-alpine3.23

WORKDIR /app

ENV NODE_ENV=production

# install only production deps
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# copy built output only
COPY --from=builder /app/dist ./dist

# if you need other runtime assets (adjust as needed)
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]