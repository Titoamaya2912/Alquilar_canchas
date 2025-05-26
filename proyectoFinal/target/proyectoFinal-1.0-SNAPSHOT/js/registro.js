document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const contraseña = document.getElementById("contraseña").value.trim();

    if (!nombre || !email || !contraseña) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some(u => u.email === email)) {
        alert("Este correo ya está registrado.");
        return;
    }

    usuarios.push({ nombre, email, contraseña });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
});
