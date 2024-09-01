const express = require('express');
const router = express.Router();

const departamentos = require('../controllers/departamento.controller.js');
const empleados = require('../controllers/empleado.controller.js');
const clientes = require('../controllers/cliente.controller.js');
const proveedores = require('../controllers/proveedor.controller.js');

// Departamento routes
router.post('/api/departamentos/create', departamentos.create);
router.get('/api/departamentos/all', departamentos.retrieveAllDepartamentos);
router.get('/api/departamentos/onebyid/:id', departamentos.getDepartamentoById);
router.put('/api/departamentos/update/:id', departamentos.updateById);
router.delete('/api/departamentos/delete/:id', departamentos.deleteById);

// Empleado routes
router.post('/api/empleados/create', empleados.create);
router.get('/api/empleados/all', empleados.retrieveAllEmpleados);
router.get('/api/empleados/onebyid/:id', empleados.getEmpleadoById);
router.put('/api/empleados/update/:id', empleados.updateById);
router.delete('/api/empleados/delete/:id', empleados.deleteById);


// Cliente routes
router.post('/api/clientes/create', clientes.create);
router.get('/api/clientes/all', clientes.retrieveAllClientes);
router.get('/api/clientes/onebyid/:id', clientes.getClienteById);
router.put('/api/clientes/update/:id', clientes.updateById);
router.delete('/api/clientes/delete/:id', clientes.deleteById);

// Proveedor routes
router.post('/api/proveedores/create', proveedores.create);
router.get('/api/proveedores/all', proveedores.retrieveAllProveedores);
router.get('/api/proveedores/onebyid/:id', proveedores.getProveedorById);
router.put('/api/proveedores/update/:id', proveedores.updateById);
router.delete('/api/proveedores/delete/:id', proveedores.deleteById);

module.exports = router;
