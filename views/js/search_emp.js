window.onload = init;

function init() {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
        return;
    }

    document.querySelector('#search-btn')
        .addEventListener('click', searchEmployee);
}

function mostrarMensaje(texto, esExito = false) {
    const msg = document.getElementById('error-msg');

    if (!texto) {
        msg.style.display = "none";
        return;
    }

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

function searchEmployee() {
    const name = document.getElementById('first_name').value;

    axios({
        method: 'get',
        url: `http://localhost:3000/empleados/name/${name}`,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(res => {
        if (res.data.code == 200) {
            mostrarMensaje("Empleado encontrado:", true);
            document.getElementById("result").textContent = JSON.stringify(res.data.message, null, 2);
        } else {
            mostrarMensaje(res.data.message);
        }
    })
    .catch(err => {
        mostrarMensaje(err.response?.data?.message || "Error al buscar empleado.");
    });
}
