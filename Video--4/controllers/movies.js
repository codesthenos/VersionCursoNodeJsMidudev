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
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async getByGenre (req, res) {
    const { genre } = req.params
    const movies = await MovieModel.getByGenre({ genre })
    if (movies) return res.json(movies)
    res.status(404).json({ message: 'Genre not found' })
  }

  static async create (req, res) {
    const result = validateNewMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
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
