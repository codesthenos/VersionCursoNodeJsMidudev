const express = require('express')
const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3210

const tyranitarJSON = require('./POKEMON/tyranitar.json')
const storeData = {
  codesthenos: {},
  ataraxia: {},
  ataraxiaandcodesthenos: {}
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1 style="width:100vw;heigth:100vh;line-height:100vh;text-align:center;">Welcome to myWeb</h1>')
})

app.get('/pokemon/tyranitar', (req, res) => {
  res.json(tyranitarJSON)
})

app.post('/pokemon/codesthenos', (req, res) => {
  req.body.timestamp = Date.now()
  storeData.codesthenos = req.body
  res.status(201).json(req.body)
})

app.get('/pokemon/codesthenos', (req, res) => {
  res.json(storeData.codesthenos)
})

app.post('/pokemon/ataraxia', (req, res) => {
  req.body.timestamp = Date.now()
  storeData.ataraxia = req.body
  res.status(201).json(req.body)
})

app.get('/pokemon/ataraxia', (req, res) => {
  res.json(storeData.ataraxia)
})

app.post('/pokemon/ataraxiaandcodesthenos', (req, res) => {
  req.body.timestamp = Date.now()
  storeData.ataraxiaandcodesthenos = req.body
  res.status(201).json(req.body)
})

app.get('/pokemon/ataraxiaandcodesthenos', (req, res) => {
  res.json(storeData.ataraxiaandcodesthenos)
})

app.use((req, res) => {
  res.status(404).send('<h1 style="width:100vw;heigth:100vh;line-height:100vh;text-align:center;">404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
