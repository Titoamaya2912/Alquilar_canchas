const $submit = document.getElementById("submit"),
      $contraseña = document.getElementById("contraseña"),
      $email = document.getElementById("email"),
      $visible = document.getElementById("visible");

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
            alert("Por favor completa todos los campos.");
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioEncontrado = usuarios.find(user =>
            user.email === email && user.contraseña === contraseña
        );

        if (!usuarioEncontrado) {
            alert("Correo o contraseña incorrectos o usuario no registrado.");
            return;
        }

        // Guardar sesión
        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
        window.location.href = "index.html";
    }
});



