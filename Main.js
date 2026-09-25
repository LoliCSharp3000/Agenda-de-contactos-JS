const Agenda = require("./Agenda.js");
const readline = require("readline-sync");

const contactos = [];
let fin = false;
while(!fin){
    let opcion = readline.question("Ingrese una opción (1: Agregar contacto, 2: Mostrar contactos, 3: Salir): ");
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
        default:
            console.log("Opción inválida.");
    }
}