const db = require('../config/db.config.js');
const Empleado = db.Empleado;

// Crear un nuevo empleado
exports.create = (req, res) => {
    let empleado = {};

    try {
        
        empleado.primerNombre = req.body.primerNombre;
        empleado.segundoNombre = req.body.segundoNombre;
        empleado.primerApellido = req.body.primerApellido;
        empleado.segundoApellido = req.body.segundoApellido;
        empleado.NIT = req.body.NIT;
        empleado.salario = req.body.salario;
        empleado.estatus = req.body.estatus;
        empleado.idDepartamento = req.body.idDepartamento;

        Empleado.create(empleado).then(result => {
            res.status(200).json({
                message: "Empleado creado exitosamente con id = " + result.idEmpleado,
                empleado: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};

// Actualizar empleado por ID
exports.updateById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No se encontró el empleado con id = " + empleadoId,
                empleado: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                primerNombre: req.body.primerNombre,
                segundoNombre: req.body.segundoNombre,
                primerApellido: req.body.primerApellido,
                segundoApellido: req.body.segundoApellido,
                NIT: req.body.NIT,
                salario: req.body.salario,
                estatus: req.body.estatus,
                idDepartamento: req.body.idDepartamento
            };
            let result = await Empleado.update(updatedObject, { returning: true, where: { idEmpleado: empleadoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el empleado con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Empleado actualizado exitosamente con id = " + empleadoId,
                empleado: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el empleado con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar empleado por ID
exports.deleteById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No existe un empleado con id = " + empleadoId,
                error: "404",
            });
        } else {
            await empleado.destroy();
            res.status(200).json({
                message: "Empleado eliminado exitosamente con id = " + empleadoId,
                empleado: empleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el empleado con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Recuperar todos los empleados
exports.retrieveAllEmpleados = (req, res) => {
    Empleado.findAll({
        order: [
            ['primerNombre', 'ASC']
        ]
    })
    .then(empleadoInfos => {
        res.status(200).json({
            message: "¡Todos los empleados recuperados exitosamente!",
            empleados: empleadoInfos
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "¡Error!",
            error: error
        });
    });
};

// Recuperar empleado por ID
exports.getEmpleadoById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No se encontró un empleado con id = " + empleadoId,
                error: "404"
            });
        } else {
            res.status(200).json({
                message: "Empleado recuperado exitosamente con id = " + empleadoId,
                empleado: empleado
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar el empleado con id = " + req.params.id,
            error: error.message
        });
    }
};
