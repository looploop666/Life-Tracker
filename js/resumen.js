/*-----Funciones-----*/

/****************************************************************************************************************/
/* Esta función genera las cards con los registros que estén en registros.json cuya fecha esté en el 
intervalo indicado por sus parametros desdeFecha y hastaFecha. 
/****************************************************************************************************************/

function mostrarResumen(desdeFecha, hastaFecha){
  
    const URLGET = "http://localhost:3000/registros";

    //inicializo un array para guardar los registros que cumplan con las condiciones
    let registrosEntreFechas = [];
    //inicializo una variable que determinará si se se mostrará un gif como felicitación al desempeño del usuario
    let mostrarGif = false;
    //Obtengo los registros ingresados por el usuario en registros.json con un GET
    $.get(URLGET, function (respuesta, estado) {
  
      if (estado === "success") {
  
        let listaRegistros = respuesta;
        //Recorro todos los registros uno por uno
        listaRegistros.forEach(registro => {

          let fechaRegistro = new Date(registro.fechaAGuardar);
          //Si la fecha del registro está entre el rango de fechas solicitado se incluye en el array registrosEntreFechas
          if (fechaRegistro >= desdeFecha && fechaRegistro <= hastaFecha) {
  
            registrosEntreFechas.push(registro);
  
          }
          
        });
        
        //calculo de las hs totales por categoria
        let totales = calcularTotalesxCategorias(registrosEntreFechas);
        console.log(totales);
  
        //generación de las cards en el html
        Object.keys(totales).forEach(function (categoria) {
          crearCard(totales[categoria], categoria);
          //si la categoría es Estudio y la cantidad de hs realizadas es mayor a 4 se mostrará un gif de felicitación
          if (categoria == 'Estudio'){
            if (totales[categoria] >= 4 ){  

              mostrarGif = true;

            }
          }

        });
      }
    });

    console.log(mostrarGif);
    return mostrarGif;
    
}
  
  
  /***************************************************************************************************************/
  /* Esta función genera un json con los totales por categoría y los inicializa en 0. */ 
  /**************************************************************************************************************/
   const inicializarTotales = () => {
    let totales = {};
  
    categorias.forEach(categoria => {
      totales[categoria.nombre] = Number(0);
    })
  
    return totales;
  }
   
  /***************************************************************************************************************/
  /* Esta función toma el array de registros seleccionados y acumula las hs segun categoría. Devuelve un json con los
  totales */ 
  /**************************************************************************************************************/
  function calcularTotalesxCategorias(registrosEntreFechas){
    //inicialización del json totales en 0
    let totales = inicializarTotales();
    
    registrosEntreFechas.forEach(registro => {
        //Se calcula la sumatoria de hs por cada categoría
         totales[registro.nombreCategoriaIngresada] += Number(registro.horasIngresadas);
     });
     //retorno el json totales con los totales de hs por categoría
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
  
      let categoria = buscarDatosCategoria(Nombrecategoria);
      
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