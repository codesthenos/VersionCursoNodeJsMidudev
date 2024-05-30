const fs = require('node:fs/promises')
const path = require('node:path')
const pcolor = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files = []
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pcolor.red(`No se pudo leer el directorio ${folder}`))
    process.exit(1)
  }
  
  const filesPromises = files.map(async file => {
      const filePath = path.join(folder, file)
      let stats
      try {
        stats = await fs.stat(filePath)
      } catch {
        console.error(pcolor.red(`No se pudo leer el archivo ${file}`))
        process.exit(1)
      }

      const isDirectory = stats.isDirectory()
      const fileType = isDirectory ? 'd' : 'f'
      const fileSize = stats.size.toString()
      const fileDateModified = stats.mtime.toLocaleString()

      return `${fileType} ${pcolor.blue(file.padEnd(40))} ${pcolor.green(fileSize.padStart(10))} ${pcolor.yellow(fileDateModified)}`
    })
  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)