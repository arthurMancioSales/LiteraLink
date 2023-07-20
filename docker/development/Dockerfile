FROM node:18-alpine AS base

ENV NEXT_TELEMETRY_DISABLED 1

ENV NODE_ENV development

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE 3000

ENV PORT 3000

WORKDIR /app

CMD ["npm", "run dev"]
