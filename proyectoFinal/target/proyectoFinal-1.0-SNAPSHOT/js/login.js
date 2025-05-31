const $submit = document.getElementById("submit"),
      $contraseña = document.getElementById("contraseña"),
      $email = document.getElementById("email"),
      $visible = document.getElementById("visible"),
      $customAlert = document.getElementById("custom-alert"),
      $alertMessage = document.getElementById("alert-message"),
      $alertClose = document.getElementById("alert-close");

function showAlert(message, type) {
  $alertMessage.textContent = message;

  $customAlert.classList.remove("error", "success");
  $customAlert.classList.add(type);
  $customAlert.classList.add("show");

  setTimeout(() => {
    $customAlert.classList.remove("show");
  }, 2000);
}

$alertClose.addEventListener("click", () => {
  $customAlert.classList.remove("show");
});

document.addEventListener("change", (e) => {
  if (e.target === $visible) {
    $contraseña.type = $visible.checked ? "text" : "password";
  }
});

document.addEventListener("click", (e) => {
  if (e.target === $submit) {
    e.preventDefault();

    const email = $email.value.trim();
    const contraseña = $contraseña.value.trim();

    if (!email || !contraseña) {
      showAlert("Por favor completa todos los campos.", "error");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(user => user.email === email);

    if (!usuario) {
      showAlert("Este correo no está registrado.", "error");
      return;
    }

    if (usuario.contraseña !== contraseña) {
      showAlert("Contraseña incorrecta.", "error");
      return;
    }

    // Guardar sesión
    localStorage.setItem("usuario", JSON.stringify(usuario));

    showAlert("¡Inicio de sesión exitoso!", "success");

    // Esperar un poco antes de redirigir para que se vea el mensaje
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  }
});
