#!/bin/sh
# A short script to setup a PostgreSQL database for the wrdrb project.
# This will create all the necessary users, tables, and seed data.

enclosing_folder="$(cd "$(dirname $0)" && pwd)/"

init_sql="$enclosing_folder/init.sql"
setup_sql="$enclosing_folder/setup.sql"
seed_sql="$enclosing_folder/seed.sql"

psql -f "$init_sql" && \
psql -U wrdrb -f "$setup_sql" -f "$seed_sql"
