const http = require('node:http')
const { findAviablePort } = require('./21.findAviablePort.js')

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

const portWanted = 1234

findAviablePort(portWanted).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
  })
})
