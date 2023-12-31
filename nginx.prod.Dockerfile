FROM nginx:latest

COPY nginx.prod.conf /etc/nginx/nginx.conf
COPY ./literalink.crt /ssl/literalink.crt
COPY ./literalink.key /ssl/literalink.key

EXPOSE 80
EXPOSE 443