const fs = require("fs/promises");
const Contactos = require("./Contactos");

class Agenda{
    constructor(){
        this.lista = [];
    }
    agregarContacto = async(rl) =>{
        const nombre = rl.question("Ingrese el nombre del contacto: ");
        const telefono = rl.question("Ingrese el telefono del contacto: ");
        const correo = rl.question("Ingrese el correo del contacto: ");
        if(!nombre || !telefono || !correo){
            console.log("Todos los campos son obligatorios.");
            return;
        }
        const contactoExistente = this.lista.find(contacto => contacto.correo.trim().toLowerCase() === correo.trim().toLowerCase());
        if(contactoExistente){
            console.log("Ya existe un contacto con ese correo.");
            return;
        }
        const telefonoExistente = this.lista.find(contacto => contacto.telefono.trim() === telefono.trim());
        if(telefonoExistente){
            console.log("Ya existe un contacto con ese telefono.");
            return;
        }
        const contacto = new Contactos(nombre, telefono, correo);
        this.lista.push(contacto);
        const datos = JSON.stringify(this.lista, null, 2);
        await fs.writeFile("agenda.json", datos);
        console.log("Contacto agregado correctamente.");
    }

    cargarAgenda = async () =>{
        try{
            const datos = await fs.readFile("agenda.json", "utf-8");
            const agenda = JSON.parse(datos);
            this.lista = agenda.map(contacto => new Contactos(contacto.nombre, contacto.telefono, contacto.correo));
        }catch(error){
            if(error.code === "ENOENT"){
                await fs.writeFile("agenda.json", "[]");
                return [];
            }else{
                throw error;
            }
        }
    }

    buscarContacto(nombre){
        return this.lista.filter(contacto => contacto.nombre.trim().toLowerCase() === nombre.trim().toLowerCase());
    }
    eliminarContactoPorCorreo = async(correo)=>{
        const indice = this.lista.findIndex(contacto => contacto.correo.trim().toLowerCase() === correo.trim().toLowerCase());
        if(indice === -1){
            console.log("no se encontro el contacto")
            return;
        }
        this.lista.splice(indice, 1);
        const datos = JSON.stringify(this.lista, null, 2);
        await fs.writeFile("agenda.json", datos);

    }
    eliminarContactoPorTelefono = async(telefono)=>{
        const indice = this.lista.findIndex(contacto => contacto.telefono.trim().toLowerCase() === telefono.trim().toLowerCase());
        if(indice === -1){
            console.log("no se encontro el contacto")
            return;
        }
        this.lista.splice(indice, 1);
        const datos = JSON.stringify(this.lista, null, 2);
        await fs.writeFile("agenda.json", datos);
    }
}
module.exports = Agenda;