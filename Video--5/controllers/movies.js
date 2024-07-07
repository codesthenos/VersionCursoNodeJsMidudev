import { validateNewMovie, validatePartialMovie } from '../MovieStructure/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { director, rate } = req.query
    const movies = await this.movieModel.getAll({ director, rate })
    return res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)
    return res.status(404).json({ message: 'Movie not found' })
  }

  getByGenre = async (req, res) => {
    const { genre } = req.params
    const movies = await this.movieModel.getByGenre({ genre })
    if (movies) return res.json(movies)
    return res.status(404).json({ message: 'Genre not found' })
  }

  create = async (req, res) => {
    const result = validateNewMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await this.movieModel.create({ input: result.data })
    return res.status(201).json(newMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const isMovieDeleted = await this.movieModel.delete({ id })
    if (isMovieDeleted) return res.json({ message: 'Movie deleted' })
    return res.status(404).json({ message: 'Movie not found' })
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updatedMovie = await this.movieModel.update({ id, input: result.data })

    if (updatedMovie) {
      return res.json(updatedMovie)
    }

    return res.status(404).json({ message: 'Movie to update not found' })
  }
}
