import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'SECRET',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ director, rate }) {
    let query = 'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie'
    const queryParams = []

    if (director || (rate && rate > 0 && rate <= 10)) {
      query += ' WHERE'

      if (director) {
        query += ' LOWER(director) LIKE ?'
        queryParams.push(`%${director.toLowerCase()}%`)
      }

      if (rate && rate > 0 && rate <= 10) {
        if (director) query += ' AND'
        query += ' rate >= ?;'
        queryParams.push(rate)
      }
    }

    let [result] = await connection.query(query, queryParams)

    if (result.length > 0) {
      return result
    }

    [result] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;')

    return result
  }

  static async getById ({ id }) {
    let [result] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate
        FROM movie WHERE id = UUID_TO_BIN(?);`, [id]
    )

    if (result.length > 0) {
      return result
    }

    [result] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;')

    return result
  }

  static async getByGenre ({ genre }) {
    let [result] = await connection.query(
      `SELECT BIN_TO_UUID(movie.id) id, movie.title, movie.year, movie.director, movie.duration, movie.poster, movie.rate FROM movie 
       JOIN movie_genre ON movie.id = movie_genre.movie_id 
       JOIN genre ON movie_genre.genre_id = genre.id
       WHERE genre.name = ?;`, [genre]
    )

    if (result.length > 0) {
      return result
    }

    [result] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;')

    return result
  }

  static async create ({ input }) {
    const {
      title,
      year,
      duration,
      director,
      poster,
      rate
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      )
    } catch (e) {
      throw new Error('Error creating movie')
      // enviar log del error (e)...
    }

    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie
      WHERE id = UUID_TO_BIN(?);`, [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {
    try {
      await connection.query(
        'DELETE FROM movie WHERE id = UUID_TO_BIN(?);', [id]
      )
    } catch (e) {
      throw new Error('Error deleting the movie')
    }

    return true
  }

  static async update ({ id, input }) {
    const {
      title,
      year,
      duration,
      director,
      poster,
      rate
    } = input

    try {
      const [movie] = await connection.query(
        'SELECT title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
        [id]
      )

      const currentMovie = movie[0]

      const updatedmovie = {
        title: title !== undefined ? title : currentMovie.title,
        year: year !== undefined ? year : currentMovie.year,
        duration: duration !== undefined ? duration : currentMovie.duration,
        director: director !== undefined ? director : currentMovie.director,
        poster: poster !== undefined ? poster : currentMovie.poster,
        rate: rate !== undefined ? rate : currentMovie.rate
      }

      await connection.query(
        'UPDATE movie SET title = ?, year = ?, duration = ?, director = ?, poster = ?, rate = ? WHERE id = UUID_TO_BIN(?);',
        [updatedmovie.title, updatedmovie.year, updatedmovie.duration, updatedmovie.director, updatedmovie.poster, updatedmovie.rate, id]
      )

      return updatedmovie
    } catch (e) {
      throw new Error('Error updating the movie')
    }
  }
}
