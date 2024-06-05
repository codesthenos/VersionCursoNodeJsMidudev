//const os = require('node:os') SI PONGO EL RATON ENCIMA DE 'req' Y APRIETO 'Ctrl + .', ME DA LA OPCION DE CAMBIARLO A ECMAScript Import -->
//Dando esta version que hace lo mismo, como es ECMAScript necesito cambiar el archivo a .mjs (por ahora)
import { platform, release, arch, cpus, freemem, totalmem, uptime } from 'node:os'

console.log('Nombre del SO', platform())
console.log('Version del SO', release())
console.log('Arquitectura del SO', arch())
console.log('CPUs del SO', cpus()) // Vamos a poder ESCALAR procesos en Node.js con esto
console.log('Memoria libre en MEGAS', freemem() / 1024 / 1024)
console.log('Memoria total en MEGAS', totalmem() / 1024 / 1024)
console.log('Dias que lleva encendido el ordenador', uptime() / 60 / 60 / 24)