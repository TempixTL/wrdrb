\c wrdrb;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username varchar(20) NOT NULL,
  password varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS colors (
  id SERIAL PRIMARY KEY,
  name varchar(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS clothing_types (
  id SERIAL PRIMARY KEY,
  name varchar(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS weather_conditions (
  id SERIAL PRIMARY KEY,
  name varchar(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
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

CREATE TABLE IF NOT EXISTS outfits (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  outfit_date timestamp,
  image bytea,
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
      REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS outfits_articles (
  outfit_id INT NOT NULL,
  article_id INT NOT NULL,
  CONSTRAINT fk_outfit_id
    FOREIGN KEY(outfit_id)
      REFERENCES outfits(id)
        ON DELETE CASCADE,
  CONSTRAINT fk_article_id
    FOREIGN KEY(article_id)
      REFERENCES articles(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bins (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  name varchar(100) NOT NULL,
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
      REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS articles_bins (
  bin_id INT NOT NULL,
  article_id INT NOT NULL,
  CONSTRAINT fk_bin_id
    FOREIGN KEY(bin_id)
      REFERENCES bins(id)
        ON DELETE CASCADE,
  CONSTRAINT fk_article_id
    FOREIGN KEY(article_id)
      REFERENCES articles(id)
        ON DELETE CASCADE
);
