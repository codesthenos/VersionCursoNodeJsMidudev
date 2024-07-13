import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

import { createServer } from 'node:http'
import path from 'node:path'

dotenv.config()

const db = createClient({
  url: 'libsql://grown-purifiers-codesthenos.turso.io',
  authToken: process.env.TURSO_DB_TOKEN
})

await db.execute(`CREATE TABLE IF NOT EXISTS messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    content TEXT
                  )`
)

const app = express()

const server = createServer(app)

const io = new Server(server)

io.on('connection', async (socket) => {
  console.log('a user has connected!')

  socket.on('disconnect', () => {
    console.log('a user has disconnected')
  })

  socket.on('chat message', async (message) => {
    let result
    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (content) VALUES (:message)',
        args: { message }
      })
    } catch (e) {
      console.error(e)
      return
    }
    io.emit('chat message', message, result.lastInsertRowid.toString())
  })

  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: 'SELECT id, content FROM messages WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0]
      })

      results.rows.forEach(row => {
        socket.emit('chat message', row.content, row.id.toString())
      })
    } catch (e) {
      console.error(e)
    }
  }
})

app.use(logger('dev'))

app.use(express.static(path.join(process.cwd(), 'client')))

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd() + 'client/index.html'))
})

const PORT = process.env.PORT ?? 3210

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
