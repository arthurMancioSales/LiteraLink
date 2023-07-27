FROM nginx:1.23.3-alpine

COPY nginx.prod.conf /etc/nginx/nginx.conf
COPY ./literalink.crt /ssl/literalink.crt
COPY ./literalink.key /ssl/literalink.key

EXPOSE 80
EXPOSE 443