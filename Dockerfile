FROM angular/ngcontainer

USER root

# Update and install required packages
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    python3 \
    npm

# Optional: link python2 to python3 if legacy tools require it
RUN ln -sf /usr/bin/python3 /usr/bin/python2

# Install global NPM tools
RUN npm install -g \
    @angular/cli@7.2.2 \
    semver \
    n

# Use Node.js version 18.19.0
RUN n 18.19.0

# Set working directory and copy project files
WORKDIR /app
COPY . .

# Install local dependencies
RUN npm install && \
    npm install @mapbox/whoots-js

# Expose Angular dev server port
EXPOSE 4200

# Run Angular dev server
CMD ["ng", "serve", "--host", "0.0.0.0"]
