
CREATE DATABASE moviesdb;

USE moviesdb;

CREATE TABLE movie (
	id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE genre (
	id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE movie_genre (
	movie_id BINARY(16) REFERENCES movies(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id, genre_id)
);
