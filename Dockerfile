# ==========================================
# Stage 1 - Build React Application
# ==========================================

FROM node:22-alpine AS build

WORKDIR /app

# Copy package files first
# This allows Docker to cache npm install
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build React application
RUN npm run build


# ==========================================
# Stage 2 - Serve React using Nginx
# ==========================================

FROM nginx:alpine AS production

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy React production build
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]