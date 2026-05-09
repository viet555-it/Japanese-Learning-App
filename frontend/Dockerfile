# Stage 1: Build React app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

# Nhận biến từ docker-compose
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_API_URL
ARG VITE_FB_APP_ID

# Export thành biến môi trường để Vite thấy lúc build
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_FB_APP_ID=$VITE_FB_APP_ID

# Copy toàn bộ source (bao gồm .env.production)
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Serve bằng Nginx
FROM nginx:alpine

# Copy dist từ stage build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config để handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
