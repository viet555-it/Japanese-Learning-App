FROM node:20-alpine

# Cài đặt các công cụ cần thiết để build các thư viện native như bcrypt
RUN apk add --no-cache make gcc g++ python3

WORKDIR /app

# Copy package files
COPY package*.json ./

# Cài đặt dependencies (dùng install thay cho ci nếu lockfile bị xung đột môi trường)
RUN npm install --production

# Copy source code
COPY src/ ./src/

EXPOSE 3000

CMD ["node", "src/server.js"]
