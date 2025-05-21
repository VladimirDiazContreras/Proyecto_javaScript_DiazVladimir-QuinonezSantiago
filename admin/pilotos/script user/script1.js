const API_URL = 'https://6818a32f5a4b07b9d1d01baa.mockapi.io/api/v1/F1';

const carrusel = document.getElementById('carrusel');
const detalle = document.getElementById('detalle');
const info = document.getElementById('info');
const volver = document.getElementById('volver');
const crearBtn = document.getElementById('crear');

// Cargar y mostrar pilotos
function cargarPilotos() {
  carrusel.innerHTML = '';
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      data.forEach(piloto => {
        const contenedor = document.createElement('div');
        contenedor.style.position = 'relative';

        const img = document.createElement('img');
        img.src = piloto.imagen;
        img.alt = piloto.nombre;
        img.style.cursor = 'pointer';

        img.addEventListener('click', () => mostrarDetalle(piloto));

        contenedor.appendChild(img);
        carrusel.appendChild(contenedor);
      });
    })
    .catch(error => {
      console.error("Error al cargar pilotos:", error);
    });
}

cargarPilotos();

// Mostrar detalle del piloto
function mostrarDetalle(piloto) {
  document.querySelector('.carrusel-wrapper').classList.add('hidden');
  detalle.classList.remove('hidden');

  info.innerHTML = `
    <h2>${piloto.nombre}</h2>
    <img src="${piloto.imagen}" alt="${piloto.nombre}" style="height:200px;border-radius:10px;" />
    <p><strong>Rol:</strong> ${piloto.rol}</p>
    <p><strong>Equipo:</strong> ${piloto.equipo}</p>
    <p><strong>Experiencia:</strong> ${piloto.experiencia} años</p>
    <div style="margin-top: 1rem;">
      <button id="editar">✏️ Editar</button>
      <button id="eliminar">🗑️ Eliminar</button>
    </div>
  `;

  document.getElementById('editar').addEventListener('click', () => editarPiloto(piloto));
  document.getElementById('eliminar').addEventListener('click', () => eliminarPiloto(piloto.id));
}

volver.addEventListener('click', () => {
  detalle.classList.add('hidden');
  document.querySelector('.carrusel-wrapper').classList.remove('hidden');
});

// Crear nuevo piloto
crearBtn.addEventListener('click', () => {
  const nombre = prompt("Nombre del piloto:");
  const rol = prompt("Rol:");
  const equipo = prompt("Equipo:");
  const experiencia = prompt("Experiencia (en años):");
  const imagen = prompt("URL de la imagen:");

  if (nombre && rol && equipo && experiencia && imagen) {
    const nuevoPiloto = {
      nombre,
      rol,
      equipo,
      experiencia: parseInt(experiencia),
      imagen
    };

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPiloto)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al crear piloto');
        return res.json();
      })
      .then(() => {
        cargarPilotos();
        volver.click();
      })
      .catch(error => console.error(error));
  } else {
    alert("Todos los campos son obligatorios.");
  }
});

// Editar piloto existente
function editarPiloto(piloto) {
  const nombre = prompt("Nuevo nombre:", piloto.nombre);
  const rol = prompt("Nuevo rol:", piloto.rol);
  const equipo = prompt("Nuevo equipo:", piloto.equipo);
  const experiencia = prompt("Nueva experiencia:", piloto.experiencia);
  const imagen = prompt("Nueva URL de imagen:", piloto.imagen);

  if (nombre && rol && equipo && experiencia && imagen) {
    const pilotoActualizado = {
      nombre,
      rol,
      equipo,
      experiencia: parseInt(experiencia),
      imagen
    };

    fetch(`${API_URL}/${piloto.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pilotoActualizado)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al editar piloto');
        return res.json();
      })
      .then(() => {
        cargarPilotos();
        volver.click();
      })
      .catch(error => console.error(error));
  } else {
    alert("Todos los campos son obligatorios.");
  }
}

// Eliminar piloto
function eliminarPiloto(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este piloto?")) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al eliminar piloto');
        return res.json();
      })
      .then(() => {
        cargarPilotos();
        volver.click();
      })
      .catch(error => console.error(error));
  }
}

// Navegación del carrusel
document.getElementById('prev').addEventListener('click', () => {
  carrusel.scrollBy({ left: -300, behavior: 'smooth' });
});
document.getElementById('next').addEventListener('click', () => {
  carrusel.scrollBy({ left: 300, behavior: 'smooth' });
});


