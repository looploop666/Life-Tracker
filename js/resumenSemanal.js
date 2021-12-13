

//Instancio un objeto fecha para obtener la fecha de hoy

let diaDeHoy = moment();
//utilizando la librería moment calculo la fecha de 7 días para atrás
let diaDeHoyMenos7 = moment().subtract(1,'week');

mostrarResumen(diaDeHoyMenos7, diaDeHoy);