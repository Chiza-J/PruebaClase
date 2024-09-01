module.exports = (sequelize, Sequelize) => {
    const FacturaDetalle = sequelize.define('facturaDetalle', {
        idFactura: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        idLinea: {
            type: Sequelize.NUMERIC,
            primaryKey: true
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
