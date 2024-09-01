const db = require('../config/db.config.js');
const Cliente = db.Cliente;

// Crear un nuevo cliente
exports.create = (req, res) => {
    let cliente = {};

    try {
        cliente.nombre = req.body.nombre;
        cliente.apellido = req.body.apellido;
        cliente.razonSocial = req.body.razonSocial;
        cliente.nit = req.body.nit;
        cliente.direccion = req.body.direccion;
        cliente.telefono = req.body.telefono;
        cliente.email = req.body.email;
        cliente.fechaIngreso = req.body.fechaIngreso;
        cliente.estatus = req.body.estatus;

        Cliente.create(cliente).then(result => {
            res.status(200).json({
                message: "Cliente creado exitosamente con id = " + result.idCliente,
                cliente: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};

// Actualizar cliente por ID
exports.updateById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No se encontró el cliente con id = " + clienteId,
                cliente: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                razonSocial: req.body.razonSocial,
                nit: req.body.nit,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                fechaIngreso: req.body.fechaIngreso,
                estatus: req.body.estatus
            };
            let result = await Cliente.update(updatedObject, { returning: true, where: { idCliente: clienteId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el cliente con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Cliente actualizado exitosamente con id = " + clienteId,
                cliente: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el cliente con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar cliente por ID
exports.deleteById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No existe un cliente con id = " + clienteId,
                error: "404",
            });
        } else {
            await cliente.destroy();
            res.status(200).json({
                message: "Cliente eliminado exitosamente con id = " + clienteId,
                cliente: cliente,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el cliente con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Recuperar todos los clientes
exports.retrieveAllClientes = (req, res) => {
    Cliente.findAll({
        order: [
            ['nombre', 'ASC']
        ]
    })
    .then(clienteInfos => {
        res.status(200).json({
            message: "¡Todos los clientes recuperados exitosamente!",
            clientes: clienteInfos
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

// Recuperar cliente por ID
exports.getClienteById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No se encontró un cliente con id = " + clienteId,
                error: "404"
            });
        } else {
            res.status(200).json({
                message: "Cliente recuperado exitosamente con id = " + clienteId,
                cliente: cliente
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar el cliente con id = " + req.params.id,
            error: error.message
        });
    }
};
