FROM node:18.19.0-bullseye

# Set working directory
WORKDIR /app

# Install required packages
RUN apt-get update && \
    apt-get install -y curl python3 && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Copy project files
COPY . .

# Install dependencies
RUN npm install -g @angular/cli@7.2.2 semver \
    && npm install \
    && npm install @mapbox/whoots-js --save

# Expose the Angular default port
EXPOSE 4200

# Run the Angular dev server
CMD ["ng", "serve", "--host", "0.0.0.0"]
