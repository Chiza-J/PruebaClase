const db = require('../config/db.config.js');
const FacturaDetalle = db.FacturaDetalle;

// Crear un nuevo detalle de factura
exports.create = (req, res) => {
    let facturaDetalle = {};

    try {
        facturaDetalle.idFactura = req.body.idFactura;
        facturaDetalle.idProducto = req.body.idProducto;
        facturaDetalle.cantidad = req.body.cantidad;
        facturaDetalle.precioUnitario = req.body.precioUnitario;
        facturaDetalle.total = req.body.total;

        FacturaDetalle.create(facturaDetalle).then(result => {
            res.status(200).json({
                message: "Detalle de factura creado exitosamente con id = " + result.idDetalle,
                facturaDetalle: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};

// Actualizar detalle de factura por ID
exports.updateById = async (req, res) => {
    try {
        let detalleId = req.params.id;
        let facturaDetalle = await FacturaDetalle.findByPk(detalleId);

        if (!facturaDetalle) {
            res.status(404).json({
                message: "No se encontró el detalle de factura con id = " + detalleId,
                facturaDetalle: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                idFactura: req.body.idFactura,
                idProducto: req.body.idProducto,
                cantidad: req.body.cantidad,
                precioUnitario: req.body.precioUnitario,
                total: req.body.total
            };
            let result = await FacturaDetalle.update(updatedObject, { returning: true, where: { idDetalle: detalleId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el detalle de factura con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Detalle de factura actualizado exitosamente con id = " + detalleId,
                facturaDetalle: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el detalle de factura con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar detalle de factura por ID
exports.deleteById = async (req, res) => {
    try {
        let detalleId = req.params.id;
        let facturaDetalle = await FacturaDetalle.findByPk(detalleId);

        if (!facturaDetalle) {
            res.status(404).json({
                message: "No existe un detalle de factura con id = " + detalleId,
                error: "404",
            });
        } else {
            await facturaDetalle.destroy();
            res.status(200).json({
                message: "Detalle de factura eliminado exitosamente con id = " + detalleId,
                facturaDetalle: facturaDetalle,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el detalle de factura con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Recuperar todos los detalles de facturas
exports.retrieveAllFacturaDetalles = (req, res) => {
    FacturaDetalle.findAll({
        order: [
            ['idFactura', 'ASC']
        ]
    })
    .then(detalleInfos => {
        res.status(200).json({
            message: "¡Todos los detalles de facturas recuperados exitosamente!",
            facturaDetalles: detalleInfos
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

// Recuperar detalle de factura por ID
exports.getFacturaDetalleById = async (req, res) => {
    try {
        let detalleId = req.params.id;
        let facturaDetalle = await FacturaDetalle.findByPk(detalleId);

        if (!facturaDetalle) {
            res.status(404).json({
                message: "No se encontró un detalle de factura con id = " + detalleId,
                error: "404"
            });
        } else {
            res.status(200).json({
                message: "Detalle de factura recuperado exitosamente con id = " + detalleId,
                facturaDetalle: facturaDetalle
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar el detalle de factura con id = " + req.params.id,
            error: error.message
        });
    }
};
