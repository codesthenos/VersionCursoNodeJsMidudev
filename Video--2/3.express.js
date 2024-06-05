const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 3210

const tyranitarJSON = require('./POKEMON/tyranitar.json')

app.get('/', (req, res) => {
  res.send('<h1 style="width:100vw;heigth:100vh;line-height:100vh;text-align:center;">Welcome to myWeb</h1>')
})

app.get('/pokemon/tyranitar', (req, res) => {
  res.json(tyranitarJSON)
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
