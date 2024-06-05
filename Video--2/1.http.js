const http = require('node:http')

const portWanted = process.env.PORT ?? 3000

const processRequest = (request, response) => {
  if (request.url === '/') {
    console.log('request received: ', request.url)
  }
  response.end('Hola mundo')
}

const server = http.createServer(processRequest)

server.listen(portWanted, () => {
  console.log(`Server listening on http://localhost:${portWanted}`)
})
