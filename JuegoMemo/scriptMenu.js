const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

//UTILIDAD PRINCIPAL
if (usuarios.length > 0) {
  const botonMas = crearBotonMas();

  usuarios.sort((a, b) => a.tiempo - b.tiempo);
  usuarios.forEach((usuario) => {
    rankingNivelesEl.forEach((nivel) => {
      if (nivel.children.length < 4) {
        if (nivel.classList.contains(`ranking${usuario.dificultad}`)) {
          nivel.appendChild(crearUsuarios(usuario, false));
        }
      }
    });
  });
  rankingListaEl.appendChild(botonMas);
} else {
  const divEl = document.createElement("div");
  divEl.classList.add("noUsuarios");
  ocultarElemento(rankingDivEl);
  divEl.innerText = "No hay usuarios registrados";
  rankingListaEl.appendChild(divEl);
}

function crearUsuarios(usuario, boton = true) {
  const liEl = document.createElement("li");
  liEl.classList.add("usuarioLi");
  liEl.innerText = `${usuario.nombre} - ${usuario.tiempo}seg`;

  if (boton) {
    const botonReto = document.createElement("button");
    botonReto.onclick = () => reto(usuario);
    botonReto.innerText = "Retar";
    botonReto.classList.add("botonReto");
    liEl.appendChild(botonReto);
  }

  return liEl;
}

//NIVELES
nivelesBotonesEl.forEach((boton) => {
  boton.addEventListener("click", (ev) => {
    ev.preventDefault();
    clearInterval(intervaloContador);
    nivelActual = boton.innerText;
    contadorEl.innerText = 0;
    ocultarElemento(nivelesEl);
    deshabilitarBotones();
    inicializarJuego();

    genBoard();
  });
});

//ELEMENTOS DOM

botonVolverEl.addEventListener("click", (ev) => {
  ev.preventDefault();
  ocultarElemento(juegoEl);
  mostrarElemento(menuEl);
});

botonIniciarEl.addEventListener("click", (ev) => {
  ev.preventDefault();
  ocultarElemento(menuEl);
  mostrarElemento(nivelesEl);
});

botonVolverUsuarios.addEventListener("click", (ev) => {
  ev.preventDefault();
  ocultarElemento(usuariosTotales);
  mostrarElemento(menuEl);
});

//FUNCIONES UTILES

function crearBotonMas() {
  const botonMas = document.createElement("button");
  botonMas.innerText = "VER TODOS";
  botonMas.classList.add("botonMas");
  botonMas.addEventListener("click", (ev) => {
    ev.preventDefault();
    usuariosPaginados = JSON.parse(localStorage.getItem("usuarios"));
    mostrarUsuarios(calcularPagina());
    ocultarElemento(menuEl);
    mostrarElemento(usuariosTotales);
  });

  return botonMas;
}
