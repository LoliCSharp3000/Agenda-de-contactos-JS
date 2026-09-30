const fs = require("fs/promises");
const Contactos = require("./Contactos");

class Agenda{
    static agregarContacto = async(lista, rl) =>{
        const nombre = rl.question("Ingrese el nombre del contacto: ");
        const telefono = rl.question("Ingrese el telefono del contacto: ");
        const correo = rl.question("Ingrese el correo del contacto: ");
        const contacto = new Contactos(nombre, telefono, correo);
        lista.push(contacto);
        const datos = JSON.stringify(lista, null, 2);
        await fs.writeFile("agenda.json", datos);
        console.log("Contacto agregado correctamente.");
    }

    static cargarAgenda = async () =>{
        try{
            const datos = await fs.readFile("agenda.json", "utf-8");
            const agenda = JSON.parse(datos);
            return agenda.map(contacto => new Contactos(contacto.nombre, contacto.telefono, contacto.correo));
        }catch(error){
            if(error.code === "ENOENT"){
                await fs.writeFile("agenda.json", "[]");
                return [];
            }else{
                throw error;
            }
        }
    }

    static buscarContacto(lista, nombre){
        return lista.filter(contacto => contacto.nombre.trim().toLowerCase() === nombre.trim().toLowerCase());
    }
    static eliminarContactoPorCorreo = async(lista, correo)=>{
        const indice = lista.findIndex(contacto => contacto.correo.trim().toLowerCase() === correo.trim().toLowerCase());
        if(indice === -1){
            console.log("no se encontro el contacto")
            return;
        }
        lista.splice(indice, 1);
        const datos = JSON.stringify(lista, null, 2);
        await fs.writeFile("agenda.json", datos);

    }
    static eliminarContactoPorTelefono = async(lista, telefono)=>{
        const indice = lista.findIndex(contacto => contacto.telefono.trim().toLowerCase() === telefono.trim().toLowerCase());
        if(indice === -1){
            console.log("no se encontro el contacto")
            return;
        }
        lista.splice(indice, 1);
        const datos = JSON.stringify(lista, null, 2);
        await fs.writeFile("agenda.json", datos);
    }
}
module.exports = Agenda;