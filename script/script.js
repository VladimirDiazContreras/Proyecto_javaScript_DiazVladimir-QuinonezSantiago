const screens = ['screen1', 'screen2', 'screen3'];
let index = 0;

function showNextScreen() {
  if (index > 0) {
    document.getElementById(screens[index - 1]).style.display = 'none';
  }

  if (index < screens.length) {
    document.getElementById(screens[index]).style.display = 'flex';
    
    // Solo continuar si no estamos en la última pantalla
    if (index < screens.length - 1) {
      setTimeout(showNextScreen, 2500);
    }
    
    index++;
  }
}

window.onload = showNextScreen;

document.getElementById("loginBtn").addEventListener("click", async () => {
  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();

  if (!emailInput || !passwordInput) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    const response = await fetch("https://682c72f6d29df7a95be71fd3.mockapi.io/f1");
    if (!response.ok) {
      throw new Error("Error al obtener los datos de la API.");
    }

    const users = await response.json();

    // Buscar un usuario que coincida con las credenciales ingresadas
    const user = users.find(
      (u) => u.email === emailInput && u.password === passwordInput
    );

    if (user) {
      // Redirigir según el rol del usuario
      if (user.rol === "admin") {
        window.location.href = "./index3.html";
      } else if (user.rol === "user") {
        window.location.href = "./index2.html";
      } else {
        alert("Rol de usuario no reconocido.");
      }
    } else {
      // Credenciales inválidas
      alert("Correo electrónico o contraseña incorrectos.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.");
  }
});


