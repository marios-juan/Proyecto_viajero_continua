const boton = document.querySelector("button");
const dni = document.getElementById("dni");
const codigo = document.getElementById("codigo");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", async function () {
    if (dni.value === "" || codigo.value === "") {
        alert("Por favor, introduce el DNI y el código de tarjeta.");
        return;
    }

    try {
        const respuesta = await fetch(
            `https://localhost:7269/api/recarga?dni=${dni.value}&codigo=${codigo.value}`
        );

        if (respuesta.status === 404) {
            resultado.style.display = "block";
            resultado.innerHTML = `
                <h3>Bono no encontrado</h3>
                <p>No existe ningún bono con esos datos.</p>
            `;
            return;
        }

        if (!respuesta.ok) {
            throw new Error("Error al consultar la API");
        }

        const datos = await respuesta.json();

        resultado.style.display = "block";
        resultado.innerHTML = `
            <h3>Información del Bono</h3>
            <p><strong>DNI:</strong> ${datos.dni}</p>
            <p><strong>Tarjeta:</strong> ${datos.codigoTarjeta}</p>
            <p><strong>Viajes disponibles:</strong> ${datos.viajesDisponibles}</p>
            <p><strong>Estado:</strong> ${datos.estado}</p>
        `;

    } catch (error) {
        resultado.style.display = "block";
        resultado.innerHTML = `
            <h3>Error</h3>
            <p>No se ha podido conectar con la API.</p>
        `;
        console.error(error);
    }
});