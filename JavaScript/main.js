//=======================================================USUARIOS===================================================
//------------LISTA CIRCULAR Y LISTA DE LISTAS------------
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

//---------CLASE DE TIPO USUARIO-------------
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
//-------------------LOGICA DE USUARIOS--------------------
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

//-----------MATRIZ DISPERSA------------
class NodoCabeceraMD{
    constructor(id){
        this.id = id
        this.siguiente = null
        this.anterior = null
        this.acceso = null
    }
}
class ListaCabeceraMD{
    constructor(tipo){
        this.tipo = tipo
        this.primero = null
        this.ultimo = null
        this.tamanio = 0
    }

    insertar_nodoCabecera(nuevo){
        if (this.primero == null){
            this.primero = nuevo
            this.ultimo = nuevo
        }else{
            if (nuevo.id < this.primero.id){
                nuevo.siguiente = this.primero
                this.primero.anterior = nuevo
                this.primero = nuevo
            }else if(nuevo.id > this.ultimo.id){
                this.ultimo.siguiente = nuevo
                nuevo.anterior = this.ultimo
                this.ultimo = nuevo
            }else{
                let temporal = this.primero
                while (temporal != null){
                    if(nuevo.id < temporal.id){
                        nuevo.siguiente = temporal
                        nuevo.anterior = temporal.anterior
                        temporal.anterior.siguiente = nuevo
                        temporal.anterior = nuevo
                        break
                    }else if(nuevo.id>temporal.id){
                        temporal = temporal.siguiente
                    }else{
                        break
                    }
                }
            }
        }
    }
    obtenercabecera(id){
        let temporal = this.primero
        while(temporal != null){
            if (id == temporal.id){
                return temporal
            }
            temporal = temporal.siguiente
        }
        return null
    }
}
class NodoCelda{
    constructor(x,y,libro){
        this.x = x
        this.y = y
        this.libro = libro
        this.arriba = null
        this.abajo = null
        this.izquierda = null
        this.derecha = null
    }
}
class MatrizDispersa{
    constructor(){
        this.filas = new ListaCabeceraMD('fila')
        this.columnas = ListaCabeceraMD('columna')
    }
    insertar(coor_x,coor_y,libro){
        let nuevo = new NodoCelda(coor_x,coor_y, libro)
        let celda_x = this.filas.obtenercabecera(coor_x)
        let celda_y = this.columnas.obtenercabecera(coor_y)

        if(celda_x==null){
            celda_x = NodoCabeceraMD(coor_x)
            this.filas.insertar_nodoCabecera(celda_x)
        }
        if(celda_y == null){
            celda_y = NodoCabeceraMD(coor_y)
            this.columnas.insertar_nodoCabecera(celda_y)
        }

        if(celda_x.acceso == null){
            celda_x.acceso = nuevo
        }else{
            if(nuevo.y < celda_x.acceso.y){
                nuevo.derecha = celda_x.acceso
                celda_x.acceso.izquierda = nuevo
                celda_x.acceso = nuevo
            }else{
                let temporal = celda_x.acceso
                while(temporal != null){
                    if(nuevo.y < temporal.y){
                        nuevo.derecha = temporal
                        nuevo.izquierda = temporal.izquierda
                        temporal.izquierda.derecha = nuevo
                        temporal.izquierda = nuevo
                        break
                    }else if(nuevo.x == temporal.x && nuevo.y == temporal.y){
                        break
                    }else{
                        if(temporal.derecha == null){
                            temporal.derecha = nuevo
                            nuevo.izquierda = temporal
                            break
                        }else{
                            temporal = temporal.derecha
                        }
                    }
                }
            }
        }

        if (celda_y.acceso == null){
            celda_y.acceso = nuevo
        }else{
            if(nuevo.x < celda_y.acceso.x){
                nuevo.abajo = celda_y.acceso
                celda_y.acceso.arriba = nuevo
                celda_y.acceso = nuevo
            }else{
                let tempo = celda_y.acceso
                while(tempo!= null){
                    if(nuevo.x<tempo.x){
                        nuevo.abajo = tempo
                        nuevo.arriba = tempo.arriba
                        tempo.arriba.abajo = nuevo
                        tempo.arriba = nuevo
                    }else if(nuevo.x == tempo.x && nuevo.y == tempo.y){
                        break
                    }else{
                        if(tempo.abajo == null){
                            tempo.abajo = nuevo
                            nuevo.arriba = tempo
                            break
                        }else{
                            tempo = tempo.abajo
                        }
                    }
                }
            }
        }
    }
}

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
