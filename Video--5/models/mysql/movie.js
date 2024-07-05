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
    const result = await connection.query(
      'SELECT * FROM movie'
    )

    console.log(result)
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
