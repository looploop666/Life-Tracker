/*-----Clases-----*/

class Categoria {
    constructor(id, nombre){
        this.id = id;
        this.nombre = nombre;
    }
}

class Usuario{
    constructor(id, username, password){
        this.id = id;
        this.username = username;
        this.password = password;
    }

    // validarLogin(username, password){
    //     if (username = this.username && password == this.password){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

    validarLogin(username){
        if (username == this.username && username != ""){
            return true;
        }else{
            return false;
        }
    }
        
}

/*-----Funciones-----*/

/**************************************************************************************************/
/* Esta función genera las opciones de categorías en el index.html a partir del array categorias */ 
/**************************************************************************************************/

function agregarCategorias() {

    const selectCategorias1 = $("#selectcategoria1");

    for(const categoria of categorias) {

        const opcion = `<option value="${categoria.id}">${categoria.nombre}</option>`;
        selectCategorias1.append(opcion);
       
    }
}

/**************************************************************************************************/
/* Esta función valida las hs ingresadas en el input del index.html */ 
/**************************************************************************************************/

function validarHs(horas){

    if (Number.isInteger(horas) && horas > 0 && horas <= 24 && horas != " "){
        return true;
    }else{
        return false;
    }
}

function validarFecha(fecha){

    if (fecha == ""){
        return false;
    }else{
        return true;
    }
}
function validarCategoria(categoria){

    if (categoria == ""){
        return false;
    }
    else{
        return true;
    }
}

function MostrarWarningSiNoPasaValidaciones(resultado,id){
    if (!resultado){
        $("#" + id).show();
    }else{
        $("#" + id).hide();
    }
}

/*****************************************************************************************************************/
/* Verifica si tengo registros guardados en el storage, si no los tengo creo el array vacío y lo envío a Storage */ 
/****************************************************************************************************************/

function obtenerRegistrosDeStorage() {

    let registrosEnStorage = JSON.parse(localStorage.getItem("registros"));

    if(!registrosEnStorage) {
        registrosEnStorage = [];
        localStorage.setItem("registros", JSON.stringify(registrosEnStorage));
    }

    return registrosEnStorage;
}

/*****************************************************************************************************************/
/* Guarda un registro en Storage
/****************************************************************************************************************/

function guardarRegistrosEnStorage(registro) {

    const registrosEnStorage = obtenerRegistrosDeStorage();
    registrosEnStorage.push(registro);
    localStorage.setItem("registros", JSON.stringify(registrosEnStorage));
}

/* MAIN */

//Creo las categorías del selection en el html
agregarCategorias();

//creo un usuario de prueba
const usuario = new Usuario(1, "admin", "123456");

//Acciones luego del submit del formulario
$("#formIngresoRegistros").submit((event) => {

    event.preventDefault();

    const URLGET = "http://localhost:3004/registros";

    //obtengo los datos de los inputs del formulario
    const usuarioIngresado = $("#usuario").val();
    const fecha = $("#fechaSeleccionada").val();
    console.log(fecha);
    const datosFecha = fecha.split("-");
    const fechaAGuardar = `${datosFecha[1]}/${datosFecha[2]}/${datosFecha[0]}`;
    const categoriaIngresada = $("#selectcategoria1").val();
    const horasIngresadas = Number($("#horas").val());

    const resultadoValidacionLogin = usuario.validarLogin(usuarioIngresado);
    const resultadoValidarHs = validarHs(horasIngresadas);
    const resultadoValidarFecha = validarFecha(fecha);
    const resultadoValidarCategoria = validarCategoria(categoriaIngresada);

   MostrarWarningSiNoPasaValidaciones(resultadoValidacionLogin, "pedirUsuario");
   MostrarWarningSiNoPasaValidaciones(resultadoValidarFecha, "pedirFecha");
   MostrarWarningSiNoPasaValidaciones(resultadoValidarCategoria, "pedirCategoria");
   MostrarWarningSiNoPasaValidaciones(resultadoValidarHs, "pedirHoras");

    let mensaje = "";
    let colorMensaje = "";
    let mensajeAlta = "";
    let colorMensajeAlta = "";

    if (!resultadoValidacionLogin){
        mensaje = "Credenciales invalidas";
        colorMensaje =  "notificacionNoExitosa";

        $("#notificacionLogueo").html(`<strong>${mensaje}</strong>`);
        $("#notificacionLogueo").addClass(colorMensaje);

        document.querySelector("form").reset();
    }

    if (!(resultadoValidacionLogin && resultadoValidarFecha && resultadoValidarCategoria && resultadoValidarHs)){
        document.querySelector("form").reset();
        return;
    }

    mensaje = "Login exitoso";
    colorMensaje =  "notificacionExitosa";

    $("#notificacionLogueo").html(`<strong>${mensaje}</strong>`);
    $("#notificacionLogueo").addClass(colorMensaje);

    const nombreCategoriaIngresada = categorias.find(categoria => categoria.id == categoriaIngresada).nombre;

    //const nuevoRegistro = new Registro(usuarioIngresado, fechaAGuardar, nombreCategoriaIngresada, horasIngresadas);
   // guardarRegistrosEnStorage(nuevoRegistro);

   const infoPost =  {usuarioIngresado, fechaAGuardar, nombreCategoriaIngresada, horasIngresadas};

   $.post(URLGET, infoPost, (respuesta, estado) => {

    if (estado === "success") {

        mensajeAlta = "Registro guardado!";
        colorMensajeAlta =  "notificacionExitosa";
    
        $("#notificacionAltaRegistro").html(`<strong>${mensajeAlta}</strong>`);
        $("#notificacionAltaRegistro").addClass(colorMensajeAlta);
    }
});

   
    document.querySelector("form").reset();
    
    
});






