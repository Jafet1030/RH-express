window.onload = init;

function init() {
    if (localStorage.getItem('token')) {
        window.location.href = 'menu.html';
        return;
    }
    document.querySelector('#login-btn')
        .addEventListener('click', login);
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

function login() {
    var email = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;
    var errorMsg = document.getElementById('error-msg');
    
    errorMsg.style.display = "none";
    
    axios({
        method: 'post',
        url: 'http://localhost:3000/admi/login',
        data: {
            user_mail: email,
            user_password: password
        }
    })
    .then(function(res) {
        if (res.data.code == 200) {
            localStorage.setItem('token', res.data.message); 
            window.location.href = 'menu.html';
        } 
        else {
            mostrarMensaje(res.data.message); 
        }
    })
    .catch(function(err) {
        console.log(err);
        const mensajeBack = err.response?.data?.message;
        const mensajeGenerico = "Ocurrió un error de conexión.";
        
        mostrarMensaje(mensajeBack || mensajeGenerico);
    });
}