const db = require('../config/db.config.js');
const Factura = db.Factura;

// Crear una nueva factura
exports.create = (req, res) => {
    let factura = {};

    try {
        factura.noFact = req.body.noFact;
        factura.serie = req.body.serie;
        factura.idCliente = req.body.idCliente;
        factura.idEmpleado = req.body.idEmpleado;
        factura.fechaFac = req.body.fechaFac;

        Factura.create(factura).then(result => {
            res.status(200).json({
                message: "Factura creada exitosamente con id = " + result.idFactura,
                factura: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};

// Actualizar factura por ID
exports.updateById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No se encontró la factura con id = " + facturaId,
                factura: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                noFact: req.body.noFact,
                serie: req.body.serie,
                idCliente: req.body.idCliente,
                idEmpleado: req.body.idEmpleado,
                fechaFac: req.body.fechaFac
            };
            let result = await Factura.update(updatedObject, { returning: true, where: { idFactura: facturaId } });

            if (!result[0]) {
                res.status(500).json({
                    message: "Error al actualizar la factura con id = " + facturaId,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Factura actualizada exitosamente con id = " + facturaId,
                factura: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la factura con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar factura por ID
exports.deleteById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No existe una factura con id = " + facturaId,
                error: "404",
            });
        } else {
            await factura.destroy();
            res.status(200).json({
                message: "Factura eliminada exitosamente con id = " + facturaId,
                factura: factura,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la factura con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Recuperar todas las facturas
exports.retrieveAllFacturas = (req, res) => {
    Factura.findAll({
        order: [
            ['noFact', 'ASC']
        ]
    })
    .then(facturaInfos => {
        res.status(200).json({
            message: "¡Todas las facturas recuperadas exitosamente!",
            facturas: facturaInfos
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

// Recuperar factura por ID
exports.getFacturaById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No se encontró una factura con id = " + facturaId,
                error: "404"
            });
        } else {
            res.status(200).json({
                message: "Factura recuperada exitosamente con id = " + facturaId,
                factura: factura
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar la factura con id = " + req.params.id,
            error: error.message
        });
    }
};
