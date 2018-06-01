{
    let color;
    let circulosRellenar;
    let numeroDecoloresmetidos;
    let numeroLineas;
    let btnComprobar;
    let circulosComprobar;
    let paletaJuego;
    let juegoAcabado;
    let btnSalir;
    let btnReiniciar;
    //Añade un color al circulo y un evento para poder quitarlo
    let addCirculo = function () {
        for (let i = 0; i < 4; i++) {
            if (circulosRellenar[i].style.backgroundColor == "" || circulosRellenar[i].style.backgroundColor == "transparent") {
                switch (this.id) {
                    case "circuloRojo":
                        circulosRellenar[i].style = "background-color: red;";
                        break;
                    case "circuloBlanco":
                        circulosRellenar[i].style = "background-color: white;";
                        break;

                    case "circuloNegro":
                        circulosRellenar[i].style = "background-color: black;";
                        break;

                    case "circuloVerde":
                        circulosRellenar[i].style = "background-color: green;";
                        break;

                    case "circuloAzul":
                        circulosRellenar[i].style = "background-color: blue;";
                        break;

                    case "circuloAmarillo":
                        circulosRellenar[i].style = "background-color: yellow;";
                        break;

                    case "circuloMarron":
                        circulosRellenar[i].style = "background-color: brown;";
                        break;

                    case "circuloNaranja":
                        circulosRellenar[i].style = "background-color: orange;";
                        break;
                }
                circulosRellenar[i].addEventListener("click", quitarColor);
                break;
            }
        }
        numeroDecoloresmetidos++;
    }
    //QUita el color del circulo
    let quitarColor = function () {
        this.style = "background-color: transparent;";
        this.removeEventListener("click", quitarColor);
        numeroDecoloresmetidos--;
    }
    //Evento que quita el color
    let quitarEventoLineaAnterior = function () {
        for (let i = 0; i < circulosRellenar.length; i++) {
            circulosRellenar[i].removeEventListener("click", quitarColor);
            circulosRellenar[i].style.pointerEvents = "none";
        }
    }
    //NUeva linea de circulos
    let crearNuevaLinea = function () {
        quitarEventoLineaAnterior();
        let filaRellenar = document.createElement("div");
        filaRellenar.id = "filaRellenar";
        let nuevoCirculosRellenar = document.createElement("div");
        nuevoCirculosRellenar.id = "circulosRellenar";
        let nuevoCirculosComprobar = document.createElement("div");
        nuevoCirculosComprobar.id = "circulosComprobar";
        let nuevoCirculoRellenar;
        let nuevoCirculoComprobar;
        for (let i = 0; i < 4; i++) {
            nuevoCirculoRellenar = document.createElement("div");
            nuevoCirculoRellenar.classList.add("circuloRellenar");
            nuevoCirculoRellenar.classList.add("circuloRellenar" + numeroLineas);
            nuevoCirculosRellenar.appendChild(nuevoCirculoRellenar);
            nuevoCirculoComprobar = document.createElement("div");
            nuevoCirculoComprobar.classList.add("circuloComprobar");
            nuevoCirculoComprobar.classList.add("circuloComprobar" + numeroLineas);
            nuevoCirculosComprobar.appendChild(nuevoCirculoComprobar);
        }
        filaRellenar.appendChild(nuevoCirculosRellenar);
        filaRellenar.appendChild(nuevoCirculosComprobar);
        paletaJuego.appendChild(filaRellenar);
        numeroDecoloresmetidos = 0;
        circulosRellenar = document.getElementsByClassName("circuloRellenar" + numeroLineas);
        circulosComprobar = document.getElementsByClassName("circuloComprobar" + numeroLineas);
        numeroLineas++;
    }
    let getColores = function(){
    	let arrayColoresComprobar = [];
        for (let i = 0; i < circulosRellenar.length; i++) {
            if (circulosRellenar[i].style.backgroundColor == "red") {
                arrayColoresComprobar.push("rojo");
            } else if (circulosRellenar[i].style.backgroundColor == "white") {
                arrayColoresComprobar.push("blanco");
            } else if (circulosRellenar[i].style.backgroundColor == "black") {
                arrayColoresComprobar.push("negro");
            } else if (circulosRellenar[i].style.backgroundColor == "green") {
                arrayColoresComprobar.push("verde");
            } else if (circulosRellenar[i].style.backgroundColor == "blue") {
                arrayColoresComprobar.push("azul");
            } else if (circulosRellenar[i].style.backgroundColor == "yellow") {
                arrayColoresComprobar.push("amarillo");
            } else if (circulosRellenar[i].style.backgroundColor == "brown") {
                arrayColoresComprobar.push("marron");
            } else if (circulosRellenar[i].style.backgroundColor == "orange") {
                arrayColoresComprobar.push("naranja");
            }
        }
        return arrayColoresComprobar;
    }
    //Funcio que comprueba
    let comprobar = function () {
        let numeroAcertados = 0;
        let arrayColoresComprobar = getColores();
        if (numeroDecoloresmetidos >= 4) {
            objetoComprobar = master.comprobar(arrayColoresComprobar);
            if (objetoComprobar.negro > 0) {
                while (numeroAcertados < objetoComprobar.negro) {
                    circulosComprobar[numeroAcertados].style = "background-color: black;";
                    numeroAcertados++;
                }
            }
            if (numeroAcertados == 4) {
                juegoAcabado.style = "display: block;";
            }
            if (objetoComprobar.blanco > 0) {
                for (let i = 0; i < objetoComprobar.blanco; i++) {
                    circulosComprobar[numeroAcertados].style = "background-color: white;";
                    numeroAcertados++;
                }
                numeroAcertados = 0;
            }
            if (numeroAcertados != 4) {
                crearNuevaLinea();
            }
            paletaJuego.scrollTo(0, 0)
        }
    }
    //Reiniciamos la app
    let reiniciar = function () {
        init();
        juegoAcabado.style = "display: none;"
    }
    let init = function () {
        master.init();
        master.mostrar();
        numeroDecoloresmetidos = 0;
        numeroLineas = 0;
        paletaJuego = document.getElementById("paleta");
        color = document.getElementsByClassName("circulo");
        circulosRellenar = document.getElementsByClassName("circuloRellenar");
        circulosComprobar = document.getElementsByClassName("circuloComprobar");
        btnComprobar = document.getElementById("vereficar");
        juegoAcabado = document.getElementById("acabado");
        btnSalir = document.getElementById("salir");
        btnReiniciar = document.getElementById("reiniciar");
        btnComprobar.addEventListener("click", comprobar);
        btnSalir.addEventListener("click", function () {
            window.close();
        });
        btnReiniciar.addEventListener("click", reiniciar);
        for (let i = 0; i < color.length; i++) {
            color[i].addEventListener("click", addCirculo);
        }
        crearNuevaLinea();
    }
    window.onload = init;
}