document.getElementById("iniciarSesion").addEventListener("click", inicio);

function inicio(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const psw = document.getElementById("psw").value;

  const admin = JSON.parse(localStorage.getItem("admin"));

  const b = admin.find(i => i.email === email)
  console.log(b)
  if (b == null){
    output = `
    <div class="alert alert-dismissible alert-danger">
    <button id="errorr" type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Error!</strong> las credenciales no concuerdan con nuestros registros.</div>
    `;
    document.getElementById("error").innerHTML = output;
    document.getElementById("errorr").addEventListener("click", cerrar);
  }
  if (b.email === email && b.contraseña == psw) {
    const log = true;
    localStorage.setItem("log", log);
    output = `
    <div class="alert alert-dismissible alert-success">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Validación exitosa!</strong> En unos segundos te redirigimos al inicio.
  </div>
    `
    document.getElementById("bien").innerHTML = output;
    setTimeout(()=> {location.href="./profesores.html"}, 1000)
  } else {
    output = `
    <div class="alert alert-dismissible alert-danger">
    <button id="errorr" type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Error!</strong> las credenciales no concuerdan con nuestros registros.</div>
    `;
    document.getElementById("error").innerHTML = output;
    document.getElementById("errorr").addEventListener("click", cerrar);
  }
}

function cerrar(e) {
  e.preventDefault();
  document.getElementById("error").innerHTML = "";
}
