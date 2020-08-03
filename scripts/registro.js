document.getElementById("registro").addEventListener("click", registrar);

function registrar(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const psw1 = document.getElementById("psw1").value;
  const psw2 = document.getElementById("psw2").value;

  if (psw1 !== psw2) {
    output = `
    <button id="errorsito" type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>Error!</strong> las contraseñas no coinciden!`;
    document.getElementById("error").innerHTML = output;
    document.getElementById("errorsito").addEventListener("click", cerrar);
  } else {
    if (nombre == "" || apellido == "" || email == "") {
      output = `
    <button id="errorsito" type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>Error!</strong> No puedes dejar campos vacíos!`;
      document.getElementById("error").innerHTML = output;
      document.getElementById("errorsito").addEventListener("click", cerrar);
    } else {
      const admins = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contraseña: psw1,
      };

      if (localStorage.getItem("admin") === null) {
        let admin = [];
        admin.push(admins);
        localStorage.setItem("admin", JSON.stringify(admin));
      } else {
        const p = JSON.parse(localStorage.getItem("admin"));
        const f = p.find((i) => {
          if (i.email === email) {
            return true;
          } else {
            return false;
          }
        });
        if (f) {
          output = `
              <div class="alert alert-dismissible alert-danger">
              <button id="errorr" type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>Error!</strong> este correo ya está en nuestros registros. Intenta con uno diferente.</div>
              `;
          document.getElementById("error").innerHTML = output;
          document.getElementById("errorr").addEventListener("click", cerrar);
        }else{
          output = `<button id="errorsito" type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>Registro Exitoso</strong>`;
      document.getElementById("success").innerHTML = output;
      document.getElementById("errorsito").addEventListener("click", cerrar);
          let admin = JSON.parse(localStorage.getItem("admin"));
        admin.push(admins);
        localStorage.setItem("admin", JSON.stringify(admin));
        setTimeout(() => {
          location.href = "./index.html"}, 1000);
        }
        
      }

    }
  }
}

function cerrar(e) {
  e.preventDefault();
  document.getElementById("error").innerHTML = "";
  document.getElementById("success").innerHTML = "";
}
