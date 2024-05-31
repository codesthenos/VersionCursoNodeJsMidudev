const http = require('node:http')
const { findAviablePort } = require('./21.findAviablePort.js')

const portWanted = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

findAviablePort(portWanted).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
  })
})
