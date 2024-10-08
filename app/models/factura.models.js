module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define('factura', {
        idFactura: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        noFact: {
            type: Sequelize.NUMERIC
        },
        serie: {
            type: Sequelize.STRING(20)
        },
        idCliente: {
            type: Sequelize.INTEGER,
            references: {
                model: 'clientes',
                key: 'idCliente'
            }
        },
        idEmpleado: {
            type: Sequelize.INTEGER,
            references: {
                model: 'empleados',
                key: 'idEmpleado'
            }
        },
        fechaFac: {
            type: Sequelize.DATE
        }
    });

    Factura.associate = models => {
        Factura.belongsTo(models.Cliente, {
            foreignKey: 'idCliente',
            as: 'cliente'
        });
        Factura.belongsTo(models.Empleado, {
            foreignKey: 'idEmpleado',
            as: 'empleado'
        });
    }

    return Factura;
}
