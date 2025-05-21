const API_URL = 'https://6818a32f5a4b07b9d1d01baa.mockapi.io/api/v1/F1';

const carrusel = document.getElementById('carrusel');
const detalle = document.getElementById('detalle');
const info = document.getElementById('info');
const volver = document.getElementById('volver');

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach(piloto => {
      const img = document.createElement('img');
      img.src = piloto.imagen;
      img.alt = piloto.nombre;
      img.addEventListener('click', () => mostrarDetalle(piloto));
      carrusel.appendChild(img);
    });
  });

function mostrarDetalle(piloto) {
  document.querySelector('.carrusel-wrapper').classList.add('hidden');
  detalle.classList.remove('hidden');
  info.innerHTML = `
    <h2>${piloto.nombre}</h2>
    <img src="${piloto.imagen}" alt="${piloto.nombre}" style="height:200px;border-radius:10px;" />
    <p><strong>Rol:</strong> ${piloto.rol}</p>
    <p><strong>Equipo:</strong> ${piloto.equipo}</p>
    <p><strong>experiencia:</strong> ${piloto.experiencia} años</p>

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

