USE moviesdb;

SELECT movie.title, GROUP_CONCAT(genre.name SEPARATOR ', ') AS list_of_genres FROM movie_genre
JOIN movie ON movie.id = movie_genre.movie_id
JOIN genre ON genre.id = movie_genre.genre_id
GROUP BY movie.title;