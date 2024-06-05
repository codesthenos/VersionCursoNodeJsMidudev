const http = require('node:http')
const tyranitarJSON = require('./POKEMON/tyranitar.json')

const processRequest = (req, res) => {
  const { method, url } = req // Con esto saco del objeto request las propiedades method y url y las meto en las const method y url respectivamente

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/tyranitar':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(tyranitarJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1 style="width:100vw;heigth:100vh;line-height:100vh;text-align:center;">404</h1>')
      }

    case 'POST':
      switch (url) {
        case '/pokemon':
          const body = ''
      }
  }
}
