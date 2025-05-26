document.addEventListener("DOMContentLoaded", function () {
    
    console.log("Hola holaa");
  const formulario = document.getElementById("formulario-reserva");
  const infoUsuario = document.getElementById("info-usuario");

  const usuarioActivo = JSON.parse(localStorage.getItem("usuario"));

  if (!usuarioActivo) {
    alert("⚠️ Debes iniciar sesión para hacer una reserva.");
    window.location.href = "index.html";
    return;
  }

  // Mostrar info del usuario arriba del formulario
  infoUsuario.innerHTML = `
    <p>Reservando como: <strong>${usuarioActivo.nombre}</strong> (${usuarioActivo.email})</p>
  `;

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const fecha = document.getElementById("dia").value;
    const cancha = document.getElementById("cancha").value;
    const horario = document.getElementById("horario").value;

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const yaReservoEseDia = reservas.some(reserva =>
      reserva.email === usuarioActivo.email && reserva.fecha === fecha
    );

    if (yaReservoEseDia) {
      alert("⚠️ Solo puedes hacer una reserva por día.");
      return;
    }

    // Guardar reserva
    reservas.push({
      email: usuarioActivo.email,
      fecha: fecha,
      cancha: cancha,
      horario: horario
    });

    localStorage.setItem("reservas", JSON.stringify(reservas));

    alert("✅ Reserva realizada con éxito.");
    formulario.reset();
  });
});

