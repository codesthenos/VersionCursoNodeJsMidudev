const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files = []
  try {
    files = await fs.readdir(folder)
    console.log(`El directorio "${folder}" contiene: `)
  } catch {
    console.error(`No se pudo leer el directorio ${folder}`)
    process.exit(1)
  }
  
  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath)
      if (stats.isDirectory()) console.log(`${file} es una carpeta`)
      else if (stats.isFile()) console.log(`El archivo ${file} tiene un tamaño de ${stats.size / 1024}Kb`)
    } catch {
      console.error(`No se pudo leer el archivo ${file}`)
      process.exit(1)
    }
  })
}

ls(folder)