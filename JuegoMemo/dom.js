//VARIABLES GLOBALES
var nivelActual = "";
let contador = 0;
let intervaloContador;
let intervaloTiempo;
const NIVELES = {
  FACIL: {
    cartas: 6,
    tiempo: 200,
  },
  NORMAL: {
    cartas: 12,
    tiempo: 200,
  },
  DIFICIL: {
    cartas: 24,
    tiempo: 100,
  },
};

//ELEMENTOS DEL DOM
//MENU
const botonIniciarEl = document.querySelector(".botonIniciar");
const menuEl = document.querySelector(".menu");
const rankingListaEl = document.querySelector(".rankingLista");
const rankingNivelesEl = document.querySelectorAll(".ranking");
const rankingDivEl = document.querySelector(".rankingNiveles");
const divFacil = document.querySelectorAll(".rankingFACIL");
const divNormal = document.querySelectorAll(".rankingNORMAL");
const divDificil = document.querySelectorAll(".rankingDificil");

//TODOS LOS USUARIOS
const usuariosTotales = document.querySelector(".usuariosTotales");
const contenedorTotales = document.querySelector(".contenedorTotales");
const filtroFacil = document.querySelector(".filtroFacil");
const filtroNormal = document.querySelector(".filtroNormal");
const filtroDificil = document.querySelector(".filtroDificil");
const filtroTodos = document.querySelector(".filtroTodos");
const botonVolverUsuarios = document.querySelector("#volverInicio");
const avanzarEl = document.querySelector(".avanzar");
const retrocederEl = document.querySelector(".retroceder");

//NIVELES
const nivelesEl = document.querySelector(".niveles");
const nivelesBotonesEl = document.querySelectorAll(".nivel");

//JUEGO
const juegoEl = document.querySelector(".juego");
const botonVolverEl = document.querySelector(".volver");
const contadorEl = document.querySelector(".contador");
const cardEl = document.querySelector(".card");
const mensajeEl = document.querySelector(".perder");
const boardEl = document.querySelector("#board");
const botonNuevaPartidaEl = document.querySelector(".new-game");
const aciertosEl = document.querySelector(".aciertos");

//GANADOR
const botonRegistrar = document.querySelector(".registrar");
const puntajeFinalEl = document.querySelector(".tiempo");
const ganadorEl = document.querySelector(".ganador");
const nombreEl = document.querySelector("#nombre");

//FUNCIONES ELEMENTOS DEL DOM

botonVolverUsuarios.addEventListener("click", (ev) => {
  ev.preventDefault();
  inicializarJuego();
  ocultarElemento(usuariosTotales);
  mostrarElemento(menuEl);
});

botonRegistrar.addEventListener("click", (ev) => registrarTiempo(ev));
