USE moviesdb;

INSERT
INTO genre (name)
VALUES ('Drama'),
	('Action'),
    ('Crime'),
    ('Adventure'),
    ('Sci-Fi'),
    ('Romance'),
    ('Horror');

ALTER TABLE moviesdb
MODIFY COLUMN rate DECIMAL(3,1) NOT NULL;

INSERT
INTO movie (id, title, year, director, duration, poster, rate)
VALUES (UUID_TO_BIN(UUID()), 'Slasher', 2022, 'Alberto Armas', 101, 'https://pics.filmaffinity.com/Slasher-171881556-large.jpg', 10),
	(UUID_TO_BIN(UUID()), 'The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 9.3),
    (UUID_TO_BIN(UUID()), 'The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 9.0),
    (UUID_TO_BIN(UUID()), 'Inception', 2010, 'Christopher Nolan', 148, 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 8.8),
    (UUID_TO_BIN(UUID()), 'Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 8.9),
    (UUID_TO_BIN(UUID()), 'Forrest Gump', 1994, 'Robert Zemeckis', 142, 'https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg', 8.8),
    (UUID_TO_BIN(UUID()), 'Gladiator', 2000, 'Ridley Scott', 155, 'https://img.fruugo.com/product/0/60/14417600_max.jpg', 8.5);

INSERT 
INTO movie_genre (movie_id, genre_id)
VALUES ((SELECT id FROM movie WHERE title = 'Slasher'), (SELECT id FROM genre WHERE name = 'Horror')),
	((SELECT id FROM movie WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Action')),
    ((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Crime')),
    ((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Action')),
    ((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
    ((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Adventure')),
    ((SELECT id FROM movie WHERE title = 'Pulp Fiction'), (SELECT id FROM genre WHERE name = 'Crime')),
    ((SELECT id FROM movie WHERE title = 'Pulp Fiction'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM movie WHERE title = 'Forrest Gump'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM movie WHERE title = 'Forrest Gump'), (SELECT id FROM genre WHERE name = 'Romance')),
    ((SELECT id FROM movie WHERE title = 'Gladiator'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM movie WHERE title = 'Gladiator'), (SELECT id FROM genre WHERE name = 'Adventure')),
    ((SELECT id FROM movie WHERE title = 'Gladiator'), (SELECT id FROM genre WHERE name = 'Action'));