const db = require('../config/db.config.js');
const Producto = db.Producto;

// Crear un nuevo producto
exports.create = (req, res) => {
    let producto = {};

    try {
        producto.nombreProducto = req.body.nombreProducto;
        producto.descripcion = req.body.descripcion;
        producto.precio = req.body.precio;
        producto.cantidad = req.body.cantidad;
        producto.idProveedor = req.body.idProveedor;

        Producto.create(producto).then(result => {
            res.status(200).json({
                message: "Producto creado exitosamente con id = " + result.idProducto,
                producto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};

// Actualizar producto por ID
exports.updateById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "No se encontró el producto con id = " + productoId,
                producto: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombreProducto: req.body.nombreProducto,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                cantidad: req.body.cantidad,
                idProveedor: req.body.idProveedor
            };
            let result = await Producto.update(updatedObject, { returning: true, where: { idProducto: productoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el producto con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Producto actualizado exitosamente con id = " + productoId,
                producto: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el producto con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar producto por ID
exports.deleteById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "No existe un producto con id = " + productoId,
                error: "404",
            });
        } else {
            await producto.destroy();
            res.status(200).json({
                message: "Producto eliminado exitosamente con id = " + productoId,
                producto: producto,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el producto con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Recuperar todos los productos
exports.retrieveAllProductos = (req, res) => {
    Producto.findAll({
        order: [
            ['nombreProducto', 'ASC']
        ]
    })
    .then(productoInfos => {
        res.status(200).json({
            message: "¡Todos los productos recuperados exitosamente!",
            productos: productoInfos
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

// Recuperar producto por ID
exports.getProductoById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "No se encontró un producto con id = " + productoId,
                error: "404"
            });
        } else {
            res.status(200).json({
                message: "Producto recuperado exitosamente con id = " + productoId,
                producto: producto
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar el producto con id = " + req.params.id,
            error: error.message
        });
    }
};
