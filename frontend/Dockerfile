# ======================== OLD DOCKER FILE========================
# ./frontend/Dockerfile
FROM nginx:alpine

# Copy the build files to Nginx's default directory
COPY build /usr/share/nginx/html

#=================new===============
# Set Nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf