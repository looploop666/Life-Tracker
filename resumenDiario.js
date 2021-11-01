
/*-----Funciones-----*/

/**************************************************************************************************/
/* Esta función agrupa los registros correspondientes al día de la fecha en el array registrosDeHoy[] */ 
/**************************************************************************************************/

function agruparRegistrosDeHoy(){

    const fecha = new Date();
    const registrosDeHoy = [];

    let registrosEnStorage = JSON.parse(localStorage.getItem("registros"));

    if(registrosEnStorage) {

        for(let i = 0; i < registrosEnStorage.length; i++){

            let diaHoy = fecha.getDate();
            let mesHoy = fecha.getMonth() + 1;
            let añoHoy = fecha.getFullYear();

            //Ya que el getDate y el getMonth devuelven numeros del 1 al 9 les agrego un 0 adelante 
            //para poder hacer la comparación entre strings con registrosEnStorage[i].fecha
            if (diaHoy<10 && diaHoy>0){
                diaHoy = ("0"+ diaHoy);
            }
            if(mesHoy<10 && mesHoy>0){
                mesHoy = ("0"+ mesHoy);
            }
            //genero el string con la fecha del día
            let fechaHoy = diaHoy + "/" + mesHoy+ "/" + añoHoy;
                //comparo las fechas de los registros guardados en storage con el string generado para la fecha de hoy
                 if (registrosEnStorage[i].fecha == fechaHoy){
                    
                    registrosDeHoy.push(registrosEnStorage[i]);    
                    
                 }   
         }
         return registrosDeHoy;
        console.log(registrosDeHoy);
    }
    
    
}
/***************************************************************************************************************/
/* Esta función toma el array registrosDeHoy y según su categoría genera las cards de resumen de horas diarias */ 
/**************************************************************************************************************/
function calcularTotalesxDia(registrosDeHoy){

     registrosDeHoy.forEach(element => {

        switch(element.categoria){
             case "Trabajo":{
                 const horasCat1DeHoy = element.horas;
                 console.log(horasCat1DeHoy);
                 const id = "cardhstrabajo";
                 generarCardsResumenDiario(horasCat1DeHoy,id);

             }
             break;
             case "Estudio":{
                const horasCat2DeHoy = element.horas;
                console.log(horasCat2DeHoy);
                const id = "card-hs-estudio";
                generarCardsResumenDiario(horasCat2DeHoy,id);
             }
             break;
             case "Recreación":{
                const horasCat3DeHoy = element.horas;
                console.log(horasCat3DeHoy);
                const id = "card-hs-recreacion";
                generarCardsResumenDiario(horasCat3DeHoy,id);

            }
            break;
            case "Ejercicio Físico":{
                const horasCat4DeHoy = element.horas;
                console.log(horasCat4DeHoy);
                const id = "card-hs-ejercicio";
                generarCardsResumenDiario(horasCat4DeHoy,id);

            }
            break;
            case "Vida Social":{
                const horasCat5DeHoy = element.horas;
                console.log(horasCat5DeHoy);
                const id = "card-hs-social";
                generarCardsResumenDiario(horasCat5DeHoy,id);

            }
            break;
            case "Meditación":{
                const horasCat6DeHoy = element.horas;
                console.log(horasCat6DeHoy);
                const id = "cardhsmeditacion";
                generarCardsResumenDiario(horasCat6DeHoy,id);
            }
            break;

         }        
     });

    
 }
/***************************************************************************************************************/
/* Esta función toma el array registrosDeHoy y según su categoría genera las cards de resumen de horas diarias */ 
/**************************************************************************************************************/
 function generarCardsResumenDiario(horasCatDeHoy,id){

    const cardHoras = document.getElementsByClassName("card-body");
    console.log(cardHoras);
        
    cardHoras.forEach(element => {
        const actualizacionHoras = document.createElement("h3");
        actualizacionHoras.id = id;
        actualizacionHoras.innerHTML = (horasCatDeHoy + " HORAS");

        cardHoras.replaceChild(actualizacionHoras,id);
    });

 }

const registrosDeHoy = agruparRegistrosDeHoy();
calcularTotalesxDia(registrosDeHoy);
