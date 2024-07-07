import express, { json } from 'express'

import { corsMiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  const PORT = process.env.PORT ?? 3210

  app.use(json())

  app.use(corsMiddleware())

  app.disable('x-powered-by')

  app.get('/', (req, res) => {
    res.send({ message: 'CODESTHENOS-MOVIES' })
  })

  app.use('/movies', createMovieRouter({ movieModel }))

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}
