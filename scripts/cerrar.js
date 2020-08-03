document.getElementById("cerrarSesion").addEventListener("click",sesion)

function sesion(e){
  e.preventDefault()
  localStorage.setItem('log', false)
  setTimeout(() => {
    location.href = "./index.html"
  }, 1500);
}