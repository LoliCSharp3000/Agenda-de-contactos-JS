const Contactos = require("./Contactos");

class Agenda{
    static agregarContacto(lista, rl){
        const nombre = rl.question("Ingrese el nombre del contacto: ");
        const telefono = rl.question("Ingrese el telefono del contacto: ");
        const correo = rl.question("Ingrese el correo del contacto: ");
        const contacto = new Contactos(nombre, telefono, correo);
        lista.push(contacto);
        console.log("Contacto agregado correctamente.");
    }
}
module.exports = Agenda;