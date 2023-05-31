let pagina = 0;
let usuariosPaginados = [];
const botonesFiltrados = [
  filtroFacil,
  filtroNormal,
  filtroDificil,
  filtroTodos,
];

avanzarEl.addEventListener("click", (ev) => {
  ev.preventDefault();
  pagina++;
  mostrarUsuarios(calcularPagina());
});

retrocederEl.addEventListener("click", (ev) => {
  ev.preventDefault();
  pagina--;
  mostrarUsuarios(calcularPagina());
});

filtroFacil.addEventListener("click", (ev) => {
  restablecerBotones();
  filtroFacil.classList.add("active");
  pagina = 0;

  ev.preventDefault();
  usuariosPaginados = JSON.parse(localStorage.getItem("usuarios")).filter(
    (usuario) => usuario.dificultad == "FACIL"
  );
  mostrarUsuarios(calcularPagina());
});

filtroNormal.addEventListener("click", (ev) => {
  restablecerBotones();
  filtroNormal.classList.add("active");
  pagina = 0;
  ev.preventDefault();
  usuariosPaginados = JSON.parse(localStorage.getItem("usuarios")).filter(
    (usuario) => usuario.dificultad == "NORMAL"
  );
  mostrarUsuarios(calcularPagina());
});
filtroTodos.addEventListener("click", (ev) => {
  restablecerBotones();
  filtroTodos.classList.add("active");
  pagina = 0;
  ev.preventDefault();
  usuariosPaginados = JSON.parse(localStorage.getItem("usuarios"));
  mostrarUsuarios(calcularPagina());
});

filtroDificil.addEventListener("click", (ev) => {
  restablecerBotones();
  filtroDificil.classList.add("active");
  pagina = 0;
  ev.preventDefault();
  usuariosPaginados = JSON.parse(localStorage.getItem("usuarios")).filter(
    (usuario) => usuario.dificultad == "DIFICIL"
  );
  mostrarUsuarios(calcularPagina());
});

function calcularPagina() {
  let usuariosAMostrar = usuariosPaginados.slice(pagina * 5, pagina * 5 + 5);
  if (
    usuariosAMostrar.length == 5 &&
    usuariosPaginados.slice((pagina + 1) * 5, (pagina + 1) * 5 + 5) != 0
  ) {
    avanzarEl.disabled = false;
  } else {
    avanzarEl.disabled = true;
  }
  pagina > 0 ? (retrocederEl.disabled = false) : (retrocederEl.disabled = true);

  return usuariosAMostrar;
}

function mostrarUsuarios(usuarios) {
  contenedorTotales.removeChild(contenedorTotales.firstChild);
  const olEl = document.createElement("ol");
  usuarios.sort((a, b) => a.tiempo - b.tiempo);
  usuarios.forEach((usuario) => {
    olEl.appendChild(crearUsuarios(usuario, true));
  });
  contenedorTotales.appendChild(olEl);
}
