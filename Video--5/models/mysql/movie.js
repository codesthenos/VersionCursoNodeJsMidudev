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
    let query = 'SELECT * FROM movie'
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

    const [result] = await connection.query(query, queryParams)

    return result
  }

  static async getById ({ id }) {

  }

  static async getByGenre ({ genre }) {

  }

  static async create ({ input }) {

  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
