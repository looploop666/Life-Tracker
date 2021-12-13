//Con el html ya renderizado evaluo si se mostrará el gif o no
$( document ).ready(function() {

    console.log(resultadoMostrarGif);
    if (resultadoMostrarGif != true){
      return;
    }

      let api = "https://api.giphy.com/v1/gifs/search?";
      let apiKey = "&api_key=bMIJteVDmtJxesuxl2rp6DVx46bXfxP2";
      let query = "&q=congratulations";

      let urlApi = api + apiKey + query;

      $.get(urlApi, function (respuesta, estado) {
        
          if (estado === "success") {
              //genero un numero random para elegir el gif que se mostrará
              let i = Math.floor(Math.random() * (50 - 1)) + 1;
              let resultado = respuesta.data[i].images.original.url;

              //genero el div donde se mostrará el gif
              let divPadre = document.getElementById('gif');
              let card = document.createElement('div');
              card.setAttribute('class', 'col-12 d-flex justify-content-center');
              card.innerHTML = generarHtmlCard(resultado);
              divPadre.appendChild(card);

          }else{
              console.log("api no disponible");
          }
          
      });

      const generarHtmlCard = (resultado) => {

        return `
                <div class="card">
                  <div class="">
                    <img src="${resultado}" class="card-body-img__gif" alt="gifFelicitaciones">
                    <h5 class="card-title-gif">Alcanzaste el objetivo de esta semana!</h5>
                  </div>
                </div>
              </div>`
      }
  
});