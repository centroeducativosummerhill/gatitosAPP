//Aquí comenzamos con el Script
const gatitos = [];

//función para agregar un nuevo gatito
function addRandomTeam() {
//crear un formulario para ingresar los datos
    const formulario = document.createElement('div');
    formulario.className = 'formulario-gatito';
    formulario.innerHTML = `
    <h3>Agregar nuevo Gatito</h3>
<div class="form-group">
    <label for="nombre">Nombre del Gatito:</label>
    <input type="text" id="nombre" placeholder="Ej: Michi">
</div>
<div class="form-group">
    <label for="raza">Raza del gatito:</label>
    <input type="text" id="raza" placeholder="Ej: Siamés">
</div>
<div class="form-group">
    <label for="imagenUrl">URL de la imagen:</label>
    <input type="text" id="imagenURL" placeholder="https://ejemplo.com/imagen.jpg">
</div>
<button onclick="guardarGatito()">Guardar Gatito</button>
<button onclick="cancelarGatito()">Cancelar Gatito</button>
`;
// Mostrar Formulario

const container = document.querySelector('.container');
container.appendChild(formulario);

document.querySelector('.add-team-btn').style.display = 'none';

}

// Función para guardar el gatito ingresado
function guardarGatito() {
    const nombre = document.getElementById('nombre').value;
    const raza = document.getElementById('raza').value;
    const imagenUrl = document.getElementById('imagenUrl').value;

    //Crear un objeto con los datos del gatito
    const gatito = {
        id: Date.now(), //usar como ID único registro
        nombre: nombre,
        raza: raza,
        imagen: imagenUrl || 'https://via.placeholder.com/150x150?text=Gatito'
    };
    //agregar el gatito al array
    gatitos.push(gatito);
    //actualizar la vista
    renderizarGatitos();
    //Eliminar el formulario
    const formulario = document.querySelector('.formulario-gatito');
    formulario.remove();
}

function renderizarGatitos() {
    const container = document.getElementById('teamsContainer');
    // Limpiar el contenedor
    container.innerHTML = '<h2>Mis Gatitos</h2>';
    // Si no hay gatitos, mostrar mensaje
    if (gatitos.length === 0) {
        container.innerHTML += '<p class="no-gatitos"> No hay nada </p>';
        return;
    }
    //Crear un div para contener las tarjetas de gatitos
    const galeriaGatitos = document.createElement('div');
    galeriaGatitos.className = 'galerita-gatitos';
    //Agregar cada gatito al contenedor
    gatitos.forEach(gatito => {
        gatitoElement.className = 'gatito-card';
        gatitoElement.innerHTML = `
        <div class="gatito-img">
        <img src="${gatito.imagen}" alt="${gatito.nombre}">
        </div>
        <div class="gatito-info">
        <h3>${gatito.nombre}</h3>
        <p>Raza: ${gatito.raza}</p>
        </div>
        `;
        galeriaGatitos.appendChild(gatitoElement);
    });
        container.appendChild(galeriaGatitos);
}



