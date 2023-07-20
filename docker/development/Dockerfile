FROM node:18-alpine AS base

ENV NEXT_TELEMETRY_DISABLED 1

ENV NODE_ENV development

EXPOSE 4000

ENV PORT 4000

WORKDIR /app

CMD ["npm", "run", "dev"]
