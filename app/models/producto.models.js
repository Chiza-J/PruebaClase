module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define('producto', {
        idProducto: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING(100)
        },
        stock: {
            type: Sequelize.NUMERIC
        },
        stockMinimo: {
            type: Sequelize.NUMERIC
        },
        precioUnitario: {
            type: Sequelize.FLOAT
        },
        idProveedor: {
            type: Sequelize.INTEGER,
            references: {
                model: 'proveedors', // Nombre de la tabla a la que hace referencia
                key: 'idProveedor'
            }
        }
    });

    Producto.associate = models => {
        Producto.belongsTo(models.Proveedor, {
            foreignKey: 'idProveedor',
            as: 'proveedor'
        });
    }

    return Producto;
}
