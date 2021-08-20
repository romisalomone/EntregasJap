//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("sesion").addEventListener("click", function () {

        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true; //flag

        if (inputEmail.value === '') {

            camposCompletos = false;
        }

        if (inputPassword.value === '') {

            camposCompletos = false;
        }

        if (camposCompletos) {
            window.location = "inicio.html";
        } else {
            alert("Debe ingresar correctamente.")
        }
    })






});