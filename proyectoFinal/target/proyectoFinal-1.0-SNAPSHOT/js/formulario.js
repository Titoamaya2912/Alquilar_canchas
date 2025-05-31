document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario-reserva");
  const infoUsuario = document.getElementById("info-usuario");

  const usuarioActivo = JSON.parse(localStorage.getItem("usuario"));

  // Variables para la alerta personalizada
  const $customAlert = document.getElementById("custom-alert"),
        $alertMessage = document.getElementById("alert-message"),
        $alertClose = document.getElementById("alert-close");

  function showAlert(message, type = "error") {
    $alertMessage.textContent = message;

    $customAlert.classList.remove("error", "success", "warning");
    $customAlert.classList.add(type);

    $customAlert.classList.add("show");

    setTimeout(() => {
      $customAlert.classList.remove("show");
    }, 3000);
  }

  $alertClose.addEventListener("click", () => {
    $customAlert.classList.remove("show");
  });

  if (!usuarioActivo) {
    showAlert("⚠️ Debes iniciar sesión para hacer una reserva.", "warning");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
    return;
  }

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
      showAlert("⚠️ Solo puedes hacer una reserva por día.", "warning");
      formulario.reset();
      return;
    }

    reservas.push({
      email: usuarioActivo.email,
      fecha: fecha,
      cancha: cancha,
      horario: horario
    });

    localStorage.setItem("reservas", JSON.stringify(reservas));

    showAlert("✅ Reserva realizada con éxito.", "success");

    setTimeout(() => {
      formulario.reset();
    }, 3000);
  });
});
