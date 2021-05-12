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
), (
  -- This will have ID 3, and so on...
  (SELECT id FROM users WHERE username = 'wrdrb'),
  'Mark Lewis Vuitton',
  'Testing Material',
  null,
  (SELECT id from clothing_types WHERE name = 'HAT'),
  (SELECT id from weather_conditions WHERE name = 'SUN')
), (
  (SELECT id FROM users WHERE username = 'wrdrb'),
  'The North Fogarty',
  'Testing Material',
  null,
  (SELECT id from clothing_types WHERE name = 'PANTS'),
  null
), (
  (SELECT id FROM users WHERE username = 'wrdrb'),
  'Steve Madsingill',
  'Testing Material',
  null,
  (SELECT id from clothing_types WHERE name = 'SHOES'),
  null
), (
  (SELECT id FROM users WHERE username = 'wrdrb'),
  'Tommy Hickfinger',
  'Testing Material',
  null,
  (SELECT id from clothing_types WHERE name = 'SHIRT'),
  null
);

INSERT INTO outfits (
  user_id,
  outfit_date
) VALUES (
  -- This will have ID 1
  (SELECT id FROM users WHERE username = 'wrdrb'),
  '2021-05-07 13:00:00-05'
), (
  -- This will have ID 2
  (SELECT id FROM users WHERE username = 'wrdrb'),
  '2021-05-12 19:00:00-05'
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
  'Trinity CS Inspo'
), (
  -- This will have ID 2
  (SELECT id FROM users WHERE username = 'wrdrb'),
  'Another Bin'
);

INSERT INTO articles_bins (
  bin_id,
  article_id
) VALUES (
  1, 3
), (
  1, 4
), (
  1, 5
), (
  1, 6
), (
  2, 1
), (
  2, 2
);
