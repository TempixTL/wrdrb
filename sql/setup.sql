\c wrdrb;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(20) NOT NULL,
  password varchar(200) NOT NULL
);

CREATE TABLE colors (
  id SERIAL PRIMARY KEY,
  name varchar(20) NOT NULL
);

CREATE TABLE clothing_types (
  id SERIAL PRIMARY KEY,
  name varchar(20) NOT NULL
);

CREATE TABLE weather_conditions (
  id SERIAL PRIMARY KEY,
  name varchar(40) NOT NULL
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  brand varchar(100) NOT NULL,
  material varchar(200) NOT NULL,
  color INT,
  clothing_type INT,
  weather_condition INT,
  image bytea,
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
      REFERENCES users(id),
  CONSTRAINT fk_weather_conditions
    FOREIGN KEY(weather_condition)
      REFERENCES weather_conditions(id),
  CONSTRAINT fk_clothing_type
    FOREIGN KEY(clothing_type)
      REFERENCES clothing_types(id),
  CONSTRAINT fk_color
    FOREIGN KEY(color)
      REFERENCES colors(id)
);

CREATE TABLE outfits (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  outfit_date timestamp,
  image bytea,
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
      REFERENCES users(id)
);

CREATE TABLE outfits_articles (
  outfit_id INT NOT NULL,
  article_id INT NOT NULL,
  CONSTRAINT fk_outfit_id
    FOREIGN KEY(outfit_id)
      REFERENCES outfits(id),
  CONSTRAINT fk_article_id
    FOREIGN KEY(article_id)
      REFERENCES articles(id)
);

CREATE TABLE bins (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  name varchar(100) NOT NULL,
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
      REFERENCES users(id)
);

CREATE TABLE articles_bins (
  bin_id INT NOT NULL,
  article_id INT NOT NULL,
  CONSTRAINT fk_bin_id
    FOREIGN KEY(bin_id)
      REFERENCES bins(id),
  CONSTRAINT fk_article_id
    FOREIGN KEY(article_id)
      REFERENCES articles(id)
);
