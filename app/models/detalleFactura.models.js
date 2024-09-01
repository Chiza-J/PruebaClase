module.exports = (sequelize, Sequelize) => {
    const FacturaDetalle = sequelize.define('facturaDetalle', {
        idDetalle: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        idFactura: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idLinea: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        idProducto: {
            type: Sequelize.INTEGER,
            references: {
                model: 'productos',
                key: 'idProducto'
            }
        },
        cantidad: {
            type: Sequelize.NUMERIC
        }
    });

    FacturaDetalle.associate = models => {
        FacturaDetalle.belongsTo(models.Factura, {
            foreignKey: 'idFactura',
            as: 'factura'
        });
        FacturaDetalle.belongsTo(models.Producto, {
            foreignKey: 'idProducto',
            as: 'producto'
        });
    }

    return FacturaDetalle;
}
