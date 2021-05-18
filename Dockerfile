FROM node:14-alpine AS client
WORKDIR /wrdrb/client
COPY ./client/ .
RUN npm install
RUN npm run build

FROM mozilla/sbt:8u232_1.4.5 AS server
WORKDIR /wrdrb/server
COPY ./server/ .
COPY --from=client /wrdrb/client/dist/* /wrdrb/server/public/javascript/
RUN sbt compile

# Set server database url to PostgreSQL Docker container
ENV JDBC_DATABASE_URL=jdbc:postgresql://db/wrdrb?user=wrdrb

EXPOSE 9000
CMD ["sbt", "run"]