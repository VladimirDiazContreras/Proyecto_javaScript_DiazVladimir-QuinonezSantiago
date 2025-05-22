const API_URL = 'https://682db7e04fae188947573a1f.mockapi.io/F1/F11';

const carrusel = document.getElementById('carrusel');
const detalle = document.getElementById('detalle');
const info = document.getElementById('info');
const volver = document.getElementById('volver');

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
  });

function mostrarDetalle(escuderia) {
  document.querySelector('.carrusel-wrapper').classList.add('hidden');
  detalle.classList.remove('hidden');
  info.innerHTML = `
    <h2>${escuderia.escuderia}</h2>
    <img src="${escuderia.logo}" alt="${escuderia.nombre}" style="height:200px;border-radius:10px;" />
    <p><strong>Descripcion:</strong> ${escuderia.descripcion}</p>
    <p><strong>Pilotoss:</strong> ${escuderia.pilotos}</p>
    <p><strong>Campeonatos:</strong> ${escuderia.Mundiales}</p>
  `;
}

volver.addEventListener('click', () => {
  detalle.classList.add('hidden');
  document.querySelector('.carrusel-wrapper').classList.remove('hidden');
});

// Flechas
document.getElementById('prev').addEventListener('click', () => {
  carrusel.scrollBy({ left: -300, behavior: 'smooth' });
});
document.getElementById('next').addEventListener('click', () => {
  carrusel.scrollBy({ left: 300, behavior: 'smooth' });
});

