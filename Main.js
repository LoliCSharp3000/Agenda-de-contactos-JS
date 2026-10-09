const Agenda = require("./Agenda.js");
const readline = require("readline-sync");

const main = async ()=>{
    const agenda = new Agenda();
    try{
        await agenda.cargarAgenda();
    }catch(error){
        console.error("Error al cargar la agenda:", error);
    }
    let fin = false;
    while(!fin){
        let opcion = readline.question("Ingrese una opción\n1: Agregar contacto\n2: Mostrar contactos\n3: Salir\n4: Buscar contactos por nombre\n5: Eliminar un contacto\n");
        switch(opcion){
            case "1":
                try{
                    await agenda.agregarContacto(readline);
                }catch(error){
                    console.error("Error al agregar el contacto:", error);
                }
                break;
            case "2":
                agenda.mostrarContactos();
                break;
            case "3":
                console.log("Saliendo del programa...");
                fin = true;
                break;
            case "4":
                const nombre = readline.question("Pon el nombre del individuo:");
                const listaT = agenda.buscarContacto(nombre);
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
                        const correo = readline.question("Pon el correo: ");
                        await agenda.eliminarContactoPorCorreo(correo);
                        break;
                    case "2":
                        const telefono = readline.question("Pon el telefono: ");
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