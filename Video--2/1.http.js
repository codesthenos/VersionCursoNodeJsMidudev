const http = require('node:http')

const portWanted = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

server.listen(portWanted, () => {
  console.log(`Server listening on http://localhost:${portWanted}`)
})
