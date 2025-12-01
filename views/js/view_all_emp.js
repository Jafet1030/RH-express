window.onload = init;

function init() {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
        return;
    }

    fetchEmployees();
}

function fetchEmployees() {
    axios({
        method: 'get',
        url: 'http://localhost:3000/empleados',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(res => {
        if (res.data.code === 1) {
            displayEmployees(res.data.message);
        } else {
            mostrarMensaje("Error al obtener empleados.");
        }
    })
    .catch(err => {
        console.log(err);
        mostrarMensaje(err.response?.data?.message || "Error al cargar empleados.");
    });
}
function displayEmployees(employees) {
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = '';

    if (employees.length === 0) {
        employeeList.innerHTML = '<p style="text-align: center; color: #999;">No hay empleados registrados.</p>';
        return;
    }

    employees.forEach(emp => {
        const employeeCard = document.createElement('div');
        employeeCard.className = 'employee-item';
        employeeCard.style.marginBottom = '20px';
        employeeCard.style.padding = '15px';
        employeeCard.style.border = '1px solid #ddd';
        employeeCard.style.borderRadius = '8px';
        employeeCard.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        employeeCard.innerHTML = `
            <div class="employee-info">
                <p><strong>ID:</strong> ${emp.emp_id || 'N/A'}</p>
                <p><strong>Nombre:</strong> ${emp.first_name || 'N/A'} ${emp.last_name || 'N/A'}</p>
                <p><strong>Teléfono:</strong> ${emp.phone}</p>
                <p><strong>Correo:</strong> ${emp.mail}</p>
                <p><strong>Dirección:</strong> ${emp.address}</p>
            </div>
        `;
        employeeList.appendChild(employeeCard);
    });
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