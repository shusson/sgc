# Step 1: Build the Angular application
FROM node:12 AS build

# Set working directory inside container
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN yarn ng build --prod

# Step 2: Set up Nginx to serve the built app
FROM nginx:alpine

# Copy the built Angular app to the Nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Run Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

