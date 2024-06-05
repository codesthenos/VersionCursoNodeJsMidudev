const express = require('express')
const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3210

const tyranitarJSON = require('./POKEMON/tyranitar.json')

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json; charset=utf-8') return next()

  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    req.body = data
    next()
  })
})

app.get('/', (req, res) => {
  res.send('<h1 style="width:100vw;heigth:100vh;line-height:100vh;text-align:center;">Welcome to myWeb</h1>')
})

app.get('/pokemon/tyranitar', (req, res) => {
  res.json(tyranitarJSON)
})

app.post('/pokemon/codesthenos', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1 style="width:100vw;heigth:100vh;line-height:100vh;text-align:center;">404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
