document.addEventListener("DOMContentLoaded", () => {
    const navs = document.querySelectorAll(".navegacion");
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario?.nombre) return;

    navs.forEach(nav => {
        // Evitamos sobrescribir enlaces como "Alquilar" si hay más de uno
        // Solo reemplazamos el que contiene "Iniciar sesión"
        const tieneLogin = [...nav.children].some(link => 
            link.textContent.includes("Iniciar sesión")
        );

        if (tieneLogin) {
            nav.innerHTML = `
                <span class="navegacion_enlace">Hola ${usuario.nombre}</span>
                <a href="reservas.html" class="navegacion_enlace" >Mis Reservas</a>
                <a href="alquilar.html" class="navegacion_enlace">Alquilar</a>
                <a href="#" class="navegacion_enlace" id="logout">Cerrar sesión</a>
            `;
        }
    });
 
    const logout = document.getElementById("logout");
    if (logout) {
        logout.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuario");
            location.reload();
        });
    }
});
