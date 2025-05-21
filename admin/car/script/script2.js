const API_URL = 'https://6818a32f5a4b07b9d1d01baa.mockapi.io/api/v1/F111';

const carrusel = document.getElementById('carrusel');
const detalle = document.getElementById('detalle');
const info = document.getElementById('info');
const volver = document.getElementById('volver');
const crearBtn = document.getElementById('crear');

function cargarVehiculos() {
  carrusel.innerHTML = '';
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      data.forEach(carro => {
        const contenedor = document.createElement('div');
        contenedor.style.position = 'relative';

        const img = document.createElement('img');
        img.src = carro.imagen;
        img.alt = carro.vehiculo;
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => mostrarDetalle(carro));

        contenedor.appendChild(img);
        carrusel.appendChild(contenedor);
      });
    })
    .catch(err => console.error('Error al cargar vehículos:', err));
}

cargarVehiculos();

function mostrarDetalle(carro) {
  document.querySelector('.carrusel-wrapper').classList.add('hidden');
  detalle.classList.remove('hidden');

  info.innerHTML = `
    <h2>${carro.vehiculo}</h2>
    <img src="${carro.imagen}" alt="${carro.vehiculo}" style="height:200px;border-radius:10px;" />
    <p><strong>Velocidad máxima:</strong> ${carro.velmax}</p>
    <p><strong>Aceleración:</strong> ${carro.aceleracion}</p>
    <p><strong>Duración de llantas:</strong> ${carro.gomas}</p>
    <div style="margin-top:1rem;">
      <button id="editar">✏️ Editar</button>
      <button id="eliminar">🗑️ Eliminar</button>
    </div>
  `;

  document.getElementById('editar').addEventListener('click', () => editarVehiculo(carro));
  document.getElementById('eliminar').addEventListener('click', () => eliminarVehiculo(carro.id));
}

volver.addEventListener('click', () => {
  detalle.classList.add('hidden');
  document.querySelector('.carrusel-wrapper').classList.remove('hidden');
});

// Crear nuevo vehículo
crearBtn.addEventListener('click', () => {
  const vehiculo = prompt("Nombre del vehículo:");
  const velmax = prompt("Velocidad máxima:");
  const aceleracion = prompt("Aceleración:");
  const gomas = prompt("Duración de llantas:");
  const imagen = prompt("URL de la imagen:");

  if (vehiculo && velmax && aceleracion && gomas && imagen) {
    const nuevoCarro = { vehiculo, velmax, aceleracion, gomas, imagen };

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCarro)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al crear vehículo');
        return res.json();
      })
      .then(() => {
        cargarVehiculos();
        volver.click();
      })
      .catch(err => console.error(err));
  } else {
    alert("Todos los campos son obligatorios.");
  }
});

// Editar vehículo
function editarVehiculo(carro) {
  const vehiculo = prompt("Nuevo nombre del vehículo:", carro.vehiculo);
  const velmax = prompt("Nueva velocidad máxima:", carro.velmax);
  const aceleracion = prompt("Nueva aceleración:", carro.aceleracion);
  const gomas = prompt("Nueva duración de llantas:", carro.gomas);
  const imagen = prompt("Nueva imagen:", carro.imagen);

  if (vehiculo && velmax && aceleracion && gomas && imagen) {
    const actualizado = { vehiculo, velmax, aceleracion, gomas, imagen };

    fetch(`${API_URL}/${carro.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizado)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al editar vehículo');
        return res.json();
      })
      .then(() => {
        cargarVehiculos();
        volver.click();
      })
      .catch(err => console.error(err));
  } else {
    alert("Todos los campos son obligatorios.");
  }
}

// Eliminar vehículo
function eliminarVehiculo(id) {
  if (confirm("¿Estás seguro de eliminar este vehículo?")) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al eliminar vehículo');
        return res.json();
      })
      .then(() => {
        cargarVehiculos();
        volver.click();
      })
      .catch(err => console.error(err));
  }
}

// Flechas carrusel
document.getElementById('prev').addEventListener('click', () => {
  carrusel.scrollBy({ left: -300, behavior: 'smooth' });
});
document.getElementById('next').addEventListener('click', () => {
  carrusel.scrollBy({ left: 300, behavior: 'smooth' });
});
