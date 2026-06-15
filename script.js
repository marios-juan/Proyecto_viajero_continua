const boton = document.querySelector("button");

boton.addEventListener("click", async () => {



    const viajero = {
        tarjeta: document.getElementById("tarjeta").value,
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        dni: document.getElementById("dni").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value
    };

    try {

    const respuesta = await fetch(  
        "https://localhost:7269/api/Viajeros",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(viajero)
    });

    const datos = await respuesta.json();

    const resultado = document.getElementById("resultado");

    resultado.style.display = "block";
    resultado.innerHTML = "<h3>" + datos.mensaje + "</h3>";

    window.location.href = "recarga.html";

    document.getElementById("tarjeta").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("dni").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefono").value = ""; //Borra campos, más elegante

} catch (error) {

    console.error(error);

    const resultado = document.getElementById("resultado");

    resultado.style.display = "block";
    resultado.innerHTML = "<h3>Error al conectar con la API</h3>";
}
});      