const express = require('express');
const router = express.Router();

const departamentos = require('../controllers/departamento.controller.js');
const empleados = require('../controllers/empleado.controller.js');


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


module.exports = router;
