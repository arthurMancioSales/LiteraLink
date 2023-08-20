FROM node:latest

WORKDIR /app

COPY . .

RUN npm ci

RUN npx --yes next-ws-cli patch -y

RUN npm run build

USER root

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

CMD ["npm", "run", "start"]