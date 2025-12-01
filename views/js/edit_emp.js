window.onload = init;

function init() {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
        return;
    }

    document.querySelector('#search-btn')
        .addEventListener('click', buscarEmpleado);

    document.querySelector('#update-btn')
        .addEventListener('click', actualizarEmpleado);
}
function mostrarMensaje(texto, esExito = false) {
    const msg = document.getElementById('error-msg');
    msg.style.display = "block";
    msg.innerText = texto;
    msg.style.background = esExito ? "#d4edda" : "#fce8e6";
    msg.style.color = esExito ? "#155724" : "#d93025";
    msg.style.borderLeft = esExito ? "4px solid #28a745" : "4px solid #d93025";
    
    msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


function ocultarMensaje() {
    document.getElementById('error-msg').style.display = "none";
}

function buscarEmpleado() {
    const id = Number(document.getElementById('emp_id').value);
    
    if (!id) {
        mostrarMensaje("Ingrese un ID de empleado.");
        return;
    }

    console.log('Buscando empleado id=', id);
    limpiarFormulario();
    ocultarMensaje();

    axios.get(`http://localhost:3000/empleados/${id}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    .then(res => {
        console.log('response buscarEmpleado', res);
        if (res.status === 200 && res.data.data) {
            const emp = res.data.data;

            document.getElementById('first_name').value = emp.first_name;
            document.getElementById('last_name').value = emp.last_name;
            document.getElementById('phone').value = emp.phone;
            document.getElementById('mail').value = emp.mail;
            document.getElementById('address').value = emp.address;

            document.getElementById('update-form').style.display = "block";
        } else {
            mostrarMensaje(res.data?.message ||"Empleado no encontrado.");
        }
    })
    .catch(err => {
        limpiarFormulario();
        mostrarMensaje(err.response?.data?.message || "Error al buscar empleado.");
    });
}

function actualizarEmpleado() {
    const id = document.getElementById('emp_id').value;

    const data = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        phone: document.getElementById('phone').value,
        mail: document.getElementById('mail').value,
        address: document.getElementById('address').value
    };

    axios.put(`http://localhost:3000/empleados/${id}`, data, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
    })
    .then(res => {
        if (res.data.code == 200) {
            mostrarMensaje("Empleado actualizado correctamente.", true);
        } else {
            mostrarMensaje(res.data.message);
        }
    })
    .catch(err => {
        mostrarMensaje(err.response?.data?.message || "Error al actualizar empleado.");
    });
}

function limpiarFormulario() {
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('mail').value = '';
    document.getElementById('address').value = '';
    document.getElementById('update-form').style.display = "none";
}