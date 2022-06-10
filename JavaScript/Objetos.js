export class Usuario{
    constructor(_dpi,_nombre,_username,_correo,_rol,_contrasenia,_telefono){
        this.dpi = _dpi;
        this.nombre = _nombre
        this.username = _username
        this.correo = _correo
        this.rol = _rol
        this.contrasenia = _contrasenia
        this.telefono = _telefono
    }
}

export class Libro{
    constructor(_isbn,_autor,_nombre,_cantidad,_paginas,_categoria){
        this.isbn = _isbn
        this.autor = _autor
        this.nombre = _nombre
        this.cantidad = _cantidad
        this.paginas = _paginas
        this.categoria = _categoria
    }
}

export class Autor{
    constructor(_dpi,_nombre,_correo,_telefono,_direccion,_bibliografia){
        this.dpi = _dpi
        this.nombre = _nombre
        this.correo = _correo
        this.telefono = _telefono
        this.direccion = _direccion
        this.bibliografia = _bibliografia
    }
}