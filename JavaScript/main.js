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
        if(this.tamanio!= 0){
            let temporal = this.primero
            let codigodot = "digraph G {\n\tnode [shape=box];\n\trankdir=\"LR\";\nlabel=\"Lista de Listas de Usuarios\"\n"
            let nodos = ""
            let conexiones = ""
            let numnodo = 0
            let numnodolib = 1
            let contador = 0
            while(contador!= this.tamanio){
                nodos +="\tNodo" + numnodo + "[label=\"Nombre: " + temporal.usuario.nombre + "\\nUsername: "+temporal.usuario.username+"\\nDPI: "+temporal.usuario.dpi+"\"];\n"
                if(temporal.abajo != null){
                    let temporal2 = temporal
                    while(temporal2 != null){
                        if (temporal2.abajo != null){
                            nodos +="\tNodo" + str(numnodo)+str(numnodolib) + "[label=\"Nombre del libro: " + temporal2.abajo.nombre +"\"];\n"
                        }
                        temporal2 = temporal2.abajo
                        numnodolib++
                    }
                }
                temporal = temporal.siguiente
                contador++
                numnodo++
            }
            contador = 0
            numnodo = 0
            numnodolib = 0
            while(contador!= this.tamanio-1){
                let numaux = numnodo +1
                conexiones += "\tNodo" + numnodo + "->Nodo" + numaux + ";\n"
                numnodo++
                contador++
            }
            conexiones += "\tNodo" + (this.tamanio-1) + "->Nodo0;\n"

            codigodot += nodos += conexiones + "}"
            localStorage.setItem("dot_users",codigodot)
            console.log(codigodot)
        }else{
            console.log(":'v")
        }
    }
    verificarusuario(username, contrasenia){
        if(this.validarususario(username,contrasenia) == true){
            if(this.retornarusuariologin(username,contrasenia).rol == "Administrador"){
                return true
            }else if(this.retornarusuariologin(username,contrasenia).rol == "Usuario"){
                return false
            }
        }else{
            return null
        }
    }
    validarususario(usuario,contrasenia){
        let temporal = this.primero
        let contador = 0
        while(contador!= this.tamanio){
            if(temporal.usuario.username == usuario){
                if(temporal.usuario.contrasenia == contrasenia){
                    return true
                }
            }
            temporal = temporal.siguiente
            contador++
        }
        return false
    }
    retornarusuariologin(username,contrasenia){
        let temporal = this.primero
        let contador = 0
        while(contador!= this.tamanio){
            if(temporal.usuario.username == username){
                if(temporal.usuario.contrasenia == contrasenia){
                    return temporal.usuario
                }
            }
            temporal = temporal.siguiente
            contador++
        }
        return null
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
// AGREGA AL PRIMER USUARIO POR DEFECTO
function agregarPrimerAdmin(){
    let users = new ListaUsuarios()
    let userstotales = JSON.parse(localStorage.getItem("lista_usuarios"))
    if(userstotales == null){
        let nuevo = new Usuario(2354168452525,"Wilfred Perez","Wilfred","admin@edd.usac.edu.gt","Administrador","123","+502 (123) 123-4567")
        users.insertarusuario(nuevo)
        //console.log(JSON.stringify(users.primero.usuario))
        localStorage.setItem("lista_usuarios", "["+JSON.stringify(users.primero.usuario)+"]")
    }
}
agregarPrimerAdmin()
//FUNCION PARA LA CARGA MASIVA DE USUARIOS
function CargaMasivaUsuarios(){
    let input_archivo = document.getElementById("inusers");
    let archivo = input_archivo.files[0];
    let usersguardados = JSON.parse(localStorage.getItem("lista_usuarios"))
    let users = new ListaUsuarios()
    for(let i = 0; i<usersguardados.length; i++){
        let cargau = new Usuario(usersguardados[i].dpi,usersguardados[i].nombre,usersguardados[i].username,usersguardados[i].correo,usersguardados[i].rol,usersguardados[i].contrasenia,usersguardados[i].telefono)
        users.insertarusuario(cargau)
    }
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
            let nuevo = new Usuario(dpi,nombre,username,correo,rol,contrasenia,telefono)
            users.insertarusuario(nuevo)
        }
        //localStorage.setItem("listaUsuarios", JSON.stringify(users))
        let contador = 0
        let temporal = users.primero
        let list = "["
        while(contador != users.tamanio){
            if(temporal == users.ultimo){
                list += JSON.stringify(temporal.usuario) + "]"
                break
            }
            list += JSON.stringify(temporal.usuario) + ","
            temporal = temporal.siguiente
            contador++
        }
        console.log(list)
        localStorage.setItem("lista_usuarios", list)
        users.mostrarusuarios()
        alert("Ha cargado los usuarios exitosamente")
    });
    reader.readAsText(archivo, "UTF-8");
}

//METODO PARA VALIDAR EL LOGIN
function Login(user,password){
    let lusuarios = new ListaUsuarios()
    let usuarios = JSON.parse(localStorage.getItem("lista_usuarios"))
    for(let i = 0;i<usuarios.length;i++){
        nuevo = new Usuario(usuarios[i].dpi,usuarios[i].nombre,usuarios[i].username,usuarios[i].correo,usuarios[i].rol,usuarios[i].contrasenia,usuarios[i].telefono)
        lusuarios.insertarusuario(nuevo)
    }
    if(lusuarios.verificarusuario(user,password)==true){
        alert("Bienvenido Admin")
        location.href = "../Administrador/carga.html"
    }else if(lusuarios.verificarusuario(user,password)==false){
        alert("Hola Usuario")
    }else if(lusuarios.verificarusuario(user,password)==null){
        alert("credenciales incorrectas")
    }
}
//================================================================LIBROS======================================================

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
        this.columnas = new ListaCabeceraMD('columna')
    }
    insertar(coor_x,coor_y,libro){
        let nuevo = new NodoCelda(coor_x,coor_y, libro)
        let celda_x = this.filas.obtenercabecera(coor_x)
        let celda_y = this.columnas.obtenercabecera(coor_y)

        if(celda_x==null){
            celda_x = new NodoCabeceraMD(coor_x)
            this.filas.insertar_nodoCabecera(celda_x)
        }
        if(celda_y == null){
            celda_y = new NodoCabeceraMD(coor_y)
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
    retornarNodo(fila,columna){
        try{
            let temporal = this.filas.obtenercabecera(fila).acceso
            while(temporal != null){
                if(temporal.x == fila && temporal.y == columna){
                    return temporal
                }
                temporal = temporal.derecha
            }
            return null
        }catch{
            return null
        }
    }
    graficar(){
        let codigodot = "digraph G { \ngraph [pad=\"0.5\", nodesep=\"1\", ranksep=\"1\"];\nlabel=\"Libros de categoria Thriller\" fontsize=28;\nnode [shape=box, height=0.8];\nPrimero[ label = \"0\", width = 1, group = 1];"
        //FILAS
        let temporalfila = this.filas.primero
        let idfila = ""
        let conexionesfilas = ""
        let nodosinteriores = ""
        let direccioninteriores = ""
        while(temporalfila != null){
            let primero = true
            let actual = temporalfila.acceso
            idfila += "\nFila" + actual.x+" [label = \"Repisa #" + actual.x + "\" group= 1];"
            if(temporalfila.siguiente != null){
                conexionesfilas += "\nFila" + actual.x + "->Fila" + temporalfila.siguiente.acceso.x + ";"
            }
            direccioninteriores +="\n{ rank = same; Fila" + actual.x + "; "
            while(actual != null){
                nodosinteriores += "\nNodoF" + actual.x + "_C" + actual.y + "[label=\"" + actual.libro.nombre + "\" group=" + actual.y + "];"
                direccioninteriores += "NodoF" + actual.x + "_C" + actual.y + "; "
                if(primero == true){
                    nodosinteriores += "\nFila"+actual.x + "-> NodoF" + actual.x + "_C" + actual.y + ";"
                    if(actual.derecha!= null){
                        nodosinteriores += "\nNodoF" + actual.x + "_C" + actual.y + "-> NodoF" + actual.derecha.x + "_C" + actual.derecha.y + ";"
                        nodosinteriores += "\nNodoF" + actual.derecha.x + "_C" + actual.derecha.y + "-> NodoF" + actual.x + "_C" + actual.y + ";"
                        primero = false
                    }else{
                        if(actual.derecha != null){
                            nodosinteriores += "\nNodoF" + actual.x + "_C" + actual.y + "-> NodoF" + actual.derecha.x + "_C" + actual.derecha.y + ";"
                            nodosinteriores += "\nNodoF" + actual.derecha.x + "_C" + actual.derecha.y + "-> NodoF" + actual.x + "_C" + actual.y + ";"
                        }
                    }
                }
                actual = actual.derecha
            }
            temporalfila = temporalfila.siguiente
            direccioninteriores+="}"
        }
        codigodot+= idfila + "\nedge[dir=\"both\"];" + conexionesfilas + "\nedge[dir=\"both\"];" 
        //COLUMNAS
        let temporalcolumna = this.columnas.primero
        let primeraC = this.columnas.primero.acceso.y
        let primeraF = this.filas.primero.acceso.x
        let idcolumna = ""
        let conexionescolumnas = ""
        let direccion = "\n{rank=same; Primero;"
        while(temporalcolumna != null){
            let primero1 = true
            let actual = temporalcolumna.acceso
            idcolumna+="\nColumna"+actual.y +" [label = \"Libros de la \\nColumna #" + actual.y + "\" group= "+actual.y+"];"
            direccion += "Columna" + actual.y + "; "
            if(temporalcolumna.siguiente != null){
                conexionescolumnas += "\nColumna" + actual.y + " -> Columna" + temporalcolumna.siguiente.acceso.y + ";"
            }
            while(actual != null){
                if(primero1 == true){
                    codigodot+="\nColumna"+ actual.y + " -> NodoF" + actual.x + "_C" + actual.y + ";"
                    if(actual.abajo != null){
                        codigodot+="\nNodoF" + actual.x + "_C" + actual.y + " -> NodoF"+ actual.abajo.x + "_C" + actual.abajo.y + ";"
                        codigodot+="\nNodoF" + actual.abajo.x + "_C" + actual.abajo.y + " -> NodoF"+ actual.x + "_C" + actual.y + ";"
                    }
                    primero1 = false
                }else{
                    if(actual.abajo != null){
                        codigodot+="\nNodoF" + actual.x + "_C" + actual.y + " -> NodoF"+ actual.abajo.x + "_C" + actual.abajo.y + ";"
                        codigodot+="\nNodoF" + actual.abajo.x + "_C" + actual.abajo.y + " -> NodoF"+ actual.x + "_C" + actual.y + ";"
                    }
                }
                actual = actual.abajo
            }
            temporalcolumna = temporalcolumna.siguiente
        }
        codigodot += idcolumna
        codigodot += conexionescolumnas
        codigodot += "\nPrimero -> Fila" + primeraF + "; \nPrimero -> Columna" + primeraC + ";"
        codigodot += direccion + "}"
        codigodot += nodosinteriores
        codigodot += direccioninteriores
        codigodot += "\n}"
        localStorage.setItem("dot_matrizdispersa",codigodot)
    }
}

class Libro{
    constructor(_isbn,_autor,_nombre,_cantidad,_fila,_columna,_paginas,_categoria){
        this.isbn = _isbn
        this.autor = _autor
        this.nombre = _nombre
        this.cantidad = _cantidad
        this.fila = _fila
        this.columna = _columna
        this.paginas = _paginas
        this.categoria = _categoria
    }
}
//CARGA MASIVA DE LIBROS
function CargaLibros(){
    let matriz_thriller = new MatrizDispersa()
    //let matriz_fantasia = new MatrizOrtogonal()
    let input_archivo = document.getElementById("inlibros");
    let archivo = input_archivo.files[0];
    let librosguardadost = JSON.parse(localStorage.getItem("matriz_libros_thriller"))
    let librosguardadosf = JSON.parse(localStorage.getItem("matriz_libros_fantasia"))
    if(librosguardadost != null){
        for(let i = 0;i<librosguardadost.length;i++){
            let nuevo1 = new Libro(librosguardadost[i].isbn,librosguardadost[i].autor,librosguardadost[i].nombre,librosguardadost[i].cantidad,librosguardadost[i].fila,librosguardadost[i].columna,librosguardadost[i].paginas,librosguardadost[i].categoria)
            matriz_thriller.insertar(parseInt(librosguardadost[i].fila),parseInt(librosguardadost[i].columna),nuevo1)
        }
    }
    if(librosguardadosf != null){
        for(let i = 0;i<librosguardadosf.length;i++){
            let nuevo2 = new Libro(librosguardadosf[i].isbn,librosguardadosf[i].autor,librosguardadosf[i].nombre,librosguardadosf[i].cantidad,librosguardadosf[i].fila,librosguardadosf[i].columna,librosguardadosf[i].paginas,librosguardadosf[i].categoria)
            
        }
    }
    if (!archivo) {
    return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        let texto = event.target.result;
        let jtexto = JSON.parse(texto)
        for(let i = 0; i<jtexto.length; i++){
            let isbn = jtexto[i].isbn;
            let autor = jtexto[i].nombre_autor;
            let nombre = jtexto[i].nombre_libro;
            let cantidad = jtexto[i].cantidad;
            let paginas = jtexto[i].paginas;
            let categoria = jtexto[i].categoria
            let fila = jtexto[i].fila
            let columna = jtexto[i].columna
            if(categoria == "Thriller"){
                let nuevo3 = new Libro(isbn,autor,nombre,cantidad,fila,columna,paginas,categoria)
                console.log(nuevo3)
                matriz_thriller.insertar(parseInt(fila),parseInt(columna),nuevo3)
            }else if(categoria == "Fantasia"){

            }
        }
        let guardar = "["
        for(let i = 0; i<=parseInt(matriz_thriller.filas.ultimo.id); i++){
            for(let j = 0; j<=parseInt(matriz_thriller.columnas.ultimo.id); j++){
                let nodom = matriz_thriller.retornarNodo(i,j)
                if(nodom != null){
                    guardar+= JSON.stringify(nodom.libro) + ","
                }
            }
        }
        const guardar2 = guardar.substring(0,guardar.length-1)
        guardar = guardar2 +"]"
        console.log(guardar)
        localStorage.setItem("matriz_libros_thriller",guardar)
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
