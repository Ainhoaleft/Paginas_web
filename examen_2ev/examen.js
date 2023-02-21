'use strict';

let idPC = 0;
let ordenadores = [];

function Ordenador(marca, modelo, ram = 16, disco = 2, pulgadas = 17){
   
    if(typeof ram != 'number'){
        ram = 16;      
    }
    if(typeof disco != 'number'){
        disco = 2;      
    }
    if(typeof pulgadas != 'number'){
        pulgadas = 17;      
    }

    this.marca = marca;
    this.modelo = modelo;
    this.ram = ram;
    this.disco = disco;
    this.pulgadas = pulgadas;
}

function Portatil(marca,modelo,ram = 16,disco = 2,pulgadas = 17, autonomia = 4){
    this.__proto__ = new Ordenador(marca,modelo,ram,disco,pulgadas);

    if(typeof autonomia != 'number'){
        autonomia = 4;
    }    
    this.autonomia = parseInt(autonomia);
    this.marca = marca;
    this.modelo = modelo;
    this.ram = ram;
    this.disco = disco;
    this.pulgadas = pulgadas;
}

let o1 = new Ordenador("HP","Pavilion", 32, 2,24);
let o2 = new Ordenador("Apple", "iMac",16,1,24);
let p1 = new Portatil("Acer", "S1");

anyadirOrdenador(o1);
anyadirOrdenador(o2);
anyadirOrdenador(p1);


function listadoPc(){
    let listado = document.getElementById("listadopc");

    let h3 = document.createElement("h3");
    h3.textContent = "Ordenadores- disponibles";
    listado.append(h3);

    let ol = document.createElement("ol");
    ol.id = "lista-ordenada";
    listado.append(ol);
    
    for(let elemento of ordenadores){
        muestraWeb(elemento);
    }
}



function muestraWeb(ordenador){
    let listadopc = document.getElementById("lista-ordenada");

    let li = document.createElement("li");
    li.textContent = ordenador.marca + " " + ordenador.modelo;
    listadopc.append(li);
    let ul2 = document.createElement("ul");
    li.append(ul2);

    let ram = document.createElement("li");
    ram.style.listStyle = "disclosure-closed";
    ram.textContent = "Ram: " + ordenador.ram;
    ul2.append(ram);

    let disco = document.createElement("li");
    disco.style.listStyle = "disclosure-closed";
    disco.textContent = "Disco: " + ordenador.disco;
    ul2.append(disco);

    let pulgadas = document.createElement("li");
    pulgadas.style.listStyle = "disclosure-closed";
    pulgadas.textContent = "Pulgadas: " + ordenador.pulgadas;
    ul2.append(pulgadas);

    if(ordenador.hasOwnProperty ("autonomia")){
        let autonomia = document.createElement("li");
        autonomia.style.listStyle = "disclosure-closed";
        autonomia.textContent = "Autonomia: " + ordenador.autonomia;
        ul2.append(autonomia);
    }

    let br = document.createElement("br");
    li.append(br);
}

function anyadirOrdenador(objeto){
    objeto.id = idPC; //Asignamos la propiedad id al pc
    idPC++;
    ordenadores.push(objeto);
}

function anyademe(){
    let marca = prompt("Introduce la marca");
    if (marca === null) return;
    if (marca.trim() === "") {
        alert("La marca no puede estar vacía");
        return;
    }

    let modelo = prompt("Introduce el modelo");
    if (modelo === null) return;
    if (modelo.trim() === "") {
        alert("El modelo no puede estar vacío");
        return;
    }

    let ram = parseFloat(prompt("Introduce la ram"));
    if (ram === null) return;
    if (isNaN(ram)) {
        alert("La RAM debe ser un número");
        return;
    }

    let disco = parseFloat(prompt("Introduce la capacidad del disco"));
    if (disco === null) return;
    if (isNaN(disco)) {
        alert("El disco debe ser un número");
        return;
    }


    let pulgadas = parseFloat(prompt("Introduce las pulgadas"));
    if (pulgadas === null) return; 
    if (isNaN(pulgadas)) {
    alert("Las pulgadas deben ser un número");
    return;
}

    let portatil = prompt("¿Es un ordenador portátil? (s/n)");
  if (portatil === null) return;
  if (portatil.toLowerCase() !== "s" && portatil.toLowerCase() !== "n") {
    alert("La respuesta debe ser s o n");
    return;
}
if (portatil.toLowerCase() === "s") {
   let autonomia = parseFloat(prompt("Introduce la autonomía en horas"));
    if (autonomia === null) {
        return;
    }
    if (isNaN(autonomia)) {
        alert("La autonomía debe ser un número");
        return;
    }
}

if (marca.trim() !== "" && modelo.trim() !== "" && !isNaN(ram) && !isNaN(disco) && !isNaN(pulgadas)) {
  if (portatil.toLowerCase() === "s") {
   
}

    let nuevoPortatil = new Portatil(marca,modelo,ram,disco,pulgadas,autonomia);
    anyadirOrdenador(nuevoPortatil);
}
    else{
    let nuevoOrdenador = new Ordenador(marca,modelo,ram,disco,pulgadas,autonomia);
    anyadirOrdenador(nuevoOrdenador);
}
    repintar();

};


function borrame(){
   
        let num =  parseFloat(prompt("Introduce el número del ordenador a borrar"));
        if (num === null) {
          return;
        }
        let index = num - 1;
        if (index >= 0 && index < ordenadores.length) {
          ordenadores.splice(index, 1);
        
        } else {
          alert("Número fuera de rango");
        } 
        repintar();
}

function nuevopcWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form")

    let controles = document.getElementById("controlesprincipales")
    controles.append(formulario)

    document.getElementById("anyadepcForm").setAttribute('disabled', "");

    let cancelar = new CancelarFormHandle();
    let botonCancelar = formulario.querySelector("button.cancelar")
    botonCancelar.addEventListener('click', cancelar);

    let enviar = new EnviarPcFormHandle();
    formulario.addEventListener('submit', enviar);

}


function CancelarFormHandle(){
    this.handleEvent = function(event){

        event.preventDefault();

        event.currentTarget.parentNode.remove();
        document.getElementById("anyadepcForm").removeAttribute('disabled');
        repintar();
    }
}

function EnviarPcFormHandle(){
    this.handleEvent = function(event){

        event.preventDefault();

        let formulario = event.currentTarget;
        let marca = formulario.elements.marca.value;
        let modelo = formulario.elements.modelo.value;
        let ram = parseFloat(formulario.elements.ram.value);
        let disco = parseFloat(formulario.elements.disco.value);
        let pulgadas = parseFloat(formulario.elements.pulgadas.value);

        if (!marca || !modelo || isNaN(ram) || isNaN(disco) || isNaN(pulgadas)) {
            // Si algún campo está vacío o es NaN, no se crea el objeto ni se agrega a la lista
            alert("Todos los campos son obligatorios");
            return;
          }S

        let nuevoOrdenador = new Portatil(marca,modelo,ram,disco,pulgadas);
        anyadirOrdenador(nuevoOrdenador);

        repintar();

        document.getElementById("anyadepcForm").removeAttribute('disabled');

    }
}

function repintar(){
    document.getElementById("lista-ordenada").innerHTML = "";
    for(let pc of ordenadores){
        muestraWeb(pc);
    }

}

listadoPc();
console.log(ordenadores);

let botonAnyadir = document.getElementById("anyadepc");
botonAnyadir.addEventListener("click", function() {anyademe()});

let botonBorrar = document.getElementById("borra");
botonBorrar.addEventListener("click", borrame);

let botonFormulario = document.getElementById("anyadepcForm");
botonFormulario.addEventListener("click", nuevopcWebFormulario);

export{
    muestraWeb,
    listadoPc,
    anyademe,
    borrame,
    repintar,
    anyadirOrdenador,
    nuevopcWebFormulario

}

