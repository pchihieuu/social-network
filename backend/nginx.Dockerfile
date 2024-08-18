FROM nginx:alpine as nginx

#WORKDIR /app


COPY config/nginx.conf /etc/nginx/nginx.conf