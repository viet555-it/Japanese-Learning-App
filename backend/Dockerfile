FROM node:20-alpine

WORKDIR /app

# Copy package files trước để tận dụng Docker layer caching
COPY package*.json ./

# Chỉ cài production dependencies
RUN npm ci --omit=dev

# Copy source code
COPY src/ ./src/

EXPOSE 3000

CMD ["node", "src/server.js"]
