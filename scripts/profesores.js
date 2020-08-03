
    document.getElementById('formProfesor').addEventListener('submit', guardarProfesor);
    

    function guardarProfesor(e) {
    var nombre = document.getElementById('nombre').value;
    var ciudadania = document.getElementById('ciudadania').value;
    var cedula = document.getElementById('cedula').value;
    var fechaNac = document.getElementById('fecha').value;
    var fecha = new Date(fechaNac);
    var hoy = new Date();
    var sexo = document.getElementById('sexo').value;
    var error = document.getElementById('error');
    var matutina = document.getElementById('matutina').checked;
    var vespertina = document.getElementById('vespertina').checked;
    var nocturna = document.getElementById('nocturna').checked;

    if(nombre == ""){
      error.innerHTML = 
      `
      <div class="alert alert-danger" role="alert">
        <label>Por favor Rellene el campo Nombre</label>
      </div>
      `;
    }else if(cedula == "" && ciudadania == "C.I")
    {
      error.innerHTML = 
      `
      <div class="alert alert-danger" role="alert">
        <label>Por favor Rellene el campo Cedula</label>
      </div>
      `;
    }
    else if(fechaNac == "")
    {
      error.innerHTML = 
      `
      <div class="alert alert-danger" role="alert">
        <label>Por favor Rellene el campo fecha</label>
      </div>
      `;
    }
    else{
      error.innerHTML = "";
      let estudiante = {
        nombre: nombre,
        cedula: ciudadania + cedula,
        fechaNac: fechaNac,
        edad: hoy.getFullYear() - fecha.getFullYear(),
        sexo: sexo,
        matutina : matutina,
        vespertina : vespertina,
        nocturna: nocturna
      
    };

    if(localStorage.getItem('estudiantes') === null) {
        let estudiantes = [];
        estudiantes.push(estudiante);
        localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
    } else {
        let estudiantes = JSON.parse(localStorage.getItem('estudiantes'));
        estudiantes.push(estudiante);
        localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
    }

    ObtenerEstudiante();
    limpiar();
    e.preventDefault();
    }
    }

    function limpiar(){
      document.getElementById('nombre').value = "";
      document.getElementById('ciudadania').value = "C.I";
      document.getElementById('cedula').value = "";
      document.getElementById('fecha').value = "";
      document.getElementById('sexo').value = "Masculino";

    }

    function eliminarEstudiante(cedula) {
    console.log(`eliminado ${cedula}`);
    let estudiantes = JSON.parse(localStorage.getItem('estudiantes'));
    for(let i = 0; i < estudiantes.length; i++) {
        if(estudiantes[i].cedula == cedula) {
        estudiantes.splice(i, 1);
        }
    }
    
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
    ObtenerEstudiante();
    }

    function visualizarEstudiante(cedula){
      let estudiantes = JSON.parse(localStorage.getItem('estudiantes'));
      for(let i = 0; i< estudiantes.length; i++){
        if(estudiantes[i].cedula == cedula){
          estudianteSeleccionado = estudiantes[i];
        }
  
      }  
      
      var vista = document.getElementById('vista');
      vista.innerHTML = 
      `
      <div class="card">
            <div class="card-body">
              <div>
                <label for="">Nombre: <span>${estudianteSeleccionado.nombre}</span></label>
              </div>
              <div>
                <label for="">Cedula: <span>${estudianteSeleccionado.cedula}</span></label>
              </div>
              <div>
                <label for="">Fecha de Nacimiento: <span>${estudianteSeleccionado.fechaNac}</span></label>
              </div>
              <div>
                <label for="">Edad: <span>${estudianteSeleccionado.edad} años</span></label>
              </div>
              <div>
                <label for="">Sexo: <span>${estudianteSeleccionado.sexo}</span></label>
              </div>
              <div id="disponibilidad">
              </div>

            <button class="btn btn-danger" onclick="cerrar('${vista}')">Cerrar</button>
        </div>
      `;
      const mañana = estudianteSeleccionado.matutina
      const tarde = estudianteSeleccionado.vespertina
      const noche = estudianteSeleccionado.nocturna
     console.log(estudianteSeleccionado.matutina)
      if (mañana){
        output = `
        <label for="">Disponibilidad: <span>Matutina</span></label>`
        document.getElementById("disponibilidad").innerHTML = output
    }
      if(tarde){
        output = `
        <label for="">Disponibilidad: <span>Vespertina</span></label>`
        document.getElementById("disponibilidad").innerHTML = output
      }
      if (noche){
        output = `
        <label for="">Disponibilidad: <span>Nocturna</span></label>`
        document.getElementById("disponibilidad").innerHTML = output
      }
      if(mañana && tarde && noche){
        output = `
        <label for="">Disponibilidad: Diurna, Vespertina y Nocturna
        </label>`
        document.getElementById("disponibilidad").innerHTML = output
      }
      if(mañana && tarde){
        output = `
        <label for="">Disponibilidad: <span>
        Diurna y Vespertina
        </span></label>`
        document.getElementById("disponibilidad").innerHTML = output
      }
      if(mañana && noche){
        output = `
        <label for="">Disponibilidad: <span>
        Diurna y Nocturna
        </span></label>`
        document.getElementById("disponibilidad").innerHTML = output
      }
      if(tarde && noche){
        output = `
        <label for="">Disponibilidad: <span>Vespertina y Nocturna</span></label>`
        document.getElementById("disponibilidad").innerHTML = output
      }
    }

    function cerrar(){
        vista.innerHTML = " ";
    }

    function ObtenerEstudiante() {
    let estudiantes = JSON.parse(localStorage.getItem('estudiantes'));
    let vistaEstudiantes = document.getElementById('estudiantes');
    vistaEstudiantes.innerHTML = '';
    for(let i = 0; i < estudiantes.length; i++) {
        var nombre = estudiantes[i].nombre;
        var cedula = estudiantes[i].cedula;
        var edad = estudiantes[i].edad;
        var sexo = estudiantes[i].sexo;

        vistaEstudiantes.innerHTML += 
        `
        <td class="text-center">${nombre}</td>
        <td class="text-center">${cedula}</td>
        <td class="text-center">${edad}</td>
        <td class="text-center">${sexo}</td>
        <td class="text-center flex">
          <button class="btn btn-danger" onclick="eliminarEstudiante('${cedula}')">Eliminar</button>
          <button class="btn btn-warning" onclick="visualizarEstudiante('${cedula}')">Visualizar</button>
        </td>
        `;
    }
    }

    ObtenerEstudiante();
    
