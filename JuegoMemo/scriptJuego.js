//VARIABLES
let icons = [];
let selects = [];
let contadorSeleccionadasTotales = 0;
let enComparacion = false;

//EVENTOS DE ELEMENTOS DEL DOM
botonNuevaPartidaEl.addEventListener("click", (ev) => {
  ev.preventDefault();
  contadorEl.innerText = 0;
  inicializarJuego();
  deshabilitarBotones();

  genBoard();
});

//FUNCIONALIDAD
function loadIcons() {
  icons = [
    '<i class="far fa-grin-tears"></i>',
    '<i class="far fa-meh"></i>',
    '<i class="far fa-kiss-wink-heart"></i>',
    '<i class="far fa-flushed"></i>',
    '<i class="far fa-sad-cry"></i>',
    '<i class="far fa-grin-beam"></i>',
    '<i class="far fa-grin-beam-sweat"></i>',
    '<i class="far fa-tired"></i>',
    '<i class="far fa-angry"></i>',
    '<i class="far fa-laugh"></i>',
    '<i class="far fa-smile-wink"></i>',
    '<i class="far fa-meh-rolling-eyes"></i>',
  ];
}

function genBoard(tiempoReto = 0) {
  mostrarElemento(juegoEl);
  boardEl.className = "board" + nivelActual;
  loadIcons();
  selects = [];
  let board = document.getElementById("board");
  let cards = [];
  for (let i = 0; i < NIVELES[nivelActual].cartas; i++) {
    cards.push(`
            <div class="area-card" onclick="selectCard(${i},&quot;${nivelActual}&quot;)">
                <div class="card ${nivelActual}" id="card${i}">
                    <div class="face back" id="back${i}">
                        ${icons[0]}
                    </div>
                    <div class="face top">
                        <i class="far fa-question-circle"></i>
                    </div>
                </div>
            </div>
            `);

    if (i % 2 == 1) {
      icons.splice(0, 1);
    }
  }

  cards.sort(() => Math.random() - 0.5);

  board.innerHTML = cards.join(" ");

  if (tiempoReto != 0) {
    setTimeout(() => iniciarContador(true), NIVELES[nivelActual].tiempo * 10);
    controlarTiempo(tiempoReto);
  } else {
    setTimeout(iniciarContador, NIVELES[nivelActual].tiempo * 10);
  }
}

function selectCard(i) {
  if (enComparacion) return;
  let card = document.getElementById("card" + i);

  if (card.style.transform != "rotateY(180deg)") {
    card.style.transform = "rotateY(180deg)";
    selects.push(i);
  }
  if (selects.length == 2) {
    enComparacion = true;
    deselect(selects);
    selects = [];
  }
}

function deselect(selects) {
  setTimeout(() => {
    let back1 = document.getElementById("back" + selects[0]);
    let back2 = document.getElementById("back" + selects[1]);
    if (back1.innerHTML != back2.innerHTML) {
      let card1 = document.getElementById("card" + selects[0]);
      let card2 = document.getElementById("card" + selects[1]);
      card1.style.transform = "rotateY(0deg)";
      card2.style.transform = "rotateY(0deg)";
    } else {
      aciertosEl.innerText = contadorSeleccionadasTotales + 1;
      back1.style.background = "var(--card-correct-color)";
      back2.style.background = "var(--card-correct-color)";

      if (
        contadorSeleccionadasTotales == NIVELES[nivelActual].cartas / 2 - 1 &&
        contadorEl.innerText > 0
      ) {
        clearInterval(intervaloContador);
        clearInterval(intervaloTiempo);
        setTimeout(() => {
          juegoEl.style.display = "none";
          ganadorEl.style.display = "flex";
          if (esReto) {
            puntajeFinalEl.innerText = esReto - contador;
          } else {
            puntajeFinalEl.innerText = contador;
          }
        }, 1000);
      } else {
        contadorSeleccionadasTotales++;
      }
    }
    enComparacion = false;
  }, 1000);
}

function reto(usuario) {
  nivelActual = usuario.dificultad;
  ocultarElemento(usuariosTotales);
  deshabilitarBotones();
  inicializarReto(usuario.tiempo);
  ocultarElemento(menuEl);
  genBoard(usuario.tiempo);
}
