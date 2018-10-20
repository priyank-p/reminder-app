FROM node:10

ENV NODE_ENV production
ENV PORT 7000

WORKDIR /reminder-app
COPY . /reminder-app
RUN node scripts/install --non-interactive
CMD  node scripts/start && npx pm2 logs reminder-app

EXPOSE 7000
