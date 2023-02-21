"use strict"

let ordenadores=[];

function Ordenador(marcapc,modelopc,rampc=16,discopc=2,pulgadaspc=17){
    this.marca=marcapc;
    this.modelo=modelopc;
    this.ram=rampc;
    this.disco=discopc;
    this.pulgadas=pulgadaspc;

}

function Portatil(marcapc,modelopc,rampc=16,discopc=2,pulgadaspc=17,autonomiapc=4){
    this.__proto__=new Ordenador(marcapc,modelopc,rampc,discopc,pulgadaspc);
    this.autonomia=parseInt(autonomiapc);
}

function crearEjemplos(){
    let o1 = new Ordenador("HP","Pavilion", 32, 2,24);

    let o2 = new Ordenador("Apple", "iMac",16,1,24);
    
    let p1 = new Portatil("Acer", "S1");
    ordenadores.push(o1);
    ordenadores.push(o2);
    ordenadores.push(p1);
}

function mostrarEquipo(ordenador){
    let li=document.createElement("li");
    let ul=document.createElement("ul");

    //Creando una etiqueta li para mostrar los datos del ordenador
    let prop=document.createElement("li");
    prop.style.listStyle="disclosure-closed";
    prop.textContent="RAM: "+ordenador.ram;
    ul.append(prop);

    let prop2=document.createElement("li");
    prop2.style.listStyle="disclosure-closed";
    prop2.textContent="DISCO: "+ordenador.disco;
    ul.append(prop2);

    let prop3=document.createElement("li");
    prop3.style.listStyle="disclosure-closed";
    prop3.textContent="PULGADAS: "+ordenador.pulgadas;
    ul.append(prop3);

    if(ordenador.hasOwnProperty("autonomia")){
        let prop4=document.createElement("li");
        prop4.style.listStyle="disclosure-closed";
        prop4.textContent="AUTONOMÍA: "+ordenador.autonomia;
        ul.append(prop4);
    }

    li.textContent=ordenador.marca+" "+ordenador.modelo;
    li.append(ul);
    li.append(document.createElement("br"))
    return li;

}

function muestraWeb(){
    let divlist=document.getElementById("listadopc");
    divlist.innerHTML="";

    let titulo=document.createElement("h3");
    titulo.textContent="ORDENADORES DISPONIBLES";
    divlist.append(titulo);


    let ol = document.createElement("ol");
    ordenadores.forEach(o => {
        
        ol.append(mostrarEquipo(o));
    });

    divlist.append(ol);

}

function Anyademe(){
    this.handleEvent=function(event){
        event.preventDefault();

        let portatil=prompt("¿Portátil?(s/n)");
        if(portatil==undefined)return;

        let marca=prompt("Marca del equipo");
        if(marca==undefined)return;

        let modelo=prompt("Modelo del equipo");
        if(modelo==undefined)return;

        let ram=prompt("RAM del equipo");
        if(ram==undefined) return;
        if(ram=="" || isNaN(ram))ram=undefined;

        let disco=prompt("Disco del equipo");
        if(disco==undefined)return;
        if(disco=="" || isNaN(disco))disco=undefined;

        if(portatil=="s"){
            let autonomia=prompt("Autonomía del equipo");
            if(autonomia==undefined)return;
            if(autonomia=="" || isNaN(autonomia))autonomia=undefined;
            ordenadores.push(new Portatil(marca,modelo,ram,disco,autonomia));
            
        }else{
            ordenadores.push(new Ordenador(marca,modelo,ram,disco));
        }
        muestraWeb();

    }
}

function Borrame(){
    this.handleEvent=function(event){
        event.preventDefault();
        let num=null;
        while(true){
            num=prompt("Introduce el número del ordenador a borrar");
            
            if(num==undefined){
                return;
            }else{
                num=parseInt(num);
            }

            if(num>0 && num<=ordenadores.length){
                break;
            }else{
                alert("Numero introducido erroneo");
            }
            
            
        }
        
        ordenadores.splice(num-1,1);
        muestraWeb();
        
        
    }
}
function EnviarPcFormHandle(){
    this.handleEvent = function(e){
        e.preventDefault();
         let formulario = e.currentTarget;
         let marca = formulario.elements.marca.value;
         let modelo = formulario.elements.modelo.value;
         let ram = formulario.elements.ram.value;
         let disco = formulario.elements.disco.value;
         let pulgadas = formulario.elements.pulgadas.value;
         let autonomia = formulario.elements.autonomia.value;
         let ord = new Ordenador(marca,modelo,ram,disco,pulgadas);
       
        ordenadores.push(ord);
        muestraWeb();
       
    }
}
function nuevopcWebFormulario() {
    //Copia del formulario/template
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    let formulario = plantillaFormulario.querySelector("form");
    
   // formulario.elements.autonomia.setAttribute("disabled","")

    let divControlesPrincipales = document.getElementById("controlesprincipales")
    divControlesPrincipales.appendChild(formulario);
    let btnAnyadirpcForm = document.getElementById("anyadepcForm").setAttribute("disabled", "");   

    //botón submit
    let enviarPC = new EnviarPcFormHandle();
    formulario.addEventListener('submit', enviarPC);
    //botón cancelar
    let cancelarObj = new CancelarFormHandle();
    let btnCancelar = formulario.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", cancelarObj);

}

function CancelarFormHandle() {
    this.handleEvent = function (event){
        
        //básicamente recoge el padre del botón cancelar -el formulario- y lo borra
        
        event.currentTarget.parentNode.remove();
        let btnAnyadirPCForm = document.getElementById("anyadepcForm").removeAttribute("disabled");
        muestraWeb();
    }
}
///YA EJECUTAMOS TODAS LAS FUNCIONES
crearEjemplos();
muestraWeb();

let botonAnyadir=document.getElementById("anyadepc");
let handlerA=new Anyademe();
botonAnyadir.addEventListener("click",handlerA);

let botonElim=document.getElementById("borra");
let handlerB=new Borrame();
botonElim.addEventListener("click",handlerB);

let anyadirpcform = document.getElementById("anyadepcForm");
anyadirpcform.addEventListener('click', nuevopcWebFormulario);

