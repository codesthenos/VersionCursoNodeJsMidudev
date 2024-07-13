import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'

import { createServer } from 'node:http'
import path from 'node:path'

const PORT = process.env.PORT ?? 3210

const app = express()

const server = createServer(app)

const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a user has connected!')

  socket.on('disconnect', () => {
    console.log('a user has disconnected')
  })

  socket.on('chat message', (message) => {
    io.emit('chat message', message)
  })
})

app.use(logger('dev'))

app.use(express.static(path.join(process.cwd(), 'client')))

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd() + 'client/index.html'))
})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
