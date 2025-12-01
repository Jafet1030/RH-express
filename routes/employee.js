const express = require('express');
const employee = express.Router();
const db = require('../config/database');


// Obtener todos los empleados
employee.get('/', async(req, res, next) => {
    const emplo = await db.query('SELECT * FROM employee');
    return res.status(200).json({code: 1, message: emplo});
});

// Obtener empleado por id
employee.get('/:id', async(req, res, next) => {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
        return res.status(400).send({code: 400, message: "El id no es válido"});
    }
    const emplo = await db.query("SELECT * FROM employee WHERE emp_id = ?", [id]);
    if (emplo.length > 0) {
        return res.status(200).json({code: 200, data: emplo[0]});
    }
    return res.status(404).send({code: 404, message: "El empleado no se encontró :("});
});

// Obtener empleado por nombre
employee.get('/name/:name', async (req, res, next) => {
    const name = req.params.name;
    if (!/^[A-Za-z]+$/.test(name)) {
        return res.status(400).send({code: 400, message: "El nombre no es válido"});
    } 
    const emplo = await db.query("SELECT * FROM employee where first_name = '"+name+"';");
    if(emplo.length > 0) {
        return res.status(200).json({code: 200, message: emplo});
    }
    return res.status(404).send({code: 404, message: "El empleado no se encontró :("});
});

// Crear un nuevo empleado
employee.post('/', async (req, res, next) => {
    console.log(req.body);
    const{ first_name, last_name, phone, mail, address} = req.body;

    if (first_name && last_name && phone && mail && address) { 
        let query = "INSERT INTO employee ( first_name, last_name, phone, mail, address)";
        query += `VALUES ('${first_name}', '${last_name}', '${phone}', '${mail}', '${address}')`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Empleado insertado correctamente"});
        }

        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});

});

// Actualizar un empleado por id
employee.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
        return res.status(400).send({code: 400, message: "El id no es válido"});
    }

    const {first_name, last_name, phone, mail, address} = req.body;

    if (first_name && last_name && phone && mail && address) { // pequeña validacion
        let query = `UPDATE employee SET first_name='${first_name}',last_name='${last_name}',`;
        query += `phone='${phone}',mail='${mail}', address='${address}' WHERE emp_id=${req.params.id};`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
        }

        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

// Borrar un empleado por id
employee.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
        return res.status(400).send({code: 400, message: "El id no es válido"});
    }
    const query = `DELETE FROM employee WHERE emp_id  = ${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

module.exports = employee;