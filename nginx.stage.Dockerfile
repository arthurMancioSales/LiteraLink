FROM nginx:latest

COPY nginx.stage.conf /etc/nginx/nginx.conf
COPY ./literalink.crt /ssl/literalink.crt
COPY ./literalink.key /ssl/literalink.key

EXPOSE 443