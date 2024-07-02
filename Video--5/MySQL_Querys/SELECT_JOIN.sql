USE moviesdb;

SELECT movie.title, genre.name FROM movie_genre
JOIN movie ON movie.id = movie_genre.movie_id
JOIN genre ON genre.id = movie_genre.genre_id;