Sistema de Gestión de Empleados con Node.js

Este proyecto es un sistema básico para administrar empleados dentro del departamento de Recursos Humanos de la empresa Taller de Node.js S.A. de C.V.
Permite agregar, editar, eliminar y consultar empleados, pero solo los usuarios administradores pueden usarlo.

--> Tecnologías utilizadas

Node.js
Express.js
MySQL
JWT (autenticación)

--> Funcionalidad del sistema

Inicio de sesión para administradores.
Los usuarios se validan desde la base de datos.
Solo usuarios autenticados pueden acceder al CRUD.
Acciones disponibles:
- Agregar empleados
- Modificar empleados
- Eliminar empleados
- Ver lista completa

--> Base de datos:

-- 1. Create the Database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS RH_Node_js;

-- 2. Use the Database
USE RH_Node_js;

-- 3. Create the User Table (Administrators)
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_mail VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- Insert two initial administrator users
INSERT INTO user (user_name, user_mail, user_password)
VALUES
('Rene', 'rene@gmail.com', '2,4,6');
('Jafert', 'jafert@gmail.com', '123'),

-- 4. Create the Employee Table
CREATE TABLE employee (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    mail VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(200)
);
