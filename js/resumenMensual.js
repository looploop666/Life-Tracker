

//Instancio un objeto fecha para obtener la fecha de hoy

let diaDeHoy = moment();
//utilizando la librería moment calculo la fecha de un mes atrás
let diaDeHoyMenosUnMes = moment().subtract(1,'month');

mostrarResumen(diaDeHoyMenosUnMes, diaDeHoy);