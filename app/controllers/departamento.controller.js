const db = require('../config/db.config.js');
const Departamento = db.Departamento;

exports.create = (req, res) => {
    let departamento = {};

    try {
        departamento.idDepartamento = req.body.idDepartamento;
        departamento.descripcion = req.body.descripcion;

        Departamento.create(departamento).then(result => {
            res.status(200).json({
                message: "Departamento creado exitosamente con id = " + result.idDepartamento,
                departamento: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};

exports.updateById = async (req, res) => {
    try {
        let departamentoId = req.params.id;
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "No se encontró el departamento con id = " + departamentoId,
                departamento: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                descripcion: req.body.descripcion
            };
            let result = await Departamento.update(updatedObject, { returning: true, where: { idDepartamento: departamentoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el departamento con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Departamento actualizado exitosamente con id = " + departamentoId,
                departamento: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el departamento con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let departamentoId = req.params.id;
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "No existe un departamento con id = " + departamentoId,
                error: "404",
            });
        } else {
            await departamento.destroy();
            res.status(200).json({
                message: "Departamento eliminado exitosamente con id = " + departamentoId,
                departamento: departamento,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el departamento con id = " + req.params.id,
            error: error.message,
        });
    }
};

exports.retrieveAllDepartamentos = (req, res) => {
    Departamento.findAll({
        order: [
            ['descripcion', 'ASC']
        ]
    })
    .then(departamentoInfos => {
        res.status(200).json({
            message: "¡Todos los departamentos recuperados exitosamente!",
            departamentos: departamentoInfos
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

exports.getDepartamentoById = async (req, res) => {
    try {
        let departamentoId = req.params.id;
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "No se encontró un departamento con id = " + departamentoId,
                error: "404"
            });
        } else {
            res.status(200).json({
                message: "Departamento recuperado exitosamente con id = " + departamentoId,
                departamento: departamento
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar el departamento con id = " + req.params.id,
            error: error.message
        });
    }
};

