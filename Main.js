const Agenda = require("./Agenda.js");
const readline = require("readline-sync");

const main = async ()=>{
    const agenda = new Agenda();
    await agenda.cargarAgenda();
    let fin = false;
    while(!fin){
        let opcion = readline.question("Ingrese una opción\n1: Agregar contacto\n2: Mostrar contactos\n3: Salir\n4: Buscar contactos por nombre\n5: Eliminar un contacto\n");
        switch(opcion){
            case "1":
                await agenda.agregarContacto(readline);
                break;
            case "2":
                console.log("Lista de contactos:");
                agenda.lista.forEach(contacto => {
                    console.log(contacto.toString());
                });
                break;
            case "3":
                console.log("Saliendo del programa...");
                fin = true;
                break;
            case "4":
                let nombre = readline.question("Pon el nombre del individuo:");
                let listaT = agenda.buscarContacto(nombre);
                if(listaT.length === 0){
                    console.log("contacto no encontrado.")
                }else{
                    listaT.forEach(contacto => {
                        console.log(contacto.toString());
                    });
                }
                break;
            case "5":
                let opc = readline.question("Como lo quiere eleminar: 1: Por correo, 2: Por telefono\n");
                switch(opc){
                    case "1":
                        let correo = readline.question("Pon el correo: ");
                        await agenda.eliminarContactoPorCorreo(correo);
                        break;
                    case "2":
                        let telefono = readline.question("Pon el telefono: ");
                        await agenda.eliminarContactoPorTelefono(telefono);
                        break;
                    default:
                        console.log("Pon el numero correcto");
                        break;
                }
                break;
            default:
                console.log("Opción inválida.");
        }
    }
}
main();