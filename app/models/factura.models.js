module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define('factura', {
        idFactura: {
            type: Sequelize.NUMERIC,
            primaryKey: true
        },
        noFact: {
            type: Sequelize.NUMERIC
        },
        serie: {
            type: Sequelize.STRING(20)
        },
        idCliente: {
            type: Sequelize.NUMERIC,
            references: {
                model: 'clientes',
                key: 'idCliente'
            }
        },
        idEmpleado: {
            type: Sequelize.NUMERIC,
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
