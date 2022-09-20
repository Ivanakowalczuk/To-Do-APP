window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
   
    const form = document.querySelector("form");
    const inputNombre = document.querySelector("#inputNombre");
    const inputApellido = document.querySelector("#inputApellido");
    const inputEmail = document.querySelector("#inputEmail");
    const inputPassword = document.querySelector("#inputPassword");
    const passwordRepetida = document.querySelector("#inputPasswordRepetida");
  

    

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("se hizo submit");
    
        const usuario = {
            firstName: inputNombre.value,
            lastName: inputApellido.value,
            email: inputEmail.value,
            password: inputPassword.value
        
        };
        console.log(usuario)
        realizarRegister(usuario);

    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(usuario) {
        
        const url = "https://ctd-todo-api.herokuapp.com/v1/users";

const settings = {
method: "POST",
headers:{
    "Content-Type": "application/json",
},
body: JSON.stringify(usuario),
};

fetch(url, settings)
.then((respuesta) => respuesta.json())
.then((data) => {
    console.log(data);
    if(data.jwt){
        localStorage.setItem("jwt", data.jwt);
        location.replace("./mis-tareas.html");
    }
})

.catch((err)=> console.log(err));
    };


});