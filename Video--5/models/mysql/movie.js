import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'Sara2guille2',
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
        query += ' rate >= ?'
        queryParams.push(rate)
      }
    }

    let [result] = await connection.query(query, queryParams)

    if (result.length > 0) {
      return result
    }

    [result] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie')

    return result
  }

  static async getById ({ id }) {
    let [result] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate
        FROM movie WHERE id = UUID_TO_BIN(?)`, [id]
    )

    if (result.length > 0) {
      return result
    }

    [result] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie')

    return result
  }

  static async getByGenre ({ genre }) {
    let [result] = await connection.query(
      `SELECT BIN_TO_UUID(movie.id) id, movie.title, movie.year, movie.director, movie.duration, movie.poster, movie.rate FROM movie 
       JOIN movie_genre ON movie.id = movie_genre.movie_id 
       JOIN genre ON movie_genre.genre_id = genre.id
       WHERE genre.name = ?`, [genre]
    )

    if (result.length > 0) {
      return result
    }

    [result] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie')

    return result
  }

  static async create ({ input }) {

  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
