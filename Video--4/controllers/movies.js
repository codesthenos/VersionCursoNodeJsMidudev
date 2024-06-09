import { MovieModel } from '../models/movie.js'
import { validateNewMovie, validatePartialMovie } from '../MovieStructure/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { director, rate } = req.query
    const movies = await MovieModel.getAll({ director, rate })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    res.json(movie)
  }

  static async getByGenre (req, res) {
    const { genre } = req.params
    const movies = await MovieModel.getByGenre({ genre })
    res.json(movies)
  }

  static async create (req, res) {
    const result = validateNewMovie(req.body)
    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201)
    res.json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const isMovieDeleted = await MovieModel.delete({ id })
    res.json({ message: `Movie deleted = ${isMovieDeleted}` })
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validatePartialMovie(req.body)
    const updatedMovie = await MovieModel.update({ id, input: result.data })
    res.json(updatedMovie)
  }
}
