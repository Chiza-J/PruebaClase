const db = require('../config/db.config.js');
const Proveedor = db.Proveedor;

// Crear un nuevo proveedor
exports.create = (req, res) => {
    let proveedor = {};

    try {
        proveedor.empresa = req.body.empresa;
        proveedor.direccion = req.body.direccion;
        proveedor.telefono = req.body.telefono;
        proveedor.nit = req.body.nit;
        proveedor.ciudad = req.body.ciudad;
        proveedor.pais = req.body.pais;
        proveedor.contacto = req.body.contacto;
        proveedor.email = req.body.email;
        proveedor.telefonoContacto = req.body.telefonoContacto;
        proveedor.estatus = req.body.estatus;

        Proveedor.create(proveedor).then(result => {
            res.status(200).json({
                message: "Proveedor creado exitosamente con id = " + result.idProveedor,
                proveedor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};
 
// Actualizar proveedor por ID
exports.updateById = async (req, res) => {
    try {
        let idProveedor = req.params.idProveedor;
        let proveedor = await Proveedor.findByPk(idProveedor);

        if (!proveedor) {
            res.status(404).json({
                message: "No se encontró el proveedor con id = " + idProveedor,
                proveedor: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                empresa: req.body.empresa,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                nit: req.body.nit,
                ciudad: req.body.ciudad,
                pais: req.body.pais,
                contacto: req.body.contacto,
                email: req.body.email,
                telefonoContacto: req.body.telefonoContacto,
                estatus: req.body.estatus
            };
            let result = await Proveedor.update(updatedObject, { returning: true, where: { idProveedor: idProveedor } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el proveedor con id = " + req.params.idProveedor,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Proveedor actualizado exitosamente con id = " + idProveedor,
                proveedor: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el proveedor con id = " + req.params.idProveedor,
            error: error.message
        });
    }
};

// Eliminar proveedor por ID
exports.deleteById = async (req, res) => {
    try {
        let idProveedor = req.params.idProveedor;
        let proveedor = await Proveedor.findByPk(idProveedor);

        if (!proveedor) {
            res.status(404).json({
                message: "No existe un proveedor con id = " + idProveedor,
                error: "404",
            });
        } else {
            await proveedor.destroy();
            res.status(200).json({
                message: "Proveedor eliminado exitosamente con id = " + idProveedor,
                proveedor: proveedor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el proveedor con id = " + req.params.idProveedor,
            error: error.message,
        });
    }
};

// Recuperar todos los proveedores
exports.retrieveAllProveedores = (req, res) => {
    Proveedor.findAll({
        order: [
            ['empresa', 'ASC']
        ]
    })
    .then(proveedorInfos => {
        res.status(200).json({
            message: "¡Todos los proveedores recuperados exitosamente!",
            proveedores: proveedorInfos
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

// Recuperar proveedor por ID
exports.getProveedorById = async (req, res) => {
    try {
        let idProveedor = req.params.idProveedor;
        let proveedor = await Proveedor.findByPk(idProveedor);

        if (!proveedor) {
            res.status(404).json({
                message: "No se encontró un proveedor con id = " + idProveedor,
                error: "404"
            });
        } else {
            res.status(200).json({
                message: "Proveedor recuperado exitosamente con id = " + idProveedor,
                proveedor: proveedor
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar el proveedor con id = " + req.params.idProveedor,
            error: error.message
        });
    }
};
