FROM node:18
WORKDIR /usr/src/
COPY ./front/build ./front/build
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./prisma ./prisma
COPY ./.env ./.env
COPY ./index.js ./index.js
RUN npm install
RUN npm run prisma
EXPOSE 8888
CMD ["npm", "start"]
