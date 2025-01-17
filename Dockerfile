# Stage 1: Build the React app
FROM node:16 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine

# Copy build files to Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx configuration
COPY default.conf /etc/nginx/conf.d/
