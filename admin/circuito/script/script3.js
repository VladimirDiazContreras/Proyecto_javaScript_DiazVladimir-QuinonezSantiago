const API_URL = 'https://682db7e04fae188947573a1f.mockapi.io/F1/F1';

const carrusel = document.getElementById('carrusel');
const detalle = document.getElementById('detalle');
const info = document.getElementById('info');
const volver = document.getElementById('volver');
const crearBtn = document.getElementById('crear');

// Cargar datos
function cargarCircuitos() {
  carrusel.innerHTML = '';
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      data.forEach(circuito => {
        const img = document.createElement('img');
        img.src = circuito.imagen;
        img.alt = circuito.nombre;
        img.addEventListener('click', () => mostrarDetalle(circuito));
        carrusel.appendChild(img);
      });
    })
    .catch(error => console.error("Error al cargar circuitos:", error));
}

cargarCircuitos();

function mostrarDetalle(circuito) {
  document.querySelector('.carrusel-wrapper').classList.add('hidden');
  detalle.classList.remove('hidden');
  info.innerHTML = `
    <h2>${circuito.nombre}</h2>
    <img src="${circuito.imagen}" alt="${circuito.nombre}" style="height:200px;border-radius:10px;" />
    <p><strong>País:</strong> ${circuito.pais}</p>
    <p><strong>Longitud:</strong> ${circuito.longitud_Km}</p>
    <p><strong>Número de vueltas:</strong> ${circuito.vueltas}</p>
    <p><strong>Descripción:</strong> ${circuito.descripcion}</p>
    <p><strong>Record pista:</strong> ${circuito.record_vuelta}</p>
    <p><strong>Último ganador:</strong> ${circuito.ganadores}</p>
    <div style="margin-top:1rem;">
      <button id="editar">✏️ Editar</button>
      <button id="eliminar">🗑️ Eliminar</button>
    </div>
  `;

  document.getElementById('editar').addEventListener('click', () => editarCircuito(circuito));
  document.getElementById('eliminar').addEventListener('click', () => eliminarCircuito(circuito.id));
}

volver.addEventListener('click', () => {
  detalle.classList.add('hidden');
  document.querySelector('.carrusel-wrapper').classList.remove('hidden');
});

// Crear circuito
crearBtn.addEventListener('click', () => {
  const nombre = prompt("Nombre del circuito:");
  const pais = prompt("País:");
  const longitud_Km = prompt("Longitud en km:");
  const vueltas = prompt("Número de vueltas:");
  const descripcion = prompt("Descripción:");
  const record_vuelta = prompt("Record de vuelta:");
  const ganadores = prompt("Último ganador:");
  const imagen = prompt("URL de la imagen:");

  if (nombre && pais && longitud_Km && vueltas && descripcion && record_vuelta && ganadores && imagen) {
    const nuevo = {
      nombre,
      pais,
      longitud_Km,
      vueltas,
      descripcion,
      record_vuelta,
      ganadores,
      imagen
    };

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo)
    })
      .then(res => res.json())
      .then(() => {
        cargarCircuitos();
        volver.click();
      })
      .catch(err => console.error("Error al crear circuito:", err));
  } else {
    alert("Todos los campos son obligatorios.");
  }
});

// Editar circuito
function editarCircuito(circuito) {
  const nombre = prompt("Nuevo nombre:", circuito.nombre);
  const pais = prompt("Nuevo país:", circuito.pais);
  const longitud_Km = prompt("Nueva longitud:", circuito.longitud_Km);
  const vueltas = prompt("Nuevo número de vueltas:", circuito.vueltas);
  const descripcion = prompt("Nueva descripción:", circuito.descripcion);
  const record_vuelta = prompt("Nuevo record de vuelta:", circuito.record_vuelta);
  const ganadores = prompt("Nuevo último ganador:", circuito.ganadores);
  const imagen = prompt("Nueva URL de imagen:", circuito.imagen);

  if (nombre && pais && longitud_Km && vueltas && descripcion && record_vuelta && ganadores && imagen) {
    const actualizado = {
      nombre,
      pais,
      longitud_Km,
      vueltas,
      descripcion,
      record_vuelta,
      ganadores,
      imagen
    };

    fetch(`${API_URL}/${circuito.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizado)
    })
      .then(res => res.json())
      .then(() => {
        cargarCircuitos();
        volver.click();
      })
      .catch(err => console.error("Error al editar circuito:", err));
  } else {
    alert("Todos los campos son obligatorios.");
  }
}

// Eliminar circuito
function eliminarCircuito(id) {
  if (confirm("¿Deseas eliminar este circuito?")) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        cargarCircuitos();
        volver.click();
      })
      .catch(err => console.error("Error al eliminar circuito:", err));
  }
}

// Flechas del carrusel
document.getElementById('prev').addEventListener('click', () => {
  carrusel.scrollBy({ left: -300, behavior: 'smooth' });
});
document.getElementById('next').addEventListener('click', () => {
  carrusel.scrollBy({ left: 300, behavior: 'smooth' });
});

