const API_URL = 'https://6818a32f5a4b07b9d1d01baa.mockapi.io/api/v1/F111';

const carrusel = document.getElementById('carrusel');
const detalle = document.getElementById('detalle');
const info = document.getElementById('info');
const volver = document.getElementById('volver');

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    carrusel.innerHTML = ''; // limpia
    data.forEach(carro => {
      const img = document.createElement('img');
      img.src = carro.imagen;
      img.alt = carro.nombre;
      img.addEventListener('click', () => mostrarDetalle(carro));
      carrusel.appendChild(img);
    });
  });

function mostrarDetalle(carro) {
  document.querySelector('.carrusel-wrapper').classList.add('hidden');
  detalle.classList.remove('hidden');

  info.innerHTML = `
    <h2>${carro.vehiculo}</h2>
    <img src="${carro.imagen}" alt="${carro.vehiculo}" style="height:200px;border-radius:10px;" />
    <p><strong>velocidad maxima:</strong> ${carro.velmax}</p>
    <p><strong>aceleracion:</strong> ${carro.aceleracion}</p>
    <p><strong>duracion aproximada llantas:</strong> ${carro.gomas}</p>
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
