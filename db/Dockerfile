FROM postgres:13-alpine
WORKDIR /wrdrb/db
COPY . .

# Creates wrdrb user and table
ENV POSTGRES_USER=wrdrb

# Create tables and seed database on startup
RUN cat ./setup.sql ./seed.sql > /docker-entrypoint-initdb.d/setup.sql

# TODO Insecure, but convenient for showcasing
ENV POSTGRES_HOST_AUTH_METHOD=trust

# Add VOLUMEs to allow backup of config, logs and databases
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

EXPOSE 5432
CMD ["postgres"]