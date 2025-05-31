document.addEventListener("DOMContentLoaded", () => {
  const $customAlert = document.getElementById("custom-alert"),
        $alertMessage = document.getElementById("alert-message"),
        $alertClose = document.getElementById("alert-close"),
        $submit = document.getElementById("submit");

  function showAlert(message, type) {
    $alertMessage.textContent = message;
    $customAlert.classList.remove("error", "success");
    $customAlert.classList.add(type, "show");

    setTimeout(() => {
      $customAlert.classList.remove("show");
    }, 3500);
  }

  $alertClose.addEventListener("click", () => {
    $customAlert.classList.remove("show");
  });

  $submit.addEventListener("click", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const contraseña = document.getElementById("contraseña").value.trim();

    if (!nombre || !email || !contraseña) {
      showAlert("Todos los campos son obligatorios.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert("El correo electrónico no es válido.", "error");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some(u => u.email === email)) {
      showAlert("Este correo ya está registrado.", "error");
      return;
    }

    usuarios.push({ nombre, email, contraseña });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    showAlert("Registro exitoso. Ahora puedes iniciar sesión.", "success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 3500);
  });
});
