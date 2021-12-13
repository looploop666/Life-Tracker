

//Instancio un objeto fecha para obtener la fecha de hoy
let fechaHoy = new Date();

fechaHoy.setHours(0, 0, 0, 0);

let resultadoMostrarGif = mostrarResumen(fechaHoy, fechaHoy);
console.log(resultadoMostrarGif);