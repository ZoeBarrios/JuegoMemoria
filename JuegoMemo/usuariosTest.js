//CARGO ELEMENTOS DEFAULT AL LOCAL STORAGE PARA PODER MOSTRAR LAS FUNCIONALIDADES
const usuariosIniciales = {
  usuarios: [
    {
      nombre: "AAA",
      tiempo: 10,
      dificultad: "FACIL",
    },
    {
      nombre: "BBB",
      tiempo: 20,
      dificultad: "FACIL",
    },
    {
      nombre: "CCC",
      tiempo: 30,
      dificultad: "FACIL",
    },
    {
      nombre: "DDD",
      tiempo: 40,
      dificultad: "NORMAL",
    },
    {
      nombre: "EEE",
      tiempo: 50,
      dificultad: "NORMAL",
    },
    {
      nombre: "FFF",
      tiempo: 60,
      dificultad: "NORMAL",
    },
    {
      nombre: "GGG",
      tiempo: 70,
      dificultad: "DIFICIL",
    },
    {
      nombre: "HHH",
      tiempo: 80,
      dificultad: "DIFICIL",
    },
    {
      nombre: "III",
      tiempo: 90,
      dificultad: "DIFICIL",
    },
  ],
};

if (!JSON.parse(localStorage.getItem("usuarios"))) {
  for (let i = 0; i < usuariosIniciales.usuarios.length; i++) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (i != 0) {
      localStorage.setItem("usuarios", [
        JSON.stringify(usuarios.concat(usuariosIniciales.usuarios[i])),
      ]);
    } else {
      localStorage.setItem(
        "usuarios",
        JSON.stringify([usuariosIniciales.usuarios[i]])
      );
    }
  }
}
