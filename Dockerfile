FROM node:12.16.0

WORKDIR /usr/src

COPY ./pages /usr/src
COPY ./prisma /usr/src/
COPY ./public /usr/src/
COPY ./styles /usr/src/
COPY app.json /usr/src/
COPY .eslintrc /usr/src/
COPY next-env.d.ts /usr/src/
COPY next.config.js /usr/src/
COPY postcss.config.js /usr/src/
COPY tailwind.config.js /usr/src/
COPY tsconfig.json /usr/src/
COPY package*.json /usr/src/
# RUN npm install -g npx
# RUN npm prisma generate
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]