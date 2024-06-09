import { Router } from 'express'
import { randomUUID } from 'node:crypto'

import { validateNewMovie, validatePartialMovie } from './../MovieStructure/movies.js'

import { readJSON } from './../utils.js'

const moviesJSON = readJSON('./movies.json')

export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
  const { director, rate } = req.query
  if (director) {
    const filmsByDirectorJSON = moviesJSON.filter(filmJSON => filmJSON.director.toLowerCase() === director.toLocaleLowerCase())
    if (filmsByDirectorJSON.length > 0) {
      if (rate) {
        const filmsByDirectorAndRateJSON = filmsByDirectorJSON.filter(filmJSON => filmJSON.rate > rate)
        if (filmsByDirectorAndRateJSON.length > 0) return res.json(filmsByDirectorAndRateJSON)
        res.status(404).send({ message: 'Director found but not rating match' })
      }
      return res.json(filmsByDirectorJSON)
    }
    res.status(404).send({ message: 'Director not found' })
  }

  if (rate) {
    const filmsByRate = moviesJSON.filter(filmJSON => filmJSON.rate > rate)
    if (filmsByRate.length > 0) return res.json(filmsByRate)
    res.status(404).send({ message: 'No rating match' })
  }

  res.json(moviesJSON)
})

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const filmJSON = moviesJSON.find(filmJSON => filmJSON.id === id)
  if (filmJSON) return res.json(filmJSON)
  res.status(404).send({ message: '404' })
})

moviesRouter.get('/genre/:genre', (req, res) => {
  const { genre } = req.params
  const filmsByGenreJSON = moviesJSON.filter(filmJSON => filmJSON.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()))
  if (filmsByGenreJSON.length > 0) return res.json(filmsByGenreJSON)
  res.status(404).send({ message: 'Genre not found' })
})

moviesRouter.post('/', (req, res) => {
  const result = validateNewMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: randomUUID(),
    ...result.data
  }

  moviesJSON.push(newMovie)
  res.status(201).json(newMovie)
})

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = moviesJSON.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  moviesJSON.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

moviesRouter.patch('/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(404).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = moviesJSON.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...moviesJSON[movieIndex],
    ...result.data
  }

  moviesJSON[movieIndex] = updateMovie

  return res.json(updateMovie)
})
