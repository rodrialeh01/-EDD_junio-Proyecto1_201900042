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
            if(_dpi == temporal.usuario.dpi){
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
        console.log(user)
        if(user != null){
            let nuevo = new NodoLibroU(_libro)
            if (user.abajo == null){
                user.abajo = nuevo
            }else{
                let temporal = user.abajo
                while(temporal != null){
                    if(temporal.abajo == null){
                        temporal.abajo = nuevo
                        break
                    }
                    temporal = temporal.abajo
                }
            }
            console.log("Se inserto el libro " + nuevo.nombre)
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
            let codigodot = "digraph G {\nnode [shape=box];\nlabel=\"Lista de Listas de Usuarios\"\nfontsize=28;"
            let nodos = ""
            let conexiones = ""
            let numnodo = 0
            let contador = 0
            let direccion = "\n{rank= same; "
            while(contador!= this.tamanio){
                let numnodolib = 1
                nodos +="Nodo" + numnodo + "[label=\"Nombre: " + temporal.usuario.nombre + "\\nUsername: "+temporal.usuario.username+"\\nDPI: "+temporal.usuario.dpi+"\\nRol: "+temporal.usuario.rol+"\" group="+contador+"];\n"
                direccion += "Nodo" + numnodo + "; "
                if(temporal.abajo != null){
                    let temporal2 = temporal.abajo
                    while(temporal2 != null){
                        nodos +="Nodo" + numnodo+"_"+numnodolib + "[label=\"Libro: " + temporal2.nombre +"\" group="+contador+"];\n"
                        temporal2 = temporal2.abajo
                        numnodolib++
                    }
                    temporal2 = temporal.abajo
                    numnodolib = 1
                    conexiones += "Nodo" + numnodo + "->Nodo" +numnodo + "_" +numnodolib + ";\n"
                    while(temporal2 != null){
                        if(temporal2.abajo != null){
                            let auxlib = numnodolib +1
                            conexiones += "Nodo" + numnodo + "_" + numnodolib + "->Nodo" +numnodo + "_" +auxlib + ";\n"
                        }
                        temporal2 = temporal2.abajo
                        numnodolib++
                    }
                }
                temporal = temporal.siguiente
                contador++
                numnodo++
            }
            direccion += "}\n"
            contador = 0
            numnodo = 0
            while(contador!= this.tamanio-1){
                let numaux = numnodo +1
                conexiones += "\tNodo" + numnodo + "->Nodo" + numaux + ";\n"
                numnodo++
                contador++
            }
            conexiones += "\tNodo" + (this.tamanio-1) + "->Nodo0;\n"

            codigodot += nodos +direccion+ conexiones + "}"
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
    retornarCantidadLibros(_dpi){
        let user = this.retornarusuario(_dpi)
        if(user.abajo == null){
            return 0
        }else{
            let temporal = user.abajo
            let contador = 0
            while(temporal != null){
                contador++
                temporal = temporal.abajo
            }
            return contador
        }
    }
    retornarlibro(_dpi,_libro){
        let user = this.retornarusuario(_dpi)
        if(user.abajo == null){
            return null
        }else{
            let temporal = user.abajo
            while(temporal != null){
                if(temporal.nombre == _libro){
                    return temporal.nombre
                }
                temporal = temporal.abajo
            }
            return null
        }
    }
    retornarcantlibro(_dpi,_libro){
        let user = this.retornarusuario(_dpi)
        let contador = 0
        if(user.abajo == null){
            return 0
        }else{
            let temporal = user.abajo
            while(temporal != null){
                if(temporal.nombre == _libro){
                    contador++
                }
                temporal = temporal.abajo
            }
            return contador
        }
    }
}

//-------------LISTA DOBLEMENTE ENLAZADA----------------
class NodoDU{
    constructor(_usuario, _cantidad){
        this.usuario = _usuario
        this.cantidad = _cantidad
        this.siguiente = null
        this.anterior = null
    }
}

class ListaDoble{
    constructor(){
        this.primero = null
        this.ultimo = null
        this.tamanio = 0
    }
    insertar(_usuario, _cantidad){
        let nuevo = new NodoDU(_usuario,_cantidad)
        if(this.primero == null && this.ultimo == null){
            this.primero = nuevo
            this.ultimo = nuevo
        }else if(this.primero == this.ultimo){
            this.ultimo = nuevo
            this.primero.siguiente = this.ultimo
            this.ultimo.anterior = this.primero
        }else{
            nuevo.anterior = this.ultimo
            this.ultimo.siguiente = nuevo
            this.ultimo = nuevo
        }
        this.tamanio++
    }
    ordenar(){
        let actual = this.primero
        let aux = actual.siguiente
        if(actual!= null && aux != null){
            let i = this.primero
            while(i != null){
                let j = i.siguiente
                while(j != null){
                    if(i.cantidad < j.cantidad){
                        let temporal1 = i.cantidad
                        let temporal2 = i.usuario
                        i.cantidad = j.cantidad
                        i.usuario = j.usuario
                        j.cantidad = temporal1
                        j.usuario = temporal2
                    }
                    j = j.siguiente
                }
                i = i.siguiente
            }
        }
    }
    graficar(){
        if(this.tamanio!= 0){
            let temporal = this.primero
            let codigodot = "digraph G {\ngraph [pad=\"0.5\", nodesep=\"1\", ranksep=\"1\"];\nnode [shape=box];\nlabel=\"Lista Doblemente Enlazada\"\nfontsize=28;\nedge[dir=\"both\"]\n"
            let nodos = ""
            let conexiones = ""
            let numnodo = 0
            let contador = 0
            let direccion = "\n{rank= same; "
            if(this.tamanio <5){
                while(contador!= this.tamanio){
                    nodos +="Nodo" + numnodo + "[label=\"Nombre: " + temporal.usuario.nombre + "\\nUsuario: "+temporal.usuario.username + "\\nCantidad: "+temporal.cantidad+"\"];\n"
                    direccion += "Nodo" + numnodo + "; "
                    temporal = temporal.siguiente
                    contador++
                    numnodo++
                }
                direccion += "}\n"
                contador = 0
                numnodo = 0
                while(contador!= this.tamanio-1){
                    let numaux = numnodo +1
                    conexiones += "\tNodo" + numnodo + "->Nodo" + numaux + ";\n"
                    numnodo++
                    contador++
                }
                codigodot += nodos +direccion+ conexiones + "}"
            }else{
                while(contador!= 5){
                    nodos +="Nodo" + numnodo + "[label=\"Nombre: " + temporal.usuario.nombre + "\\nUsuario: "+temporal.usuario.username + "\\nCantidad: "+temporal.cantidad+"\", width=1];\n"
                    direccion += "Nodo" + numnodo + "; "
                    temporal = temporal.siguiente
                    contador++
                    numnodo++
                }
                direccion += "}\n"
                contador = 0
                numnodo = 0
                while(contador!= 4){
                    let numaux = numnodo +1
                    conexiones += "\tNodo" + numnodo + "->Nodo" + numaux + ";\n"
                    numnodo++
                    contador++
                }
                codigodot += nodos +direccion+ conexiones + "}"
            }
            
            localStorage.setItem("dot_top_users",codigodot)
            console.log(codigodot)
        }
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
    console.log(usuarios)
    for(let i = 0;i<usuarios.length;i++){
        nuevo = new Usuario(usuarios[i].dpi,usuarios[i].nombre,usuarios[i].username,usuarios[i].correo,usuarios[i].rol,usuarios[i].contrasenia,usuarios[i].telefono)
        lusuarios.insertarusuario(nuevo)
    }
    if(lusuarios.verificarusuario(user,password)==true){
        alert("Bienvenido Admin")
        location.href = "../Administrador/carga.html"
    }else if(lusuarios.verificarusuario(user,password)==false){
        let us = lusuarios.retornarusuariologin(user,password)
        alert("Bienvenido " + user)
        sessionStorage.setItem("usuariologueado",JSON.stringify(us))
        location.href = "../Usuario/librera1.html"
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
                        break
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
        let codigodot = "digraph G { \nbgcolor=\"#841621\"; \ngraph [pad=\"0.5\", nodesep=\"1\", ranksep=\"1\"];\nlabel=\"Matriz Dispersa de Libros de categoria Thriller\" fontcolor=\"white\"fontname=\"Roboto Condensed\" fontsize=28;\nnode [shape=box, height=0.8];\nPrimero[style=\"filled\",fillcolor=\"black\",label = \"0\",fontcolor=\"white\", group = 0];"
        //FILAS
        let temporalfila = this.filas.primero
        let idfila = ""
        let conexionesfilas = ""
        let nodosinteriores = ""
        let direccioninteriores = ""
        while(temporalfila != null){
            let primero = true
            let actual = temporalfila.acceso
            idfila += "\nFila" + actual.x+" [style=\"filled\",fontname=\"Roboto Condensed\",fillcolor=\"black\",fontcolor=\"white\", label = \"" + actual.x + "\" group= 0];"
            if(temporalfila.siguiente != null){
                conexionesfilas += "\nFila" + actual.x + "->Fila" + temporalfila.siguiente.acceso.x + ";"
            }
            direccioninteriores +="\n{ rank = same; Fila" + actual.x + "; "
            while(actual != null){
                nodosinteriores += "\nNodoF" + actual.x + "_C" + actual.y + "[style=\"filled\",fontname=\"Roboto Condensed\",fillcolor=\"white\",label=\"" + actual.libro.nombre + "\" group=" + actual.y + "];"
                direccioninteriores += "NodoF" + actual.x + "_C" + actual.y + "; "
                if(primero == true){
                    nodosinteriores += "\nFila"+actual.x + "-> NodoF" + actual.x + "_C" + actual.y + ";"
                    if(actual.derecha!= null){
                        nodosinteriores += "\nNodoF" + actual.x + "_C" + actual.y + "-> NodoF" + actual.derecha.x + "_C" + actual.derecha.y + ";"
                        primero = false
                    }else{
                        if(actual.derecha != null){
                            nodosinteriores += "\nNodoF" + actual.x + "_C" + actual.y + "-> NodoF" + actual.derecha.x + "_C" + actual.derecha.y + ";"
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
            idcolumna+="\nColumna"+actual.y +" [style=\"filled\",fillcolor=\"black\",fontname=\"Roboto Condensed\",fontcolor=\"white\",label = \"" + actual.y + "\" group= "+actual.y+"];"
            direccion += "Columna" + actual.y + "; "
            if(temporalcolumna.siguiente != null){
                conexionescolumnas += "\nColumna" + actual.y + " -> Columna" + temporalcolumna.siguiente.acceso.y + ";"
            }
            while(actual != null){
                if(primero1 == true){
                    codigodot+="\nColumna"+ actual.y + " -> NodoF" + actual.x + "_C" + actual.y + ";"
                    if(actual.abajo != null){
                        codigodot+="\nNodoF" + actual.x + "_C" + actual.y + " -> NodoF"+ actual.abajo.x + "_C" + actual.abajo.y + ";"
                    }
                    primero1 = false
                }else{
                    if(actual.abajo != null){
                        codigodot+="\nNodoF" + actual.x + "_C" + actual.y + " -> NodoF"+ actual.abajo.x + "_C" + actual.abajo.y + ";"
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
    graficarlibrera(){
        let codigodot = "digraph G { \nbgcolor=\"transparent\"; \ngraph [pad=\"0.5\", nodesep=\"1\", ranksep=\"1\"];\nnode [shape=box, height=0.8];\nPrimero[style=\"filled\",fontname=\"Roboto Condensed\",fillcolor=\"saddlebrown\",label = \"\", width = 1, group = 0];"
        //FILAS
        let temporalfila = this.filas.primero
        let idfila = ""
        let conexionesfilas = ""
        let nodosinteriores = ""
        let direccioninteriores = ""
        while(temporalfila != null){
            let primero = true
            let actual = temporalfila.acceso
            idfila += "\nFila" + actual.x+" [style=\"filled\",fontname=\"Roboto Condensed\",fillcolor=\"saddlebrown\",fontcolor=\"white\", label = \"Repisa #" + actual.x + "\" group= 0];"
            if(temporalfila.siguiente != null){
                conexionesfilas += "\nFila" + actual.x + "->Fila" + temporalfila.siguiente.acceso.x + "[color=\"white\"];"
            }
            direccioninteriores +="\n{ rank = same; Fila" + actual.x + "; "
            while(actual != null){
                nodosinteriores += "\nNodoF" + actual.x + "_C" + actual.y + "[style=\"filled\",fontname=\"Roboto Condensed\",fillcolor=\"lightsalmon\",label=\"" + actual.libro.nombre + "\" group=" + actual.y + "];"
                direccioninteriores += "NodoF" + actual.x + "_C" + actual.y + "; "
                if(primero == true){
                    nodosinteriores += "\nFila"+actual.x + "-> NodoF" + actual.x + "_C" + actual.y + "[color=\"white\"];"
                    if(actual.derecha!= null){
                        nodosinteriores += "\nNodoF" + actual.x + "_C" + actual.y + "-> NodoF" + actual.derecha.x + "_C" + actual.derecha.y + "[color=\"white\"];"
                        primero = false
                    }else{
                        if(actual.derecha != null){
                            nodosinteriores += "\nNodoF" + actual.x + "_C" + actual.y + "-> NodoF" + actual.derecha.x + "_C" + actual.derecha.y + "[color=\"white\"];"
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
            idcolumna+="\nColumna"+actual.y +" [style=\"filled\",fontname=\"Roboto Condensed\",fillcolor=\"saddlebrown\",fontcolor=\"white\",label = \"Libros de la \\nColumna #" + actual.y + "\" group= "+actual.y+"];"
            direccion += "Columna" + actual.y + "; "
            if(temporalcolumna.siguiente != null){
                conexionescolumnas += "\nColumna" + actual.y + " -> Columna" + temporalcolumna.siguiente.acceso.y + "[color=\"white\"];"
            }
            while(actual != null){
                if(primero1 == true){
                    codigodot+="\nColumna"+ actual.y + " -> NodoF" + actual.x + "_C" + actual.y + "[color=\"white\"];"
                    if(actual.abajo != null){
                        codigodot+="\nNodoF" + actual.x + "_C" + actual.y + " -> NodoF"+ actual.abajo.x + "_C" + actual.abajo.y + "[color=\"white\"];"
                    }
                    primero1 = false
                }else{
                    if(actual.abajo != null){
                        codigodot+="\nNodoF" + actual.x + "_C" + actual.y + " -> NodoF"+ actual.abajo.x + "_C" + actual.abajo.y + "[color=\"white\"];"
                    }
                }
                actual = actual.abajo
            }
            temporalcolumna = temporalcolumna.siguiente
        }
        codigodot += idcolumna
        codigodot += conexionescolumnas
        codigodot += "\nPrimero -> Fila" + primeraF + "[color=\"white\"]; \nPrimero -> Columna" + primeraC + "[color=\"white\"];"
        codigodot += direccion + "}"
        codigodot += nodosinteriores
        codigodot += direccioninteriores
        codigodot += "\n}"
        localStorage.setItem("librera_matrizdispersa",codigodot)
    }
}

//--------------MATRIZ ORTOGONAL------------------
class NodoCO{
    constructor(_libro,_x,_y){
        this.libro = _libro
        this.x = _x
        this.y = _y
        this.abajo = null
        this.siguiente = null
    }
}

class ListaMO{
    constructor(){
        this.raiz = null
        this.ultimo = null
    }
    insertarlista(_libro,_x){
        let nuevo = new NodoCO(_libro,_x,0)
        if(this.raiz == null){
            this.raiz = nuevo
            this.ultimo = nuevo
        }else{
            this.ultimo.siguiente = nuevo
            this.ultimo = nuevo
        }

        let temporal = this.ultimo
        for(let cy = 25; cy>= 1; cy--){
            let nuevon = new NodoCO(_libro,_x,cy)
            let aux = this.ultimo.abajo
            temporal.abajo = nuevon
            nuevon.abajo = aux
        }
    }

    retornarlista(_x){
        let temporal = this.raiz
        while(temporal != null){
            if(temporal.x == _x){
                return temporal
            }
            temporal = temporal.siguiente
        }
        return null
    }
}

class MatrizOrtogonal{
    constructor(){
        this.lista_x = new ListaMO()
    }

    llenarmatriz(){
        for(let i = 1; i < 26; i++){
            this.lista_x.insertarlista(null,i)
        }
    }
    
    insertar(_coorx,_coory,_libro){
        let list_x = this.lista_x.retornarlista(_coorx)
        let list_y = list_x.abajo
        while(list_y != null){
            if(list_y.y == _coory){
                list_y.libro = _libro
                break
            }
            list_y = list_y.abajo
        }
    }

    retornarlibro(_nombre){
        let contx = 1
        while(contx != 26){
            let list_x = this.lista_x.retornarlista(contx)
            let tempo = list_x.abajo
            while(tempo != null){
                if(tempo.libro != null){
                    if(tempo.libro.nombre == _nombre){
                        return tempo.libro
                    }
                }
                tempo = tempo.abajo
            }
            contx++
        }
        return null
    }

    retornarnodolibro(_x,_y){
        let contx = 1
        while(contx != 26){
            if(contx == _x){
                let list_x = this.lista_x.retornarlista(contx)
                let tempo = list_x.abajo
                while(tempo != null){
                    if(tempo.y == _y){
                        return tempo.libro
                    }
                    tempo = tempo.abajo
                }
            }
            contx++
        }
        return null
    }

    graficar(){
        if(this.tamanio!= 0){
            let contx = 1
            let temporalx = this.lista_x.retornarlista(contx)
            let codigodot = "digraph G {\nbgcolor=\"#841621\";\ngraph [pad=\"0.3\", nodesep=\"0.6\", ranksep=\"0.6\"];\nnode [shape=box];\nlabel=\"Matriz Ortogonal de libros de categoria Fantasia\"fontcolor=\"white\"fontname=\"Roboto Condensed\" fontsize=58;\nedge[dir=\"both\" color=\"white\"]\n"
            let nodos = ""
            let conexiones = ""
            let numnodo = 1
            let direccion = ""
            while(temporalx!= null){
                let numnodolib = 1
                let temporaly = temporalx.abajo
                while(temporaly != null){
                    if(temporaly.libro != null){
                        nodos +="Nodo" + numnodo+"_"+numnodolib + "[style=\"filled\",fillcolor=\"black\",fontname=\"Roboto Condensed\",fontcolor=\"white\",label=\"" + temporaly.libro.nombre + "\\n(" + temporaly.libro.fila +"," + temporaly.libro.columna +")\" group="+temporaly.y+"];\n"
                        temporaly = temporaly.abajo
                        numnodolib++
                    }else{
                        nodos +="Nodo" + numnodo+"_"+numnodolib + "[style=\"filled\",fillcolor=\"black\",fontname=\"Roboto Condensed\",fontcolor=\"white\",label=\" \" group="+temporaly.y+"];\n"
                        temporaly = temporaly.abajo
                        numnodolib++
                    }
                }
                temporaly = temporalx.abajo
                let numnodolib2 = 1
                while(temporaly != null){
                    if(temporaly.abajo != null){
                        let auxlib = numnodolib2 +1
                        conexiones += "Nodo" + numnodo + "_" + numnodolib2 + "->Nodo" +numnodo + "_" +auxlib + ";\n"
                    }
                    temporaly = temporaly.abajo
                    numnodolib2++
                }
                temporalx = temporalx.siguiente
                contx++
                numnodo++
            }
            let coy = 1
            while(coy != 26){
                let cox = 1
                while(cox != 25){
                    let aux = cox+1
                    if(aux != 26){
                        conexiones += "Nodo" + cox + "_" + coy + "->Nodo" +aux + "_" +coy + ";\n"
                    }
                    cox++
                }
                coy++
            }

            let cy = 1
            while(cy != 26){
                let cx = 1
                direccion+="\n{rank= same; "
                while(cx!=26){
                    direccion+= "Nodo"+ cy + "_"+cx+"; "
                    cx++
                }
                direccion +="}\n"
                cy++
            }
            codigodot += nodos +direccion+ conexiones + "}"
            localStorage.setItem("dot_matrizortogonal",codigodot)
            console.log(codigodot)
        }    
    }
    graficarlibrera(){
        if(this.tamanio!= 0){
            let contx = 1
            let temporalx = this.lista_x.retornarlista(contx)
            let codigodot = "digraph G {\nbgcolor=\"transparent\";\ngraph [pad=\"0.3\", nodesep=\"0.6\", ranksep=\"0.6\"];\nnode [shape=box];\nedge[dir=\"both\" color=\"white\"]\n"
            let nodos = ""
            let conexiones = ""
            let numnodo = 1
            let direccion = ""
            while(temporalx!= null){
                let numnodolib = 1
                let temporaly = temporalx.abajo
                if(temporaly.abajo != null){
                    while(temporaly != null){
                        if(temporaly.libro != null){
                            nodos +="Nodo" + numnodo+"_"+numnodolib + "[style=\"filled\",fontname=\"Roboto Condensed\",fillcolor=\"lightsalmon\",label=\"" + temporaly.libro.nombre + "\\n(" + temporaly.libro.fila +"," + temporaly.libro.columna +")\" group="+temporaly.y+"];\n"
                            temporaly = temporaly.abajo
                            numnodolib++
                        }else{
                            nodos +="Nodo" + numnodo+"_"+numnodolib + "[style=\"filled\",fontname=\"Roboto Condensed\",fillcolor=\"lightsalmon\",label=\" \" group="+temporaly.y+"];\n"
                            temporaly = temporaly.abajo
                            numnodolib++
                        }
                    }
                    temporaly = temporalx.abajo
                    numnodolib = 1
                    while(temporaly != null){
                        if(temporaly.abajo != null){
                            let auxlib = numnodolib +1
                            conexiones += "Nodo" + numnodo + "_" + numnodolib + "->Nodo" +numnodo + "_" +auxlib + ";\n"
                        }
                        temporaly = temporaly.abajo
                        numnodolib++
                    }
                    numnodolib = 1
                }
                temporalx = temporalx.siguiente
                contx++
                numnodo++
            }
            let coy = 1
            while(coy != 26){
                let cox = 1
                while(cox != 25){
                    let aux = cox+1
                    if(aux != 26){
                        conexiones += "Nodo" + cox + "_" + coy + "->Nodo" +aux + "_" +coy + ";\n"
                    }
                    cox++
                }
                coy++
            }

            let cy = 1
            while(cy != 26){
                let cx = 1
                direccion+="\n{rank= same; "
                while(cx!=26){
                    direccion+= "Nodo"+ cy + "_"+cx+"; "
                    cx++
                }
                direccion +="}\n"
                cy++
            }
            codigodot += nodos +direccion+ conexiones + "}"
            localStorage.setItem("librera_matrizortogonal",codigodot)
            console.log(codigodot)
        }    
    }
}

//--------------PILA------------------
class NodoPila{
    constructor(_numero){
        this.numero = _numero
        this.abajo = null
    }
}
class Pila{
    constructor(){
        this.cima = null
        this.tamanio = 0
    }
    insertar(_numero){
        let nuevo = new NodoPila(_numero)
        nuevo.abajo = this.cima
        this.cima = nuevo
        this.tamanio++
    }
    sacar(){
        this.cima = this.cima.abajo
        this.tamanio--
    }
    graficar(){
        let codigodot ="digraph Libro{\nrankdir=LR\nnode[shape=Mrecord];\n"
        let nodos = "Ejemplar[style=\"filled\" fillcolor=\"#91CD83\" color=\"#309A17\" fontcolor=\"#91CD83\"label = \""
        let actual = this.cima
        while(actual != null){
            if(actual.abajo == null){
                nodos += actual.numero
                actual = actual.abajo
            }else{
                nodos+= actual.numero +  "|"
                actual = actual.abajo
            }
        }
        nodos +="\"];\n"
        codigodot+= nodos
        codigodot += "}"
        console.log(codigodot)
        localStorage.setItem("pila_cantidad",codigodot)
    }
}

//-------COLA-----------
class Pendiente{
    constructor(_usuario,_libro, _cantidad){
        this.usuario = _usuario
        this.libro = _libro
        this.cantidad = _cantidad
    }
}
class NodoCola{
    constructor(_pendiente){
        this.pendiente = _pendiente
        this.siguiente = null
    }
}

class Cola{
    constructor(){
        this.primero = null
        this.tamanio = 0
    }
    insertar(_pendiente){
        let nuevo = new NodoCola(_pendiente)
        if(this.primero == null){
            this.primero = nuevo
        }else{
            let temp = this.primero
            while(temp != null){
                if(temp.siguiente == null){
                    break
                }
                temp = temp.siguiente
            }
            temp.siguiente = nuevo
        }
        this.tamanio++
    }
    graficar(){
        let codigodot = "digraph G{\n\trankdir=\"RL\";\n\tlabel=\" Cola de libros pendientes \";\n\tnode [shape=box];\n"
        let temporal = this.primero
        let conexiones = ""
        let nodos = ""
        let numnodo = 0
        while(temporal!= null){
            nodos+= "\tNodo" + numnodo + "[style=\"filled\",label=\"Cliente=" + temporal.pendiente.usuario + "\\nNombre_libro="+temporal.pendiente.libro+"\\nCantidad="+temporal.pendiente.cantidad+"\", fillcolor=\"white\"];\n"
            if(temporal.siguiente!= null){
                let auxnum = numnodo+1
                conexiones+="\t\tNodo" + auxnum + "-> Nodo" + numnodo + ";\n"
            }
            temporal = temporal.siguiente
            numnodo++
        }
        codigodot+=nodos + "\n"+conexiones + "\n}"
        console.log(codigodot)
        localStorage.setItem("dot_cola_libros", codigodot)
    }
}

//-----------LISTA SIMPLE----------------
class NodoLib{
    constructor(_libro){
        this.libro = _libro
        this.siguiente = null
    }
}

class ListaSimple{
    constructor(){
        this.cabeza = null
        this.tamanio = 0
    }
    insertar(_libro){
        let nuevo = new NodoLib(_libro)
        nuevo.siguiente = this.cabeza
        this.cabeza = nuevo
        console.log(nuevo)
        this.tamanio++
    }

    //ORDENAMIENTO BURBUJA
    ordenamientoascendente(){
        if(this.cabeza != null && this.cabeza.siguiente != null){
            let i = 0
            while(i != this.tamanio){
                let actual = this.cabeza
                let j = 0
                while(j != this.tamanio-1){
                    if(actual.siguiente != null ){
                        if(actual.libro.nombre>actual.siguiente.libro.nombre){
                            let temp = actual.libro
                            actual.libro = actual.siguiente.libro
                            actual.siguiente.libro = temp
                        }
                    }
                    actual = actual.siguiente
                    j++
                }
                i++
            }
        }
        
    }
    //ORDENAMIENTO QUICKSORT
    ordenamientodescendente(izquierda, derecha){
        let pivote = new NodoLib(izquierda.libro)
        let i = izquierda
        let j = derecha
        let conti=-1, contj = -1
        let actual = this.cabeza
        while(actual!= null){
            conti++
            if(actual== izquierda){
                break
            }
            actual = actual.siguiente
        }
        actual = this.cabeza
        while(actual != null){
            contj++
            if(actual == derecha){
                break
            }
            actual = actual.siguiente
        }
        let izq = conti
        let der = contj
        while(conti<contj){
            while(i.libro.nombre >= pivote.libro.nombre && conti<contj){
                conti++
                i = i.siguiente
            }
            while(j.libro.nombre < pivote.libro.nombre){
                contj--
                let tem = this.cabeza
                while(tem != null){
                    if(tem.siguiente == j){
                        break
                    }
                    tem = tem.siguiente
                }
                j = tem
            }
            if(conti<contj){
                let aux = new NodoLib(i.libro)
                i.libro = j.libro
                j.libro = aux.libro
            }
        }

        izquierda.libro = j.libro
        j.libro = pivote.libro
        let temp = this.cabeza
        while(temp!= null){
            if(temp.siguiente == j){
                break
            }
            temp = temp.siguiente
        }
        if(izq<contj-1){
            this.ordenamientodescendente(izquierda,temp)
        }
        if(contj+1<der){
            this.ordenamientodescendente(j.siguiente, derecha)
        }
    }
}

//-----CLASE LIBRO------
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
    let matriz_fantasia = new MatrizOrtogonal()
    matriz_fantasia.llenarmatriz()
    let input_archivo = document.getElementById("inlibros");
    let archivo = input_archivo.files[0];
    let librosguardadost = JSON.parse(localStorage.getItem("matriz_libros_thriller"))
    console.log(librosguardadost)
    let librosguardadosf = JSON.parse(localStorage.getItem("matriz_libros_fantasia"))
    console.log(librosguardadosf)
    if(librosguardadost != null){
        for(let i = 0;i<librosguardadost.length;i++){
            let nuevo1 = new Libro(librosguardadost[i].isbn,librosguardadost[i].autor,librosguardadost[i].nombre,librosguardadost[i].cantidad,librosguardadost[i].fila,librosguardadost[i].columna,librosguardadost[i].paginas,librosguardadost[i].categoria)
            matriz_thriller.insertar(parseInt(librosguardadost[i].fila),parseInt(librosguardadost[i].columna),nuevo1)
        }
    }
    if(librosguardadosf != null){
        for(let i = 0;i<librosguardadosf.length;i++){
            let nuevo2 = new Libro(librosguardadosf[i].isbn,librosguardadosf[i].autor,librosguardadosf[i].nombre,librosguardadosf[i].cantidad,librosguardadosf[i].fila,librosguardadosf[i].columna,librosguardadosf[i].paginas,librosguardadosf[i].categoria)
            matriz_fantasia.insertar(parseInt(librosguardadosf[i].fila),parseInt(librosguardadosf[i].columna),nuevo2)
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
                let nuevo4 = new Libro(isbn,autor,nombre,cantidad,fila,columna,paginas,categoria)
                console.log(nuevo4)
                matriz_fantasia.insertar(parseInt(fila),parseInt(columna),nuevo4)
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

        guardar = "["
        for(let i = 0; i<=25; i++){
            for(let j = 0; j<=25; j++){
                let nodolib = matriz_fantasia.retornarnodolibro(i,j)
                if(nodolib != null){
                    guardar+= JSON.stringify(nodolib) + ","
                }
            }
        }
        const guardar3 = guardar.substring(0,guardar.length-1)
        guardar = guardar3 +"]"
        console.log(guardar)
        localStorage.setItem("matriz_libros_fantasia",guardar)
    });
    reader.readAsText(archivo, "UTF-8");
    alert("Ha cargado libros exitosamente")
}

//================================================================AUTORES======================================================

//---------ARBOL BINARIO-------------
class NodoAutor{
    constructor(_autor){
        this.autor = _autor
        this.izquierda = null
        this.derecha = null
    }
}

class ArbolBinario{
    constructor(){
        this.raiz = null
        this.codigodot = ""
    }
    insertarautor(_autor){
        this.raiz = this.add(_autor, this.raiz)
    }

    add(_autor, nodo){
        if(nodo == null){
            return new NodoAutor(_autor)
        }else{
            if(_autor.nombre < nodo.autor.nombre){
                nodo.izquierda = this.add(_autor, nodo.izquierda)
            }else if(_autor.nombre > nodo.autor.nombre){
                nodo.derecha = this.add(_autor, nodo.derecha)
            }
        }
        return nodo
    }

    preordenD(){
        this.pre_ordenD(this.raiz)
    }
    pre_ordenD(nodo){
        if(nodo != null){
            this.codigodot += "\nnodo" + nodo.autor.dpi + "[shape=circle,style=\"filled\",fillcolor=\"black\",fontname=\"Roboto Condensed\", label = \"" + nodo.autor.nombre + "\",fontcolor=\"white\"];"
            if(nodo.izquierda != null){
                this.codigodot += "\nnodo"+nodo.autor.dpi + " -> nodo" + nodo.izquierda.autor.dpi + "[headport=n];"
            }
            if(nodo.derecha != null){
                this.codigodot += "\nnodo"+nodo.autor.dpi + " -> nodo" + nodo.derecha.autor.dpi + "[headport=n];"
            }
            this.pre_ordenD(nodo.izquierda)
            this.pre_ordenD(nodo.derecha)
        }
    }

    graficar(){
        this.codigodot = "digraph G{\nbgcolor=\"#841621\";\nlabel=\"Arbol Binario de Autores\" fontcolor=\"white\"fontname=\"Roboto Condensed\" fontsize=28;\nedge[color=\"white\"];\nsplines=false;"
        this.preordenD()
        this.codigodot+="\n}"
        console.log(this.codigodot)
        localStorage.setItem("dot_abb",this.codigodot)
    }
    
    buscar(nodo,_nombre){
        if(nodo == null){
            return null
        }else{
            if(nodo.autor.nombre == _nombre){
                return nodo.autor
            }else if(_nombre < nodo.autor.nombre){
                return this.buscar(nodo.izquierda,_nombre)
            }else if(_nombre > nodo.autor.nombre){
                return this.buscar(nodo.derecha,_nombre)
            }
        }
    }
    
}

//----------CLASE AUTOR-----------
class Autor{
    constructor(_dpi,_nombre,_correo,_telefono,_direccion,_biografia){
        this.dpi = _dpi
        this.nombre = _nombre
        this.correo = _correo
        this.telefono = _telefono
        this.direccion = _direccion
        this.biografia = _biografia
    }
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
        let jtexto = JSON.parse(texto)
        let arbol = new ArbolBinario()
        for(let i = 0; i<jtexto.length; i++){
            let dpi = jtexto[i].dpi;
            let nombre = jtexto[i].nombre_autor;
            let correo = jtexto[i].correo;
            let telefono = jtexto[i].telefono;
            let direccion = jtexto[i].direccion;
            let biografia = jtexto[i].biografia;
            let nuevo = new Autor(dpi,nombre,correo,telefono,direccion,biografia)
            arbol.insertarautor(nuevo)
        }
        let guardar = JSON.stringify(jtexto)
        localStorage.setItem("autores",guardar)
    });
    reader.readAsText(archivo, "UTF-8");
    alert("Se cargaron los autores exitosamente")
}
