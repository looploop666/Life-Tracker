
/*-----Funciones-----*/

/****************************************************************************************************************/
/* Esta función devuelve el array registrosEntreFechas con los registros que estén storage cuya fecha esté en el 
intervalo indicado por sus parametros. 
/****************************************************************************************************************/

function devuelveRegistrosEntreFechas(desdeFecha, hastaFecha){

  desdeFecha.setHours(0, 0, 0, 0);
  hastaFecha.setHours(0, 0, 0, 0);

  const registrosEntreFechas = [];

  let registros = JSON.parse(localStorage.getItem("registros"));

  registros.forEach(registro => {
    let fechaRegistro = new Date(registro.fecha);
    console.log(fechaRegistro);
    if (fechaRegistro >= desdeFecha && fechaRegistro <= hastaFecha) {
      registrosEntreFechas.push(registro);
    }
  })

  return registrosEntreFechas; 
    
}

/***************************************************************************************************************/
/* Esta función genera un json con los totales por categoría y los inicializa en 0. */ 
/**************************************************************************************************************/
 const inicializarTotales = () => {
  let totales = {};

  categorias.forEach(categoria => {
    totales[categoria.nombre] = 0;
  })

  return totales;
}
 
/***************************************************************************************************************/
/* Esta función toma el array registrosDeHoy y según su categoría genera las cards de resumen de horas diarias */ 
/**************************************************************************************************************/
function calcularTotalesxCategorias(registros){

  let totales = inicializarTotales();

     registros.forEach(registro => {
          totales[registro.categoria] += registro.horas;       
      });

      return totales;
 }

 /***************************************************************************************************************/
/* Esta función crea las cards para cada categoria tomando como parametros de entrada el total de hs por 
   categoría (int) y el nombre de la categoría (string)*/ 
/**************************************************************************************************************/
  const crearCard = (totalCategoria, categoria) => {

      let divPadre = document.getElementById('cardsResumenDiario');
      let card = document.createElement('div');
      card.setAttribute('class', 'col-sm-1 col-md-4 col-lg-4');
      card.innerHTML = generarHtmlCard(totalCategoria, categoria);
      divPadre.appendChild(card);
  }
  
 /***************************************************************************************************************/
/* Esta función genera el html necesario para las cards por Categoría */ 
/**************************************************************************************************************/
  const generarHtmlCard = (totalCategoria, Nombrecategoria) => {

    categoria = buscarDatosCategoria(Nombrecategoria);
    
    return `
            <div class="card">
              <div class="card-body card-body-img ${categoria.bgcolor}">
                <img src="images/${categoria.icon}" class="" alt="...">
              </div>
              <div class="card-body">
                <h5 class="card-title">${categoria.nombre}</h5>
              </div>
              <div class="card-body">
                <div class="card-body-trabajo">
                  <h3 class="card-title" id="cardhstrabajo">${totalCategoria} HORAS</h3>
                </div>
              </div>
            </div>
          </div>`
  }
  
 /***************************************************************************************************************/
/* Esta función devuelve un json con los atributos de una categoría en particular solicitada
   por el parametro NombreCategoria */ 
/**************************************************************************************************************/
  const buscarDatosCategoria = (Nombrecategoria) => {

    let datos = null;
  
    categorias.forEach(categoria => {
  
      if (categoria.nombre == Nombrecategoria) {
        datos = categoria;
        return;
      }
    })
  
    return datos;
  }
  
//Instancio un objeto fecha para obtener la fecha de hoy
let fechaHoy = new Date();

//Invoco a la función para que me devuelva un array 
//con los registros que esten entre las fechas indicadas(en este caso el día de hoy)
let registros = devuelveRegistrosEntreFechas(fechaHoy, fechaHoy);

//calculo de las hs ingresadas en el día
let totales = calcularTotalesxCategorias(registros);

//generación de las cards en el html
Object.keys(totales).forEach(function (categoria) {
  crearCard(totales[categoria], categoria);
});