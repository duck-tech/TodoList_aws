FROM node:latest

COPY . /workspace
WORKDIR /workspace
RUN npm install

EXPOSE 3000

RUN npx sequelize db:migrate
CMD npm start 