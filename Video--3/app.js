const express = require('express')

const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3210

const moviesJSON = require('./movies.json')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1 style="width:100vw;heigth:100vh;line-height:100vh;text-align:center;">CODESTHENOS MOVIES</h1>')
})

app.get('/movies', (req, res) => {
  res.json(moviesJSON)
})

app.get('/movies/genre=Terror', (req, res) => {
  res.json(moviesJSON)
})

app.get('/movies/1', (req, res) => {
  res.json(moviesJSON)
})

app.use((req, res) => {
  res.status(404).send('<h1 style="width:100vw;heigth:100vh;line-height:100vh;text-align:center;">404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
