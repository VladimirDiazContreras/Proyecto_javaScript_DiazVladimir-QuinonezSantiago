const API_URL = 'https://682db7e04fae188947573a1f.mockapi.io/F1/F11';

const carrusel = document.getElementById('carrusel');
const detalle = document.getElementById('detalle');
const info = document.getElementById('info');
const volver = document.getElementById('volver');
const crearBtn = document.getElementById('crear');

// Leer escuderías
function cargarEscuderias() {
  carrusel.innerHTML = '';
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      data.forEach(escuderia => {
        const img = document.createElement('img');
        img.src = escuderia.logo;
        img.alt = escuderia.nombre;
        img.addEventListener('click', () => mostrarDetalle(escuderia));
        carrusel.appendChild(img);
      });
    })
    .catch(err => console.error("Error al cargar escuderías:", err));
}

cargarEscuderias();

// Mostrar detalle
function mostrarDetalle(escuderia) {
  document.querySelector('.carrusel-wrapper').classList.add('hidden');
  detalle.classList.remove('hidden');

  info.innerHTML = `
    <h2>${escuderia.escuderia}</h2>
    <img src="${escuderia.logo}" alt="${escuderia.nombre}" style="height:200px;border-radius:10px;" />
    <p><strong>Descripción:</strong> ${escuderia.descripcion}</p>
    <p><strong>Pilotos:</strong> ${escuderia.pilotos}</p>
    <p><strong>Campeonatos:</strong> ${escuderia.Mundiales}</p>
    <div style="margin-top:1rem;">
      <button id="editar">✏️ Editar</button>
      <button id="eliminar">🗑️ Eliminar</button>
    </div>
  `;

  document.getElementById('editar').addEventListener('click', () => editarEscuderia(escuderia));
  document.getElementById('eliminar').addEventListener('click', () => eliminarEscuderia(escuderia.id));
}

volver.addEventListener('click', () => {
  detalle.classList.add('hidden');
  document.querySelector('.carrusel-wrapper').classList.remove('hidden');
});

// Crear escudería
crearBtn.addEventListener('click', () => {
  const escuderia = prompt("Nombre de la escudería:");
  const logo = prompt("URL del logo:");
  const descripcion = prompt("Descripción:");
  const pilotos = prompt("Nombres de los pilotos:");
  const Mundiales = prompt("Cantidad de campeonatos ganados:");

  if (escuderia && logo && descripcion && pilotos && Mundiales) {
    const nueva = {
      escuderia,
      logo,
      descripcion,
      pilotos,
      Mundiales
    };

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nueva)
    })
      .then(res => res.json())
      .then(() => {
        cargarEscuderias();
        volver.click();
      })
      .catch(err => console.error("Error al crear escudería:", err));
  } else {
    alert("Todos los campos son obligatorios.");
  }
});

// Editar escudería
function editarEscuderia(escuderia) {
  const nuevoNombre = prompt("Nuevo nombre:", escuderia.escuderia);
  const nuevoLogo = prompt("Nuevo logo:", escuderia.logo);
  const nuevaDescripcion = prompt("Nueva descripción:", escuderia.descripcion);
  const nuevosPilotos = prompt("Nuevos pilotos:", escuderia.pilotos);
  const nuevosMundiales = prompt("Cantidad de campeonatos:", escuderia.Mundiales);

  if (nuevoNombre && nuevoLogo && nuevaDescripcion && nuevosPilotos && nuevosMundiales) {
    const actualizado = {
      escuderia: nuevoNombre,
      logo: nuevoLogo,
      descripcion: nuevaDescripcion,
      pilotos: nuevosPilotos,
      Mundiales: nuevosMundiales
    };

    fetch(`${API_URL}/${escuderia.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizado)
    })
      .then(res => res.json())
      .then(() => {
        cargarEscuderias();
        volver.click();
      })
      .catch(err => console.error("Error al editar escudería:", err));
  } else {
    alert("Todos los campos son obligatorios.");
  }
}

// Eliminar escudería
function eliminarEscuderia(id) {
  if (confirm("¿Deseas eliminar esta escudería?")) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        cargarEscuderias();
        volver.click();
      })
      .catch(err => console.error("Error al eliminar escudería:", err));
  }
}

// Flechas
document.getElementById('prev').addEventListener('click', () => {
  carrusel.scrollBy({ left: -300, behavior: 'smooth' });
});
document.getElementById('next').addEventListener('click', () => {
  carrusel.scrollBy({ left: 300, behavior: 'smooth' });
});

