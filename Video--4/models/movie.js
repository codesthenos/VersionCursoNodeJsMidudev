import { randomUUID } from 'node:crypto'

import { readJSON } from './../utils.js'

const moviesJSON = readJSON('./movies.json')

export class MovieModel {
  static async getAll ({ director, rate }) {
    if (director) {
      const filmsByDirectorJSON = moviesJSON.filter(filmJSON => filmJSON.director.toLowerCase() === director.toLocaleLowerCase())
      if (filmsByDirectorJSON.length > 0) {
        if (rate) {
          return filmsByDirectorJSON.filter(filmJSON => filmJSON.rate >= rate)
        }
        return filmsByDirectorJSON
      }
    }

    if (rate && rate > 0 && rate < 10) {
      return moviesJSON.filter(filmJSON => filmJSON.rate >= rate)
    }

    return moviesJSON
  }

  static async getById ({ id }) {
    return moviesJSON.find(filmJSON => filmJSON.id === id)
  }

  static async getByGenre ({ genre }) {
    const movies = moviesJSON.filter(filmJSON => filmJSON.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()))
    if (movies.length > 0) return movies
    return false
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
