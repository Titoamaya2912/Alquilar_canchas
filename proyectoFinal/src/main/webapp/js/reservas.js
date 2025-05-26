function formatearNombreCancha(nombre) {
    return nombre
        .split('-')
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(' ');
}


document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const reservasContainer = document.getElementById("reservas-container");

    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const reservasUsuario = reservas.filter(reserva => reserva.email === usuario.email);

    if (reservasUsuario.length === 0) {
        reservasContainer.innerHTML = `<p class="sin-reservas">No tienes reservas registradas.</p>`;
        return;
    }

    let html = `
        <table class="tabla">
            <thead>
                <tr>
                    <th>Cancha</th>
                    <th>Fecha</th>
                    <th>Horario</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
    `;

    reservasUsuario.forEach((reserva, index) => {
    html += `
        <tr data-index="${index}">
            <td>${formatearNombreCancha(reserva.cancha)}</td>
            <td>${reserva.fecha}</td>
            <td>${reserva.horario}</td>
            <td><button class="btn-eliminar">Eliminar</button></td>
        </tr>
    `;
    });

    html += `</tbody></table>`;
    reservasContainer.innerHTML = html;

    // Funcionalidad para eliminar
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");

    botonesEliminar.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            const indexReserva = reservas.findIndex(reserva =>
                reserva.email === usuario.email &&
                reserva.fecha === reservasUsuario[i].fecha &&
                reserva.cancha === reservasUsuario[i].cancha &&
                reserva.horario === reservasUsuario[i].horario
            );

            if (indexReserva !== -1) {
                reservas.splice(indexReserva, 1); // eliminar del array principal
                localStorage.setItem("reservas", JSON.stringify(reservas)); // actualizar localStorage
                location.reload(); // recargar para ver cambios
            }
        });
    });
});
