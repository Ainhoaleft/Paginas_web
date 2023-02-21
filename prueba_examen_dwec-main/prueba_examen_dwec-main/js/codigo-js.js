
let registros = [];
let idRegistro = 0;
// funcion constructora
function creaRegistro (nombre, apellidos, direccion, fecha_nacimiento) {

    this.nombre = nombre;
    this.apellidos = apellidos;
    this.direccion = direccion;
    this.fecha_nacimiento = (!fecha_nacimiento) ? new Date() : Date.parse(fecha_nacimiento);


}

function anyadirRegistro(objeto) {
    // objeto.id = idRegistro;
    registros.push(objeto);
}

function mostrarRegistrosWeb(registro) {

    let contenedor = document.getElementById("resultado");

    let div_registro = document.createElement("div");
    div_registro.className = "registro";
    contenedor.appendChild(div_registro);

    let div_nombre = document.createElement("div");
    div_nombre.className = "nombre";
    div_registro.appendChild(div_nombre);
    div_nombre.innerHTML = registro.nombre;

    let div_apellidos = document.createElement("div");
    div_apellidos.className = "Apellidos";
    div_registro.appendChild(div_apellidos);
    div_apellidos.innerHTML = registro.apellidos;

    let div_direccion = document.createElement("div");
    div_direccion.className = "Apellidos";
    div_registro.appendChild(div_direccion);
    div_direccion.innerHTML = registro.direccion;

    let separador_registros = document.createElement("hr");
    div_registro.appendChild(separador_registros);
}

let reg1 = new creaRegistro("juan", "perea", "rue del percebe", "2021-10-10");
let reg2 = new creaRegistro("antoanio", "garcia", "rue del mar", "2000-01-01");

anyadirRegistro(reg1);
anyadirRegistro(reg2);

// console.log(registros)

function repintar() {

    document.getElementById("resultado").innerHTML = "";
    for (let r of registros) {
        mostrarRegistrosWeb(r);
    }
}


// funcioon para añadir un registro
function anyadirRegistroForm() {
    this.handleEvent = function(e) {

        e.preventDefault();

        let nombre = document.getElementById("nombre").value;
        let apellidos = document.getElementById("apellidos").value;
        let direccion = document.getElementById("direccion").value;
        let f_nac = document.getElementById("fecha_nac");

        let registro = new creaRegistro(nombre, apellidos, direccion, f_nac);

        anyadirRegistro(registro);

        // repintar();
    }
}



// captura del boton añadir registro
// let nuevoRegistro = new anyadirRegistroForm();
let boton_nuevo_registro = document.querySelector("form");
let manejador_nuevo_registro = new anyadirRegistroForm();
boton_nuevo_registro.addEventListener("submit", manejador_nuevo_registro);

let boton_mostrar_registros = document.getElementById("mostrar-registros");
boton_mostrar_registros.addEventListener("click",repintar);