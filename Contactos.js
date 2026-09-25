class Contactos{
    constructor(nombre, telefono, correo){
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
    }

    toString(){
        return `nombre: ${this.nombre}, telefono: ${this.telefono}, correo: ${this.correo}`;
    }
}
module.exports = Contactos;