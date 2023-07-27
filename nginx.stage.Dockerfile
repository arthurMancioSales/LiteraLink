FROM nginx:1.23.3-alpine

COPY nginx.stage.conf /etc/nginx/nginx.conf
COPY ./literalink.crt /ssl
COPY ./literalink.key /ssl

EXPOSE 80
EXPOSE 443