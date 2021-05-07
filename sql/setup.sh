#!/bin/sh
# A short script to setup a PostgreSQL database for the wrdrb project.
# This will create all the necessary users, tables, and seed data.

echo_usage() {
  echo "Usage: $0 [-h|--help] [setup|drop|reset]"
  echo "Sets up the wrdrb database."
  echo
  echo "setup - Creates the user, database and adds all seed data needed for the"
  echo "application."
  echo "drop - Deletes all database data related to wrdrb. Irreversible."
  echo "reset - Deletes all database data and runs setup again. The same as running"
  echo "setup and drop in succession."
}

enclosing_folder="$(cd "$(dirname $0)" && pwd)/"

init_sql="$enclosing_folder/init.sql"
setup_sql="$enclosing_folder/setup.sql"
seed_sql="$enclosing_folder/seed.sql"
drop_sql="$enclosing_folder/drop.sql"

setup_db() {
  psql -f "$init_sql" && \
  psql -U wrdrb -f "$setup_sql" -f "$seed_sql"
}

drop_db() {
  psql -f "$drop_sql"
}

if [ "$#" -eq "0" ] || [ "$#" -eq "1" -a "$1" = "setup" ]; then
  # Default behavior. Setup the database.
  setup_db
  exit 0
fi

if [ "$#" -eq "1" ] && [ "$1" = "drop" ]; then
  # Drops the database, deleting all data.
  drop_db
  exit 0
fi

if [ "$#" -eq "1" ] && [ "$1" = "reset" ]; then
  # Drops the database and sets it back up again.
  drop_db
  setup_db
  exit 0
fi

echo_usage
exit 1
