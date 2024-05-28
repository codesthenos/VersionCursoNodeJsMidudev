const os = require('node:os')

console.log('Nombre del SO', os.platform())
console.log('Version del SO', os.release())
console.log('Arquitectura del SO', os.arch())
console.log('CPUs del SO', os.cpus()) // Vamos a poder ESCALAR procesos en Node.js con esto
console.log('Memoria libre en MEGAS', os.freemem() / 1024 / 1024)
console.log('Memoria total en MEGAS', os.totalmem() / 1024 / 1024)