//=======================================================USUARIOS===================================================
//LISTA CIRCULAR Y LISTA DE LISTAS
class NodoCU{
    constructor(_usuario){
        this.usuario = _usuario;
        this.siguiente = null;
        this.abajo = null;
    }
}
class NodoLibroU{
    constructor(_nombre){
        this.nombre = _nombre
        this.abajo = null
    }
}
class ListaUsuarios{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.tamanio = 0;
    }
    //Inserta al usuario a la lista circular
    insertarusuario(_cliente){
        let nuevo = new NodoCU(_cliente);
        if(this.tamanio == 0){
            this.primero = nuevo
            this.ultimo = this.primero
            this.ultimo.siguiente = this.primero
            this.primero.siguiente = this.ultimo
        }else{
            this.ultimo.siguiente = nuevo
            this.ultimo = nuevo
            this.ultimo.siguiente = this.primero
        }
        this.tamanio++;
    }
    //Retorna el usuario
    retornarusuario(_dpi){
        let temporal = this.primero
        let contador = 0
        while(contador != this.tamanio){
            if(_dpi == temporal.dpi){
                return temporal
            }
            temporal = temporal.siguiente
            contador++
        }
        return null
    }
    //Inserta el nombre del libro en la lista de listas
    insertarlibro(_libro, _dpi){
        let user = this.retornarusuario(_dpi)
        if(user != null){
            let nuevo = new NodoLibroU(_libro)
            if (user.abajo == null){
                user.abajo = nuevo
            }else{
                let temporal = user
                while(temporal != null){
                    if(temporal.abajo == null){
                        break
                    }
                    temporal = temporal.siguiente
                }
                temporal.abajo = nuevo
            }
            
        }
    }
    mostrarusuarios(){
        let temporal = this.primero
        let contador = 0
        while(contador != this.tamanio){
            console.log(temporal.usuario.nombre)
            temporal = temporal.siguiente
            contador++
        }
    }
    graficar(){
        let usuario = this.primero
        let libro = this.primero
    }
}

//CLASE DE TIPO USUARIO
class Usuario{
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
//IMPLEMENTACION DE LA LISTA DE USUARIOS
var users = new ListaUsuarios()
localStorage.setItem("lista-usuarios",users)
//FUNCION PARA AGREGAR LOS USUARIOS A LA LISTA
function agregarUsuarios(_dpi,_nombre,_username,_correo,_rol,_contrasenia,_telefono){
    let nuevo = new Usuario(_dpi,_nombre,_username,_correo,_rol,_contrasenia,_telefono)
    users.insertarusuario(nuevo)
    localStorage.setItem("lista-usuarios", users)
}

//FUNCION PARA LA CARGA MASIVA DE USUARIOS
function CargaMasivaUsuarios(){
    let input_archivo = document.getElementById("inusers");
    let archivo = input_archivo.files[0];
    if (!archivo) {
        return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        let texto = event.target.result;
        let jtexto = JSON.parse(texto)
        for(let i = 0; i<jtexto.length; i++){
            let dpi = jtexto[i].dpi;
            let nombre = jtexto[i].nombre_completo;
            let username = jtexto[i].nombre_usuario;
            let correo = jtexto[i].correo;
            let rol = jtexto[i].rol;
            let contrasenia = jtexto[i].contrasenia
            let telefono = jtexto[i].telefono
            agregarUsuarios(dpi,nombre,username,correo,rol,contrasenia,telefono)
        }
        users.mostrarusuarios()
    });
    reader.readAsText(archivo, "UTF-8");
}

//================================================LIBROS===================================

//CARGA MASIVA DE LIBROS
function CargaLibros(){
    let input_archivo = document.getElementById("inlibros");
    let archivo = input_archivo.files[0];
    if (!archivo) {
    return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        let texto = event.target.result;
        let jtexto = JSON.parse(texto)
        for(let i = 0; i<jtexto.length; i++){
            let isbn = jtexto[i].isbn;
            console.log(isbn)
            let autor = jtexto[i].nombre_autor;
            console.log(autor)
            let nombre = jtexto[i].nombre_libro;
            console.log(nombre)
            let cantidad = jtexto[i].cantidad;
            console.log(cantidad)
            let paginas = jtexto[i].paginas;
            console.log(paginas)
            let categoria = jtexto[i].categoria
            console.log(categoria)
            let fila = jtexto[i].fila
            console.log(fila)
            let columna = jtexto[i].columna
            console.log(columna)
        }
    });
    reader.readAsText(archivo, "UTF-8");
}
function CargaAutores(){
    let input_archivo = document.getElementById("inautores");
    let archivo = input_archivo.files[0];
    if (!archivo) {
    return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        let texto = event.target.result;
        obtenerjsonautores(texto)
    });
    reader.readAsText(archivo, "UTF-8");
}
function obtenerjsonautores(texto){
    let jtexto = JSON.parse(texto)
    console.log(jtexto)
}
