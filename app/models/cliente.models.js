module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('cliente', {
        idCliente: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(100)
        },
        apellido: {
            type: Sequelize.STRING(100)
        },
        razonSocial: {
            type: Sequelize.STRING(100)
        },
        nit: {
            type: Sequelize.STRING(10)
        },
        direccion: {
            type: Sequelize.STRING(100)
        },
        telefono: {
            type: Sequelize.STRING(100)
        },
        email: {
            type: Sequelize.STRING(50)
        },
        fechaIngreso: {
            type: Sequelize.DATE
        },
        estatus: {
            type: Sequelize.NUMERIC
        }
    });

    return Cliente;
}
