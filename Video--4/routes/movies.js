import { Router } from 'express'

import { validateNewMovie, validatePartialMovie } from './../MovieStructure/movies.js'
import { MovieModel } from '../models/movie.js'

export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
  const { director, rate } = req.query
  const movies = await MovieModel.getAll({ director, rate })
  res.json(movies)
})

moviesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const movie = await MovieModel.getById({ id })
  res.json(movie)
})

moviesRouter.get('/genre/:genre', async (req, res) => {
  const { genre } = req.params
  const movies = await MovieModel.getByGenre({ genre })
  res.json(movies)
})

moviesRouter.post('/', async (req, res) => {
  const result = validateNewMovie(req.body)
  const newMovie = await MovieModel.create({ input: result.data })
  res.status(201)
  res.json(newMovie)
})

moviesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const isMovieDeleted = await MovieModel.delete({ id })
  res.json({ message: `Movie deleted = ${isMovieDeleted}` })
})

moviesRouter.patch('/:id', async (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)
  const updatedMovie = await MovieModel.update({ id, input: result.data })
  res.json(updatedMovie)
})
