const screens = ['screen1', 'screen2', 'screen3'];
let index = 0;

function showNextScreen() {
  if (index > 0) {
    document.getElementById(screens[index - 1]).style.display = 'none';
  }

  if (index < screens.length) {
    document.getElementById(screens[index]).style.display = 'flex';
    
    // Solo continuar si no estamos en la última pantalla 1234567890
    if (index < screens.length - 1) {
      setTimeout(showNextScreen, 2500);
    }
    
    index++;
  }
}

window.onload = showNextScreen;

