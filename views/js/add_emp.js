window.onload = init;

function init() {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
        return;
    }

    document.querySelector('#add-btn')
        .addEventListener('click', addEmployee);
}

function mostrarMensaje(texto, esExito = false) {
    const msg = document.getElementById('error-msg');

    if (esExito) {
        msg.style.background = "#d4edda";
        msg.style.color = "#155724";
        msg.style.borderLeft = "4px solid #28a745";
    } else {
        msg.style.background = "#fce8e6";
        msg.style.color = "#d93025";
        msg.style.borderLeft = "4px solid #d93025";
    }

    msg.innerText = texto;
    msg.style.display = "block";
}

function addEmployee() {
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const phone = document.getElementById('phone').value;
    const mail = document.getElementById('mail').value;
    const address = document.getElementById('address').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/empleados',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        data: {
            first_name,
            last_name,
            phone,
            mail,
            address
        }
    })
    .then(res => {
        if (res.data.code === 201) {
            mostrarMensaje("Empleado agregado correctamente.", true);
            limpiarFormulario();
        } else {
            mostrarMensaje(res.data.message);
        }
    })
    .catch(err => {
        console.log(err);
        mostrarMensaje(err.response?.data?.message || "Error al agregar empleado.");
    });
}

function limpiarFormulario() {
    document.getElementById('first_name').value = "";
    document.getElementById('last_name').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('mail').value = "";
    document.getElementById('address').value = "";
}