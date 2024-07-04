import express, { json } from 'express'

import { corsMiddleware } from './middlewares/cors.js'
import { moviesRouter } from './routes/movies.js'

const app = express()

const PORT = process.env.PORT ?? 3210

app.use(json())

app.use(corsMiddleware())

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send({ message: 'CODESTHENOS-MOVIES' })
})

app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
