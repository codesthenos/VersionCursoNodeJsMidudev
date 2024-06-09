import { MovieModel } from '../models/mongodb/movie.js'
import { validateNewMovie, validatePartialMovie } from '../MovieStructure/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { director, rate } = req.query
    const movies = await MovieModel.getAll({ director, rate })
    return res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    return res.status(404).json({ message: 'Movie not found' })
  }

  static async getByGenre (req, res) {
    const { genre } = req.params
    const movies = await MovieModel.getByGenre({ genre })
    if (movies) return res.json(movies)
    return res.status(404).json({ message: 'Genre not found' })
  }

  static async create (req, res) {
    const result = validateNewMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await MovieModel.create({ input: result.data })
    return res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const isMovieDeleted = await MovieModel.delete({ id })
    if (isMovieDeleted) return res.json({ message: 'Movie deleted' })
    return res.status(404).json({ message: 'Movie not found' })
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, input: result.data })
    if (updatedMovie) return res.json(updatedMovie)
    return res.status(404).json({ message: 'Movie to update not found' })
  }
}
