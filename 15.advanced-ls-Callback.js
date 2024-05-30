const fs = require('node:fs')

const folder = process.argv[2] ?? '.'

fs.readdir(folder, (err, files) => {
  if (err) {
    console.error('Error al leer el archivo ', err)
    return
  }

  files.forEach(file => {
    console.log(file)
  })
})