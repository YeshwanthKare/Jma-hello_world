# Use the Nginx image
FROM nginx:alpine

# Create a non-root user and group
RUN addgroup -S jma && adduser -S jma_app_user -G jma

# Create necessary directories with the right permissions
RUN mkdir -p /var/cache/nginx/client_temp /var/run /var/log/nginx \
    && chown -R jma_app_user:jma /var/cache/nginx /var/run /var/log/nginx

# Copy frontend files into the Nginx directory
COPY . /usr/share/nginx/html

# Change ownership of the Nginx files to the new user
RUN chown -R jma_app_user:jma /usr/share/nginx/html

# Expose the Nginx port
EXPOSE 80

# Start Nginx with necessary privileges and allow it to drop them later
CMD ["nginx", "-g", "daemon off;"]
