# ==========================================
# Stage 1 - Build React Application
# ==========================================

FROM node:22-alpine AS build

WORKDIR /app

# React/Vite environment variables
ARG VITE_IDENTITY_API_URL
ARG VITE_CUSTOMER_API_URL

ENV VITE_IDENTITY_API_URL=$VITE_IDENTITY_API_URL
ENV VITE_CUSTOMER_API_URL=$VITE_CUSTOMER_API_URL

# Install dependencies
COPY package*.json ./

RUN npm ci

# Copy application source
COPY . .

# Build React application
RUN npm run build


# ==========================================
# Stage 2 - Nginx
# ==========================================

FROM nginx:alpine AS production

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]