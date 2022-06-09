FROM node:latest

COPY . /workspace
WORKDIR /workspace
RUN npm install
RUN npx sequelize db:migrate

EXPOSE 3000

CMD npm start 