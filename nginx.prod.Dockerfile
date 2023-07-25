FROM nginx:1.23.3-alpine

COPY nginx.prod.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443