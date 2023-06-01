//FUNCIONES UTILES
function ocultarElemento(elemento) {
  elemento.style.display = "none";
}

function mostrarElemento(elemento) {
  elemento.style.display = "flex";
}
function deshabilitarBotones() {
  botonNuevaPartidaEl.disabled = true;
  botonVolverEl.disabled = true;
}
function habilitarBotones() {
  botonNuevaPartidaEl.disabled = false;
  botonVolverEl.disabled = false;
}
function restablecerBotones() {
  botonesFiltrados.forEach((boton) => boton.classList.remove("active"));
}
function inicializarJuego() {
  clearInterval(intervaloContador);
  clearInterval(intervaloTiempo);
  setTimeout(habilitarBotones, NIVELES[nivelActual].tiempo * 15);
  esReto = false;
  contadorSeleccionadasTotales = 0;
  aciertosEl.innerText = 0;
  contadorSeleccionadas = 0;
  contador = 0;
  contadorEl.innerText = 0;
}

function iniciarContador(reto = false) {
  contadorEl.classList.remove("hidden");
  intervaloContador = setInterval(() => {
    reto ? contador-- : contador++;
    contadorEl.innerText = contador;
  }, 1000);
}

function inicializarReto(tiempo) {
  esReto = tiempo;
  clearInterval(intervaloContador);
  clearInterval(intervaloTiempo);
  contadorSeleccionadasTotales = 0;
  contadorSeleccionadas = 0;
  contador = tiempo;
  aciertosEl.innerText = 0;
  contadorEl.innerText = contador;
}

function controlarTiempo() {
  intervaloTiempo = setInterval(() => {
    if (contadorEl.innerText == 0) {
      juegoEl.style.display = "none";
      mensajeEl.classList.remove("hidden");
      setTimeout(() => {
        mensajeEl.classList.add("hidden");
        menuEl.style.display = "flex";
        clearInterval(intervaloContador);
        clearInterval(intervaloTiempo);
      }, 2000);
    }
  }, 1000);
}

function registrarTiempo(ev) {
  ev.preventDefault();
  if (nombreEl.value == "") {
    nombreEl.classList.add("error");
    return;
  } else {
    nombreEl.classList.remove("error");
    setTimeout(() => {
      const usuario = {
        nombre: nombreEl.value,
        tiempo: puntajeFinalEl.innerText,
        dificultad: nivelActual,
      };

      const usuarios = JSON.parse(localStorage.getItem("usuarios"));
      if (usuarios) {
        localStorage.setItem("usuarios", [
          JSON.stringify(usuarios.concat(usuario)),
        ]);
      } else {
        localStorage.setItem("usuarios", JSON.stringify([usuario]));
      }

      window.location.reload();
    }, 500);
  }
}
