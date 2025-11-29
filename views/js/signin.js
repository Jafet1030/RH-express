window.onload = init;

function init(){
    // Verifica si el usuario ya esta logueado
    if(!localStorage.getItem('token')){
        document.querySelector('.btn-secondary').addEventListener('click', function(){
            window.location.href = 'login.html'
        });
        document.querySelector('.btn-primary').addEventListener('click', signin);
    }
    else{
        window.location.href = 'menu.html';
    }
}

function mostrarMensaje(texto, esExito = false) {
    const errorMsg = document.getElementById('error-msg');
    
    if (esExito) {
        errorMsg.style.background = "#d4edda";
        errorMsg.style.color = "#155724";
        errorMsg.style.borderLeft = "4px solid #28a745";
    } else {
        errorMsg.style.background = "#fce8e6";
        errorMsg.style.color = "#d93025";
        errorMsg.style.borderLeft = "4px solid #d93025";
    }
    
    errorMsg.innerText = texto;
    errorMsg.style.display = "block";
}


function signin(){
    var name = document.getElementById('input-name').value;
    var email = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;
    var errorMsg = document.getElementById('error-msg');
    
    errorMsg.style.display = "none";
    
    axios({
        method: 'post',
        url: 'http://localhost:3000/admi/signin',
        data:{
            user_name: name,
            user_mail: email,
            user_password: password   
        }
    })
    .then(function(res){
        console.log(res);
        alert("Registro exitoso");
        window.location.href = 'login.html'
    })
    .catch(function(err) {
        console.log(err);
        const mensajeError = err.response?.data?.message || "Error al registrar. Intenta de nuevo.";
        mostrarMensaje(mensajeError);
    });
}