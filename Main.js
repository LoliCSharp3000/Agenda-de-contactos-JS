const Agenda = require("./Agenda.js");
const readline = require("readline-sync");

const contactos = [];
let fin = false;
while(!fin){
    let opcion = readline.question("Ingrese una opción\n1: Agregar contacto\n2: Mostrar contactos\n3: Salir\n4: Buscar contactos por nombre\n");
    switch(opcion){
        case "1":
            Agenda.agregarContacto(contactos, readline);
            break;
        case "2":
            console.log("Lista de contactos:");
            contactos.forEach(contacto => {
                console.log(contacto.toString());
            });
            break;
        case "3":
            console.log("Saliendo del programa...");
            fin = true;
            break;
        case "4":
            let nombre = readline.question("Pon el nombre del individuo:");
            let listaT = Agenda.buscarContacto(contactos, nombre);
            if(listaT.length === 0){
                console.log("contacto no encontrado.")
            }else{
                listaT.forEach(contacto => {
                    console.log(contacto.toString());
                });
            }
            break;
        default:
            console.log("Opción inválida.");
    }
}