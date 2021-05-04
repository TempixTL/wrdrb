CREATE USER wrdrb WITH PASSWORD 'password';
CREATE DATABASE wrdrb_database WITH OWNER=wrdrb;

CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  username varchar(20) NOT NULL,
  password varchar(200) NOT NULL
);