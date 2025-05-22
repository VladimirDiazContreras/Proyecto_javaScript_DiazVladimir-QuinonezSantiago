const API_URL = 'https://682db7e04fae188947573a1f.mockapi.io/F1/F1';

const carrusel = document.getElementById('carrusel');
const detalle = document.getElementById('detalle');
const info = document.getElementById('info');
const volver = document.getElementById('volver');

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
  });

function mostrarDetalle(circuito) {
  document.querySelector('.carrusel-wrapper').classList.add('hidden');
  detalle.classList.remove('hidden');
  info.innerHTML = `
    <h2>${circuito.nombre}</h2>
    <img src="${circuito.imagen}" alt="${circuito.nombre}" style="height:200px;border-radius:10px;" />
    <p><strong>País:</strong> ${circuito.pais}</p>
    <p><strong>Longitud:</strong> ${circuito.longitud_Km} </p>
    <p><strong>Número de vueltas:</strong> ${circuito.vueltas}</p>
    <p><strong>Descripcion:</strong> ${circuito.descripcion}</p>
    <p><strong>Record pista:</strong> ${circuito.record_vuelta}</p>
    <p><strong>Ultimo ganador:</strong> ${circuito.ganadores}</p>
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
