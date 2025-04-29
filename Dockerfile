# Base Image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --force

# Copy rest of the application code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3333

# Start the app
CMD ["npm", "run", "dev"]
