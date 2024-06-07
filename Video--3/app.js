const express = require('express')

const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3210

const moviesJSON = require('./movies.json')

app.use(express.json())

app.get('/', (req, res) => {
  res.send({ message: 'CODESTHENOS-MOVIES' })
})

app.get('/movies', (req, res) => {
  res.json(moviesJSON)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const filmJSON = moviesJSON.find(filmJSON => filmJSON.id === id)
  if (filmJSON) return res.json(filmJSON)
  res.status(404).send({ message: '404' })
})

app.get('/movies/genre/:genre', (req, res) => {
  const { genre } = req.params
  const filmJSON = moviesJSON.filter(filmJSON => filmJSON.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()))
  if (filmJSON) return res.json(filmJSON)
  res.status(404).send({ message: '404' })
})

app.use((req, res) => {
  res.status(404).send({ message: '404' })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
