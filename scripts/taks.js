// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
function comprobacion(){
  const jwt = localStorage.getItem('jwt');

  if (!jwt) {
    // usamos el replace para no guardar en el historial la url anterior
    location.replace('/');
  }


};

comprobacion();


/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
const userName = document.querySelector(".user-info p");
const closeApp = document.querySelector("#closeApp");
const nuevaTarea = document.querySelector("#nuevaTarea");
const formCrearTarea = document.querySelector(".nueva-tarea");
const tareasPendientes= document.querySelector(".tareas-pendientes");
const tareasTerminadas = document.querySelector(".tareas-terminadas");

const ENDPOINTBASE = "https://ctd-todo-api.herokuapp.com/v1";
const JWT = localStorage.getItem("jwt");

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  closeApp.addEventListener('click', function () {
const confirmacion= confirm("¿Quieres cerrar sesión?")
if(confirmacion){
  localStorage.clear();
  location.replace("./");
}

 });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {

    const url = `${ENDPOINTBASE}/users/getMe`;
    const configuraciones = {
      method: "GET",
      headers: {
        authorization: JWT,
      },
    };

    fetch(url, configuraciones)
    .then((response) => response.json())
    .then((data)=>{
      userName.innerText = data.firstName;
    })
  };
  obtenerNombreUsuario();

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {

    const url = `${ENDPOINTBASE}/tasks`;

    const configuraciones = {
      method: "GET",
      headers: {
        authorization: JWT,
      },
    };

    fetch(url, configuraciones)
      .then((response) => response.json())
      .then((data) => {
         renderizarTareas(data);
      });
  };
  consultarTareas();



  


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault();

    const nuevaTask = {
      description: nuevaTarea.value,
      completed: false,
    };

    const configuraciones = {
      method: "POST",
      headers: {
        authorization: JWT,
        "content-type": "application/json",
      },
      body: JSON.stringify(nuevaTask),
    };

    fetch(`${ENDPOINTBASE}/tasks`, configuraciones)
      .then((response) => response.json())
      .then((data) => {
        consultarTareas();
      });
  });



  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    tareasTerminadas.innerHTML = "";
    tareasPendientes.innerHTML = "";

    const listadoTareasCompletas = listado.filter((item) => item.completed);
    const listadoTareasPendientes = listado.filter((item) => !item.completed);
    const cantidadPendientes= document.querySelector("#cantidad-pendientes");
    cantidadPendientes.innerHTML =`${listadoTareasPendientes.length}`
    const cantidadFinalizadas= document.querySelector("#cantidad-finalizadas");
    cantidadFinalizadas.innerHTML =`${listadoTareasCompletas.length}`

    listadoTareasPendientes.forEach((tarea) => {
      // por cada tarea inyectamos un nodo li
      tareasPendientes.innerHTML += `
      <li class="tarea" data-aos="fade-down">
        <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <p class="timestamp">${tarea.createdAt}</p>
        </div>
      </li>
      `;
    });

    listadoTareasCompletas.forEach((tarea) => {
      // por cada tarea inyectamos un nodo li
    
    
      tareasTerminadas.innerHTML += `
      <li class="tarea" data-aos="fade-up">
        <div class="hecha">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <div class="cambios-estados">
            <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
            <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
      </li>
      `;
    });
    


    const botonesChange = document.querySelectorAll(".change");
   
    const botonEliminar = document.querySelectorAll(".borrar")
    

    botonesChange.forEach((boton) => {
      boton.addEventListener("click", function (event) {
        botonesCambioEstado(event.target);
      });
    });

    botonEliminar.forEach((boton) => {
      boton.addEventListener("click", function (event) {
        console.log(event);
        botonBorrarTarea(event.target);
      });
    });


  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado(nodo) {

    console.log(nodo);

    const terminada = nodo.classList.contains("incompleta");

    const cambio = {
      completed: !terminada,
    };

    const configuraciones = {
      method: "PUT",
      headers: {
        authorization: JWT,
        "content-type": "application/json",
      },
      body: JSON.stringify(cambio),
    };

    fetch(`${ENDPOINTBASE}/tasks/${nodo.id}`, configuraciones)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        consultarTareas();
      });



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea(nodo) {


    const configuraciones = {
      method: "DELETE",
      headers: {
        authorization: JWT,
        "content-type": "application/json",
      }
    };

    fetch(`${ENDPOINTBASE}/tasks/${nodo.id}`, configuraciones)
      .then((response) => response.json())
      .then((data)=> {
        console.log(data)
        consultarTareas();
      });
  }
  
});