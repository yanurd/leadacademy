
    document.getElementById('formHorario').addEventListener('submit', guardarHorario);
    

    function guardarHorario(e) {
    var profesor = document.getElementById('profesor').value;
    var nivel = document.getElementById('nivel').value;
    var seccion = document.getElementById('seccion').value;
    var hora = document.getElementById('hora').value;
    var error = document.getElementById('error');
    

    if(profesor == ""){
      error.innerHTML = 
      `
      <div class="alert alert-danger" role="alert">
        <label>Por favor Seleccione un profesor disponible</label>
      </div>
      `;
    }else if(nivel == "" && seccion == "C.I")
    {
      error.innerHTML = 
      `
      <div class="alert alert-danger" role="alert">
        <label>Por favor Seleccione  un nivel y una sección</label>
      </div>
      `;
    }
    else if(hora == "")
    {
      error.innerHTML = 
      `
      <div class="alert alert-danger" role="alert">
        <label>Por favor Seleccione la hora correspondiente</label>
      </div>
      `;
    }else if(nivel == "")
    {
      error.innerHTML = 
      `
      <div class="alert alert-danger" role="alert">
        <label>Por favor Seleccione un nivel correspondiente</label>
      </div>
      `;
    }
    else{
        let horario = {
          profesor: profesor,
          nivel: nivel,
          seccion: seccion,
          hora: hora
      };
  
      if(localStorage.getItem('horario') === null) {
          let horarios = [];
          horarios.push(horario);
          localStorage.setItem('horario', JSON.stringify(horarios));
      } else {
          let horarios = JSON.parse(localStorage.getItem('horario'));
          horarios.push(horario);
          localStorage.setItem('horario', JSON.stringify(horarios));
      }
  
      ObtenerHorario();
      limpiar();
      e.preventDefault();
      }
      }
    

    function limpiar(){
      document.getElementById('nivel').value = "";
      document.getElementById('profesor').value = "";
      document.getElementById('salon').value = "";
      document.getElementById('hora').value = "";

    }

    function eliminarHorario(profesor) {
    console.log(`eliminado ${profesor}`);
    let horarios = JSON.parse(localStorage.getItem('horario'));
    for(let i = 0; i < horarios.length; i++) {
        if(horarios[i].profesor == profesor) {
        horarios.splice(i, 1);
        }
    }
    
    localStorage.setItem('horario', JSON.stringify(horarios));
    ObtenerHorario();
    }

    function visualizarHorario(profesor){
      let horarios = JSON.parse(localStorage.getItem('horario'));
      for(let i = 0; i< horarios.length; i++){
        if(horarios[i].profesor == profesor){
          horarioSeleccionado = horarios[i];
        }
  
      }  
      
      var vista = document.getElementById('vista');
      vista.innerHTML = 
      `
      <div class="card">
            <div class="card-body">
              <div>
                <label for="">Profesor <span>${horarioSeleccionado.profesor}</span></label>
              </div>
              <div>
                <label for="">Nivel: <span>${horarioSeleccionado.nivel}</span></label>
              </div>
              <div>
                <label for="">Seccion: <span>${horaioSeleccionado.seccion}</span></label>
              </div>
              <div>
                <label for="">Hora: <span>${horarioSeleccionado.hora} </span></label>
              </div>
            <button class="btn btn-danger" onclick="cerrar('${vista}')">Cerrar</button>
        </div>
      `;
     
      
    }

    function cerrar(){
        vista.innerHTML = " ";
    }

    function ObtenerHorario() {
    let horarios = JSON.parse(localStorage.getItem('horario'));
    let vistaHorarios = document.getElementById('horario');
    vistaHorarios.innerHTML = '';
    let tamaño = horarios.length
    for(let i = 0; i < tamaño; i++) {
        var nivel = horarios[i].nivel;
        var profesor = horarios[i].profesor;
        var hora = horarios[i].hora;
        var seccion = horarios[i].seccion;

        vistaHorarios.innerHTML += 
        `
        <td class="text-center">${profesor}</td>
        <td class="text-center">${nivel}</td>
        <td class="text-center">${seccion}</td>
        <td class="text-center">${hora}</td>
        <td class="text-center flex">
          <button class="btn btn-danger" onclick="eliminarHorario('${profesor}')">Eliminar</button>
        </td>
        `;
    }
    }
    ObtenerHorario();
    
    function profs(){
      var output = ""
      const prof = JSON.parse(localStorage.getItem("estudiantes"))
      if (prof == null){
        error.innerHTML = `
        <div class="alert alert-dismissible alert-danger">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Error!</strong> primero añade un profesor!</div>`
  document.getElementById("guardar").setAttribute("disabled", true)
      }else{
      console.log(prof)
      for (var i in prof) {
        output += 
        "<option value="+ prof[i].nombre +">" + prof[i].nombre + "</option>"
        }
      }
      document.getElementById("profesor").innerHTML = output
      }