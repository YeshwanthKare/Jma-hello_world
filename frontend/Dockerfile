# Use the Nginx image
FROM nginx:alpine

# Create a non-root user and group
RUN addgroup -S jma && adduser -S jma_app_user -G jma

# Copy frontend files into the Nginx directory
COPY . /usr/share/nginx/html

# Change ownership of the Nginx files to the new user
RUN chown -R jma_app_user:jma /usr/share/nginx/html

# Switch to the non-root user
USER jma_app_user

# Expose the Nginx port
EXPOSE 80


