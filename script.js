// Variables globales
//const gatitos = [];
let gatitos = JSON.parse(localStorage.getItem('gatitos')) || [];
// Función para agregar un nuevo gatito
function addRandomTeam() {
    // Crear un formulario para ingresar los datos del gatito
    const formulario = document.createElement('div');
    formulario.className = 'formulario-gatito';
    formulario.innerHTML = `
        <h3>Agregar Nuevo Gatito</h3>
        <div class="form-group">
            <label for="nombre">Nombre del gatito:</label>
            <input type="text" id="nombre" placeholder="Ej: Michi">
        </div>
        <div class="form-group">
            <label for="raza">Raza del gatito:</label>
            <input type="text" id="raza" placeholder="Ej: Siamés">
        </div>
        <div class="form-group">
            <label for="imagenUrl">URL de la imagen:</label>
            <input type="text" id="imagenUrl" placeholder="https://ejemplo.com/imagen.jpg">
        </div>
        <button onclick="guardarGatito()">Guardar Gatito</button>
        <button onclick="cancelarGatito()">Cancelar</button>
    `;
    
    // Mostrar el formulario
    const container = document.querySelector('.container');
    container.appendChild(formulario);
    
    // Ocultar el botón de agregar mientras se muestra el formulario
    document.querySelector('.add-team-btn').style.display = 'none';
}

// Función para guardar el gatito ingresado
function guardarGatito() {
    const nombre = document.getElementById('nombre').value;
    const raza = document.getElementById('raza').value;
    const imagenUrl = document.getElementById('imagenUrl').value;
    
    // Validar que se hayan ingresado los datos
    if (!nombre || !raza) {
        alert('Por favor ingresa al menos el nombre y la raza del gatito');
        return;
    }
    
    // Crear un objeto con los datos del gatito
    const gatito = {
        id: Date.now(), // Usar timestamp como ID único
        nombre: nombre,
        raza: raza,
        imagen: imagenUrl || 'https://via.placeholder.com/150x150?text=Gatito'
    };
    
    // Agregar el gatito al array
    gatitos.push(gatito);

    //Guardar en LolcalStorage
    localStorage.setItem('gatitos', JSON.stringify(gatitos));
    
    // Actualizar la vista
    renderizarGatitos();
    actualizarFiltroRazas();
    
    // Eliminar el formulario
    const formulario = document.querySelector('.formulario-gatito');
    formulario.remove();
    
    // Mostrar nuevamente el botón de agregar
    document.querySelector('.add-team-btn').style.display = 'block';
}

// Función para cancelar la adición de un gatito
function cancelarGatito() {
    // Eliminar el formulario
    const formulario = document.querySelector('.formulario-gatito');
    formulario.remove();
    
    // Mostrar nuevamente el botón de agregar
    document.querySelector('.add-team-btn').style.display = 'block';
}

// Función para renderizar los gatitos en el contenedor
function renderizarGatitos(gatitosAMostrar = gatitos) {
    const container = document.getElementById('teamsContainer');
    
    // Limpiar el contenedor
    container.innerHTML = '<h2>Mis Gatitos</h2>';
    
    // Si no hay gatitos, mostrar un mensaje
    if (gatitosAMostrar.length === 0) {
        container.innerHTML += '<p class="no-gatitos">No hay gatitos agregados aún.</p>';
        return;
    }
    
    // Crear un div para contener las tarjetas de gatitos
    const galeriaGatitos = document.createElement('div');
    galeriaGatitos.className = 'galeria-gatitos';
    
    // Agregar cada gatito al contenedor
    gatitosAMostrar.forEach(gatito => {
        const gatitoElement = document.createElement('div');
        gatitoElement.className = 'gatito-card';
        gatitoElement.innerHTML = `
            <div class="gatito-img">
                <img src="${gatito.imagen}" alt="${gatito.nombre}">
            </div>
            <div class="gatito-info">
                <h3>${gatito.nombre}</h3>
                <p>Raza: ${gatito.raza}</p>
            </div>
            <button class="eliminar-btn" onclick="eliminarGatito(${gatito.id})">Eliminar</button>
        `;
        galeriaGatitos.appendChild(gatitoElement);
    });
    
    container.appendChild(galeriaGatitos);
} 

// Función para eliminar un gatito
function eliminarGatito(id) {
    const index = gatitos.findIndex(gatito => gatito.id === id);
    if (index !== -1) {
        if (confirm(`¿Estás seguro de eliminar a ${gatitos[index].nombre}?`)) {
            gatitos.splice(index, 1);
            renderizarGatitos();
        }
    }
}
// Función para llenar el filtro de razas
function actualizarFiltroRazas() {
    const filtroRaza = document.getElementById('filterRaza');
    const razasUnicas = [...new Set(gatitos.map(gatito => gatito.raza))];

    // Limpiar las opciones del filtro
    filtroRaza.innerHTML = '<option value="all">Todas las razas</option>';

    // Agregar las razas únicas al filtro
    razasUnicas.forEach(raza => {
        const option = document.createElement('option');
        option.value = raza;
        option.textContent = raza;
        filtroRaza.appendChild(option);
    });
}

function filtrarPorRaza() {
    const razaSeleccionada = document.getElementById('filterRaza').value;

    // Filtrar los gatitos según la raza seleccionada
    const gatitosFiltrados = razaSeleccionada === 'all'
        ? gatitos
        : gatitos.filter(gatito => gatito.raza === razaSeleccionada);

    // Renderizar los gatitos filtrados
    renderizarGatitos(gatitosFiltrados);
}
// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderizarGatitos();
    actualizarFiltroRazas();
});
