# Use a specific Node.js version base image
FROM node:18-alpine

# Create a non-root user and group
RUN addgroup -S jma && \
    adduser -S jma_app_user -G jma && \
    id jma_app_user

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --unsafe-perm=true

# Copy the rest of the application code
COPY . .

# Change ownership of the application files to the new user
RUN chown -R jma_app_user:jma /app

# Switch to the non-root user
USER jma_app_user

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
