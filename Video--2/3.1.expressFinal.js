const express = require('express')
const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3210

const tyranitarJSON = require('./POKEMON/tyranitar.json')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1 style="width:100vw;heigth:100vh;line-height:100vh;text-align:center;">Welcome to myWeb</h1>')
})

app.get('/pokemon/tyranitar', (req, res) => {
  res.json(tyranitarJSON)
})

app.post('/pokemon/codesthenos', (req, res) => {
  req.body.timestamp = Date.now()
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1 style="width:100vw;heigth:100vh;line-height:100vh;text-align:center;">404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
