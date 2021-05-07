INSERT INTO users (username, password)
VALUES
  ('wrdrb', 'password'),
  ('tom', 'password'),
  ('ryan', 'password'),
  ('lizzie', 'password'),
  ('alex', 'password');

INSERT INTO colors (name)
VALUES
  ('RED'),
  ('ORANGE'),
  ('YELLOW'),
  ('GREEN'),
  ('BLUE'),
  ('INDIGO'),
  ('VIOLET'),
  ('BLACK'),
  ('WHITE'),
  ('GREY'),
  ('BROWN');

INSERT INTO clothing_types (name)
VALUES
  ('SHIRT'),
  ('PANTS'),
  ('SHOES'),
  ('HAT'),
  ('DRESS'),
  ('SKIRT'),
  ('SHORTS');

INSERT INTO weather_conditions (name)
VALUES
  ('SNOW'),
  ('SUN'),
  ('RAIN'),
  ('WIND');

INSERT INTO articles (
  user_id,
  brand,
  material,
  color,
  clothing_type,
  weather_condition
) VALUES (
  -- This will have ID 1
  (SELECT id FROM users WHERE username = 'wrdrb'),
  'Testing Brand',
  'Testing Material',
  (SELECT id FROM colors WHERE name = 'WHITE'),
  (SELECT id from clothing_types WHERE name = 'SHIRT'),
  (SELECT id from weather_conditions WHERE name = 'SUN')
), (
  -- This will have ID 2
  (SELECT id FROM users WHERE username = 'wrdrb'),
  'Testing Brand',
  'Testing Material',
  (SELECT id FROM colors WHERE name = 'BLACK'),
  (SELECT id from clothing_types WHERE name = 'SHORTS'),
  (SELECT id from weather_conditions WHERE name = 'SUN')
);

INSERT INTO outfits (
  user_id,
  outfit_date
) VALUES (
  -- This will have ID 1
  (SELECT id FROM users WHERE username = 'wrdrb'),
  '2021-05-07 13:00:00-05'
);

INSERT INTO outfits_articles (
  outfit_id,
  article_id
) VALUES (
  -- Outfit 1 and Article 1
  1, 1
), (
  -- Outfit 1 and Article 2
  1, 2
);

INSERT INTO bins (
  user_id,
  name
) VALUES (
  -- This will have ID 1
  (SELECT id FROM users WHERE username = 'wrdrb'),
  'Testing Bin'
);

INSERT INTO articles_bins (
  bin_id,
  article_id
) VALUES (
  1, 1
), (
  1, 2
);
