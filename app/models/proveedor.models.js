module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define('proveedor', {
        idProveedor: {
            type: Sequelize.NUMERIC,
            primaryKey: true
        },
        empresa: {
            type: Sequelize.STRING(100)
        },
        direccion: {
            type: Sequelize.STRING(100)
        },
        telefono: {
            type: Sequelize.NUMERIC
        },
        nit: {
            type: Sequelize.STRING(30)
        },
        ciudad: {
            type: Sequelize.STRING(100)
        },
        pais: {
            type: Sequelize.STRING(100)
        },
        contacto: {
            type: Sequelize.STRING(100)
        },
        email: {
            type: Sequelize.STRING(100)
        },
        telefonoContacto: {
            type: Sequelize.NUMERIC
        },
        estatus: {
            type: Sequelize.NUMERIC
        }
    });

    return Proveedor;
}
