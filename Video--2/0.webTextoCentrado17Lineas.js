const http = require('node:http')

const portWanted = process.env.PORT ?? 3000

const processRequest = (request, response) => {
  if (request.url === '/') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.end('<h1 style="width:100vw;heigth:100vh;line-height:100vh;text-align:center;">Welcome to myWeb</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(portWanted, () => {
  console.log(`Server listening on http://localhost:${portWanted}`)
})
