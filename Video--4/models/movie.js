import { randomUUID } from 'node:crypto'

import { readJSON } from './../utils.js'

const moviesJSON = readJSON('./movies.json')

export class MovieModel {
  static async getAll ({ director, rate }) {
    if (director) {
      const filmsByDirectorJSON = moviesJSON.filter(filmJSON => filmJSON.director.toLowerCase() === director.toLocaleLowerCase())
      if (rate) {
        return filmsByDirectorJSON.filter(filmJSON => filmJSON.rate > rate)
      }
      return filmsByDirectorJSON
    }

    if (rate) {
      return moviesJSON.filter(filmJSON => filmJSON.rate > rate)
    }

    return moviesJSON
  }

  static async getById ({ id }) {
    if (id) {
      return moviesJSON.find(filmJSON => filmJSON.id === id)
    }

    return moviesJSON
  }

  static async getByGenre ({ genre }) {
    if (genre) {
      return moviesJSON.filter(filmJSON => filmJSON.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()))
    }

    return moviesJSON
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    moviesJSON.push(newMovie)

    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = moviesJSON.findIndex(movie => movie.id === id)
    if (movieIndex === -1) {
      return false
    }

    moviesJSON.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = moviesJSON.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    moviesJSON[movieIndex] = {
      ...moviesJSON[movieIndex],
      ...input
    }

    return moviesJSON[movieIndex]
  }
}
