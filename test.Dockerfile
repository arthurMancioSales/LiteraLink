FROM node:18

WORKDIR /app

COPY . ./
RUN npm i
RUN npx --yes next-ws-cli patch -y


CMD ["bash", "-c", "/app/src/utils/integrationTest.sh"]