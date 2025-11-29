window.onload = init;

function init() {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
        return;
    }

    document.querySelector('#delete-btn')
        .addEventListener('click', deleteEmployee);
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

function deleteEmployee() {
    const id = document.getElementById('emp_id').value;

    axios({
        method: 'delete',
        url: `http://localhost:3000/empleados/${id}`,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(res => {
        if (res.data.code == 200) {
            mostrarMensaje("Empleado eliminado correctamente.", true);
        } else {
            mostrarMensaje(res.data.message);
        }
    })
    .catch(err => {
        console.log(err);
        mostrarMensaje(err.response?.data?.message || "Error al eliminar empleado.");
    });
}
