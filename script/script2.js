function goTo(section) {
  alert(`Cargando la sección: ${section}`);
  // También podrías usar: window.location.href = `${section}.html`;
}

let position = 0;
const carousel = document.getElementById("carousel");

function moveCarousel(direction) {
  const maxPosition = 1; // Solo hay 2 "pantallas": [0] y [1] (2 tarjetas cada una)
  position += direction;

  if (position < 0) position = 0;
  if (position > maxPosition) position = maxPosition;

  const shift = position * 100; // 0% o 100%
  carousel.style.transform = `translateX(-${shift}%)`;
}

