FROM node:alpine

# Create a non-root user and group
RUN addgroup -S jma && adduser -S jma_app_user -G jma

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY backend .

# Change ownership of the application files to the new user
RUN chown -R jma_app_user:jma .

# Switch to the non-root user
USER jma_app_user

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
