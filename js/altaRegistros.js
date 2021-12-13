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
/* Esta función genera las opciones de categorías en el index.html a partir del array categorias (data.js) */ 
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
/**************************************************************************************************/
/* Esta función valida la fecha ingresadas en el date picker del index.html */ 
/**************************************************************************************************/

function validarFecha(fecha){

    if (fecha == ""){
        return false;
    }else{
        return true;
    }
}

/**************************************************************************************************/
/* Esta función valida que no se haya dejado vacío el selector de categoría*/ 
/**************************************************************************************************/

function validarCategoria(categoria){

    if (categoria == ""){
        return false;
    }
    else{
        return true;
    }
}

/**************************************************************************************************/
/* Esta función muestra los divs con los warnings si algún campo quedó incompleto */ 
/**************************************************************************************************/

function MostrarWarningSiNoPasaValidaciones(resultado,id){
    if (!resultado){
        $("#" + id).show();
    }else{
        $("#" + id).hide();
    }
}

/* MAIN */

//Creo las categorías del select en el html
agregarCategorias();

//creo un usuario de prueba, debe usarse siempre este usuario para poder loguearse
const usuario = new Usuario(1, "admin", "123456");

//Acciones luego del submit del formulario
$("#formIngresoRegistros").submit((event) => {

    event.preventDefault();
    //Mediante json server simulo el servidor donde tengo alojado registros.json
    const URLGET = "http://localhost:3000/registros";

    //obtengo los datos de los inputs del formulario
    const usuarioIngresado = $("#usuario").val();
    const fecha = $("#fechaSeleccionada").val();
    const datosFecha = fecha.split("-");
    const fechaAGuardar = `${datosFecha[1]}/${datosFecha[2]}/${datosFecha[0]}`;
    const categoriaIngresada = $("#selectcategoria1").val();
    const horasIngresadas = Number($("#horas").val());

    //valido todos los datos ingresados
    const resultadoValidacionLogin = usuario.validarLogin(usuarioIngresado);
    const resultadoValidarHs = validarHs(horasIngresadas);
    const resultadoValidarFecha = validarFecha(fecha);
    const resultadoValidarCategoria = validarCategoria(categoriaIngresada);

    //Si algun dato no pasa la validación se muestra un cartel de advertencia y no se permite continuar
    MostrarWarningSiNoPasaValidaciones(resultadoValidacionLogin, "pedirUsuario");
    MostrarWarningSiNoPasaValidaciones(resultadoValidarFecha, "pedirFecha");
    MostrarWarningSiNoPasaValidaciones(resultadoValidarCategoria, "pedirCategoria");
    MostrarWarningSiNoPasaValidaciones(resultadoValidarHs, "pedirHoras");

    let mensaje = "";
    let colorMensaje = "";
    let mensajeAlta = "";
    let colorMensajeAlta = "";

    //Si el usuario no es el correcto se muestra una notificacion de login no exitoso
    if (!resultadoValidacionLogin){
        mensaje = "Credenciales invalidas";
        colorMensaje =  "notificacionNoExitosa";

        $("#notificacionLogueo").html(`<strong>${mensaje}</strong>`);
        $("#notificacionLogueo").addClass(colorMensaje);

        document.querySelector("form").reset();
    }
    //Si alguna de las validaciones continúa siendo negativa se resetea el formulario y sale
    if (!(resultadoValidacionLogin && resultadoValidarFecha && resultadoValidarCategoria && resultadoValidarHs)){
        document.querySelector("form").reset();
        return;
    }
    //Si el usuario es el correcto se le informa al usuario que el login es exitoso
    mensaje = "Login exitoso";
    colorMensaje =  "notificacionExitosa";

    $("#notificacionLogueo").html(`<strong>${mensaje}</strong>`);
    $("#notificacionLogueo").addClass(colorMensaje);

    //Busco el nombre de la categoría ingresada en categorías
    const nombreCategoriaIngresada = categorias.find(categoria => categoria.id == categoriaIngresada).nombre;
    //Declaro los parametros que irán en el post
    const infoPost =  {usuarioIngresado, fechaAGuardar, nombreCategoriaIngresada, horasIngresadas};

   $.post(URLGET, infoPost, (respuesta, estado) => {

    if (estado === "success") {
        //si el estado es success se informa al usuario que el registro fue guardado correctamente
        mensajeAlta = "Registro guardado!";
        colorMensajeAlta =  "notificacionExitosa";
    
        $("#notificacionAltaRegistro").html(`<strong>${mensajeAlta}</strong>`);
        $("#notificacionAltaRegistro").addClass(colorMensajeAlta);
    }else{
        //si no se pudo realizar el post se informa al usuario
        mensajeAlta = "ERROR";
        colorMensajeAlta =  "notificacionNoExitosa";
    
        $("#notificacionAltaRegistro").html(`<strong>${mensajeAlta}</strong>`);
        $("#notificacionAltaRegistro").addClass(colorMensajeAlta);
    }
});

   
    document.querySelector("form").reset();
    
    
});






